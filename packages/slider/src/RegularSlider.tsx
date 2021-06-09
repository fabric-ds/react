import * as React from 'react';
import { useLayoutEffect } from '@finn-no/fabric-react-utils';
import { useSpring, animated } from 'react-spring';
import { classNames } from '@chbphone55/classnames';
import { slider as classes } from '@finn-no/fabric-component-classes';
import { useDrag } from 'react-use-gesture';
import {
    clamp,
    nextValue,
    prevValue,
    ratioToValue,
    valueToRatio,
    Scale,
} from './utils';
import useInnerWidth from './useInnerWidth';

export type RegularSliderProps = {
    /** String value that labels the slider. */
    'aria-label'?: string;

    /** Identifies the element that labels the slider. */
    'aria-labelledby'?: string;

    /**  Human readable text alternative for the value. */
    'aria-valuetext'?: string;

    /** Additional CSS class for the container. */
    className?: string;

    /** Whether the slider is disabled. */
    disabled?: boolean;

    /** Handler that is called every time the value of the slider changes. */
    onInput?: (value: number) => void;

    /** Handler that is called when the value of the slider has settled. */
    onChange?: (value: number) => void;

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

    /** The current value. */
    value: number;
};

const RegularSlider = ({
    className,
    disabled = false,
    onInput = () => {},
    onChange = () => {},
    max = 100,
    min = 0,
    scale,
    step = 1,
    value,
    ...props
}: RegularSliderProps) => {
    const sliderRef = React.useRef<HTMLDivElement>(null);
    const handleRef = React.useRef<HTMLDivElement>(null);
    const innerWidth = useInnerWidth(sliderRef, handleRef);

    /* Ref that is continually upated with the latest value as the slider is dragged */
    const internvalValue = React.useRef(value);
    /* If we are currently dragging the slider */
    const [isDragging, setIsDragging] = React.useState(false);

    // the value here should already be clamped
    const handleChange = (newValue: number) => {
        if (newValue !== value) {
            onChange(newValue);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (disabled) return;

        let newValue;
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowDown':
            case 'PageDown':
                newValue = prevValue(value, step, scale);
                break;

            case 'ArrowUp':
            case 'ArrowRight':
            case 'PageUp':
                newValue = nextValue(value, step, scale);
                break;
            case 'Home':
                newValue = min;
                break;
            case 'End':
                newValue = max;
                break;
        }

        if (newValue != null) {
            newValue = clamp(newValue, min, max);
            onInput(newValue);
            handleChange(newValue);
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const [spring, set] = useSpring<{ ratio: number }>(() => ({
        ratio: valueToRatio(value, min, max, scale),
        immediate: true,
    }));

    // We only want to update the ratio for the spring if the value is something other than what we last dragged the handle to
    // this prevents the handle from jumping a couple of pixels even though we are really displaying the same value.
    React.useEffect(() => {
        if (internvalValue.current !== value) {
            internvalValue.current = value;
            set({
                ratio: valueToRatio(value, min, max, scale),
            });
        }
    }, [value, set, min, max, scale]);

    const bind = useDrag(
        ({
            xy,
            first,
            last,
            memo = {
                rect: sliderRef.current?.getBoundingClientRect(),
            },
        }) => {
            const ratio = clamp(
                (xy[0] - memo.rect.left) / memo.rect.width,
                0,
                1,
            );

            // Since we don't want to spam events, we check whether we've already called the cb for this value
            let dragValue = ratioToValue(ratio, min, max, step, scale);

            if (dragValue !== internvalValue.current) {
                internvalValue.current = dragValue;
                onInput(dragValue);
            }

            set({
                ratio,
            });

            if (first) {
                setIsDragging(true);
            } else if (last) {
                setIsDragging(false);
                handleChange(dragValue);
                // focus the handle
                handleRef.current?.focus();
            }

            return memo;
        },
        { axis: 'x', enabled: !disabled },
    );

    return (
        <div
            {...bind()}
            data-body-scroll-lock-ignore
            className={classNames(classes.wrapper, className)}
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
                    left: 0,
                    right: spring.ratio.interpolate(
                        (ratio) => `${(1 - ratio) * 100}%`,
                    ),
                }}
            />
            <animated.div
                aria-disabled={disabled}
                aria-label={props['aria-label']}
                aria-labelledby={props['aria-labelledby']}
                aria-valuemax={max}
                aria-valuemin={min}
                aria-valuenow={spring.ratio.interpolate((ratio) =>
                    ratioToValue(ratio, min, max, step, scale),
                )}
                aria-valuetext={props['aria-valuetext']}
                className={classNames({
                    [classes.thumbDisabled]: disabled,
                    [classes.thumbEnabled]: !disabled,
                    [classes.thumb]: true,
                    'shadow-sm': true,
                })}
                onKeyDown={handleKeyDown}
                role="slider"
                ref={handleRef}
                style={{
                    transform: spring.ratio.interpolate(
                        (ratio) => `translate3d(${ratio * innerWidth}px,0,0)`,
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

const WorkaroundSlider = (props: RegularSliderProps) => {
    const [mounted, setMounted] = React.useState(false);
    useLayoutEffect(() => {
        setMounted(true);
    }, []);

    if (mounted) {
        return <RegularSlider {...props} />;
    }

    return (
        <div className={classNames(classes.wrapper, props.className)}>
            <div className={classNames(classes.track)} />
        </div>
    );
};

export default WorkaroundSlider;
