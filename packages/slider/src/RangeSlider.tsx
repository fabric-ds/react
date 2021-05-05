import * as React from 'react';
import { useLayoutEffect } from '@finn-no/fabric-react-utils';
import { slider as classes } from '@finn-no/fabric-component-classes';
import { classNames } from '@chbphone55/classnames';
import { animated, interpolate, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import warning from 'tiny-warning';
import useInnerWidth from './useInnerWidth';
import {
    clamp,
    nextValue,
    prevValue,
    ratioToValue,
    Scale,
    valueToRatio,
} from './utils';

export type RangeSliderProps = {
    /** String value that labels the slider. */
    'aria-label'?: [string, string];

    /** Identifies the element that labels the slider. */
    'aria-labelledby'?: [string, string];

    /** Human readable text alternative for the value. */
    'aria-valuetext'?: [string, string];

    /** Additional CSS class for the container. */
    className?: string;

    /** Whether the slider is disabled. */
    disabled?: boolean;

    /** Handler that is called every time the value of the slider changes. */
    onInput?: (value: [number, number]) => void;

    /** Handler that is called when the value of the slider has settled. */
    onChange?: (value: [number, number]) => void;

    /** The greatest value in the range of permitted values. */
    max?: number;

    /** The lowest value in the range of permitted values. */
    min?: number;

    /** A d3-scale object for non linear slider scales.
     * @see d3-scale repository https://github.com/d3/d3-scale
     */
    scale?: Scale;

    /** Specifies the value granularity. */
    step?: number;

    /** The current value */
    value: [number, number];
};

enum Handle {
    Lower = 0,
    Upper = 1,
}

const RangeSlider = ({
    className,
    disabled = false,
    value: values,
    onInput = () => {},
    onChange = () => {},
    max = 100,
    min = 0,
    scale,
    step = 1,
    ...props
}: RangeSliderProps) => {
    if (process.env.NODE_ENV !== 'production') {
        // useEffect with an empty array to only warn once per component instance
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
            // Warn if the component isn't accessible.
            warning(
                props['aria-label'] || props['aria-labelledby'],
                `<RangeSlider> requires an 'aria-label' or an 'aria-labelledby' to be accessible to screen readers.`,
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    }

    const sliderRef = React.useRef<HTMLDivElement>(null);
    const handleLowerRef = React.useRef<HTMLDivElement>(null);
    const handleUpperRef = React.useRef<HTMLDivElement>(null);
    const innerWidth = useInnerWidth(sliderRef, handleLowerRef);
    /* Ref that is continually upated with the latest value as the slider is dragged */
    const internalValue = React.useRef([...values]);
    /* If we are currently dragging the slider */
    const [isDragging, setIsDragging] = React.useState(false);

    // the value should already be clamped
    const handleChange = (value: number, handle: Handle) => {
        if (values[handle] !== value) {
            const newValues = values.concat() as [number, number];

            newValues[handle] = value;
            onChange(newValues);
        }
    };

    const handleKeyDown = (
        event: React.KeyboardEvent,
        handle: Handle = Handle.Lower,
    ) => {
        if (disabled) return;

        const oldValue = values[handle];
        let newValue;
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowDown':
            case 'PageDown':
                newValue = prevValue(oldValue, step, scale);
                break;

            case 'ArrowUp':
            case 'ArrowRight':
            case 'PageUp':
                newValue = nextValue(oldValue, step, scale);
                break;
            case 'Home':
                newValue = min;
                break;
            case 'End':
                newValue = max;
                break;
        }

        if (newValue != null) {
            newValue = clamp(
                newValue,
                handle === Handle.Lower ? min : values[Handle.Lower],
                handle === Handle.Upper ? max : values[Handle.Upper],
            );
            const newValues = values.concat() as [number, number];
            newValues[handle] = newValue;
            onInput(newValues);
            handleChange(newValue, handle);
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const [spring, set] = useSpring<{ ratioLower: number; ratioUpper: number }>(
        () => ({
            ratioLower: valueToRatio(values[Handle.Lower], min, max, scale),
            ratioUpper: valueToRatio(values[Handle.Upper], min, max, scale),
            immediate: true,
        }),
    );

    // We only want to update the ratio for the spring if the value is something other than what we last dragged the handle to
    // this prevents the handle from jumping a couple of pixels even though we are really displaying the same value.
    React.useEffect(() => {
        if (internalValue.current[Handle.Lower] !== values[Handle.Lower]) {
            internalValue.current[Handle.Lower] = values[Handle.Lower];
            set({
                ratioLower: valueToRatio(values[Handle.Lower], min, max, scale),
            });
        }
        if (internalValue.current[Handle.Upper] !== values[Handle.Upper]) {
            internalValue.current[Handle.Upper] = values[Handle.Upper];
            set({
                ratioUpper: valueToRatio(values[Handle.Upper], min, max, scale),
            });
        }
    }, [values, set, max, min, scale]);

    const bind = useDrag(
        ({
            xy,
            first,
            last,
            memo = {
                rect: sliderRef.current?.getBoundingClientRect(),
                handle: Handle.Lower,
            },
        }) => {
            let ratio = clamp((xy[0] - memo.rect.left) / memo.rect.width, 0, 1);

            const ratioLower = spring.ratioLower.getValue();
            const ratioUpper = spring.ratioUpper.getValue();

            // Figure out which handle we're closest to
            if (first) {
                let handle;
                // if both handles are maxed out, we always use the lower handle  so we have something to interact with
                if (values[Handle.Lower] === max) {
                    handle = Handle.Lower;
                    // opposite of above
                } else if (values[Handle.Upper] === min) {
                    handle = Handle.Upper;
                    // otherwise, detect which handle is closest to the click/press
                } else {
                    handle =
                        Math.abs(ratioLower - ratio) <
                        // add a tiny fraction to the upper ratio when calculating which handle to interact with.
                        // This is because when the ratios are equal it would always choose the upper handle,
                        // because the check is less than. With our little padding however it can select either
                        Math.abs(ratioUpper + 0.0001 - ratio)
                            ? Handle.Lower
                            : Handle.Upper;
                }
                memo.handle = handle;

                setIsDragging(true);
            }

            // clamp the ratio with each other, as we don't want the handles to overlap
            ratio =
                memo.handle === Handle.Lower
                    ? clamp(ratio, 0, ratioUpper)
                    : clamp(ratio, ratioLower, 1);

            const dragValue = ratioToValue(ratio, min, max, step, scale);

            if (dragValue !== internalValue.current[memo.handle]) {
                internalValue.current[memo.handle] = dragValue;
                onInput(internalValue.current.concat() as [number, number]);
            }

            if (last) {
                setIsDragging(false);
                handleChange(dragValue, memo.handle);
                const ref =
                    memo.handle === Handle.Lower
                        ? handleLowerRef
                        : handleUpperRef;
                ref.current?.focus();
            }

            set({
                [memo.handle === Handle.Lower
                    ? 'ratioLower'
                    : 'ratioUpper']: ratio,
            });

            return memo;
        },
        { axis: 'x', enabled: !disabled },
    );

    return (
        <div
            {...bind()}
            data-body-scroll-lock-ignore
            className={classNames(classes.wrapper, { disabled }, className)}
            style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
            ref={sliderRef}
        >
            <div
                className={classNames({
                    'pointer-events-none': disabled,
                    [classes.track]: true,
                })}
            />
            <animated.div
                className={classNames({
                    [classes.activeTrackDisabled]: disabled,
                    [classes.activeTrack]: true,
                })}
                style={{
                    left: spring.ratioLower.interpolate(
                        (ratio) => `${ratio * 100}%`,
                    ),
                    right: spring.ratioUpper.interpolate(
                        (ratio) => `${(1 - ratio) * 100}%`,
                    ),
                }}
            />
            <animated.div
                aria-disabled={disabled}
                aria-label={props['aria-label']?.[Handle.Lower]}
                aria-labelledby={props['aria-labelledby']?.[Handle.Lower]}
                // the lower handle is limited by the upper handle
                aria-valuemax={values[Handle.Upper]}
                aria-valuemin={min}
                aria-valuenow={spring.ratioLower.interpolate((ratio) =>
                    ratioToValue(ratio, min, max, step, scale),
                )}
                aria-valuetext={props['aria-valuetext']?.[Handle.Lower]}
                className={classNames({
                    [classes.thumbDisabled]: disabled,
                    [classes.thumbEnabled]: !disabled,
                    [classes.thumb]: true,
                    'shadow-sm': true,
                })}
                onKeyDown={handleKeyDown}
                role="slider"
                ref={handleLowerRef}
                style={{
                    transform: interpolate(
                        [spring.ratioLower, spring.ratioUpper],
                        (ratioLower, ratioUpper) =>
                            `translate3d(${
                                clamp(ratioLower, 0, ratioUpper) * innerWidth
                            }px, 0px, 0px)`,
                    ),
                    // override troika's styling here
                    cursor: 'inherit',
                }}
                tabIndex={disabled ? undefined : 0}
            >
                <div
                    className={classNames({
                        [classes.thumbCenter]: true,
                        [classes.thumbCenterEnabled]: !disabled,
                        [classes.thumbCenterDisabled]: disabled,
                    })}
                />
            </animated.div>
            <animated.div
                aria-disabled={disabled}
                aria-label={props['aria-label']?.[Handle.Upper]}
                aria-labelledby={props['aria-labelledby']?.[Handle.Upper]}
                aria-valuemax={max}
                // the upper handle is limited by the lower handle
                aria-valuemin={values[Handle.Lower]}
                aria-valuenow={spring.ratioUpper.interpolate((ratio) =>
                    ratioToValue(ratio, min, max, step, scale),
                )}
                aria-valuetext={props['aria-valuetext']?.[Handle.Upper]}
                className={classNames({
                    [classes.thumbDisabled]: disabled,
                    [classes.thumbEnabled]: !disabled,
                    [classes.thumb]: true,
                    'shadow-sm': true,
                })}
                onKeyDown={(event) => handleKeyDown(event, Handle.Upper)}
                role="slider"
                ref={handleUpperRef}
                style={{
                    transform: interpolate(
                        [spring.ratioLower, spring.ratioUpper],
                        (ratioLower, ratioUpper) =>
                            `translate3d(${
                                clamp(ratioUpper, ratioLower, 1) * innerWidth
                            }px, 0px, 0px)`,
                    ),
                    // override troika's styling here
                    cursor: 'inherit',
                }}
                tabIndex={disabled ? undefined : 0}
            >
                <div
                    className={classNames({
                        [classes.thumbCenter]: true,
                        [classes.thumbCenterEnabled]: !disabled,
                        [classes.thumbCenterDisabled]: disabled,
                    })}
                />
            </animated.div>
        </div>
    );
};

const WorkaroundSlider = (props: RangeSliderProps) => {
    const [mounted, setMounted] = React.useState(false);
    useLayoutEffect(() => {
        setMounted(true);
    }, []);

    if (mounted) {
        return <RangeSlider {...props} />;
    }

    return (
        <div className={classNames(classes.wrapper, props.className)}>
            <div className={classNames(classes.track)} />
        </div>
    );
};

export default WorkaroundSlider;
