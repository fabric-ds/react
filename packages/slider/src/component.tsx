import { classNames } from '@chbphone55/classnames';
import { createHandlers, useDimensions } from '@fabric-ds/core/slider';
import { slider as c } from '@fabric-ds/css/component-classes';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SliderProps } from './props';

export function Slider({ min = 0, max = 100, ...rest }: SliderProps) {
  const { disabled, onChange } = rest;

  const sliderLine = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const { mountedHook, unmountedHook } = useDimensions();
  useEffect(() => {
    if (!sliderLine.current) return;
    mountedHook(sliderLine.current, setDimensions);
    return () => unmountedHook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderLine]);

  const [value, setValue] = useState(rest.value);
  const [position, setPosition] = useState(0);
  const [dimensions, setDimensions] = useState({ left: 0, width: 0 });
  const [sliderPressed, setSliderPressed] = useState(false);

  useEffect(() => {
    onChange && onChange(value);
  }, [value, onChange]);

  const step = useMemo(() => rest.step || 1, [rest]);

  const sliderState = {
    get position() {
      return position;
    },
    set position(v) {
      setPosition(v);
    },
    get sliderPressed() {
      return sliderPressed;
    },
    set sliderPressed(v) {
      setSliderPressed(v);
    },
    get val() {
      return value;
    },
    set val(v) {
      setValue(v);
    },
    get thumbEl() {
      return thumbRef.current;
    },
    get dimensions() {
      return dimensions;
    },
    get step() {
      return step;
    },
    emitFocus(v) {
      console.log('focus', v);
    },
    emitBlur(v) {
      console.log('blur', v);
    },
  };

  const {
    handleKeyDown,
    handleFocus,
    handleBlur,
    handleMouseDown,
    handleClick,
    getThumbPosition,
    getThumbTransform,
    getShiftedChange,
  } = createHandlers({ props: { min, max, ...rest }, sliderState });

  const thumbPosition = useMemo(getThumbPosition, [getThumbPosition]);
  const sliderActiveStyle = useMemo(
    () => ({
      left: 0,
      right: 100 - thumbPosition + '%',
    }),
    [thumbPosition],
  );

  const transformValue = useMemo(getThumbTransform, [getThumbTransform]);
  const thumbStyles = useMemo(
    () => ({
      transform: 'translateX(' + transformValue + 'px)',
    }),
    [transformValue],
  );

  useEffect(() => {
    // prevents shiftedChange when modelValue was set externally
    if (position === rest.value) return;
    const n = rest.step ? getShiftedChange(position) : position;
    if (value === n) return;
    setValue(n);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, rest.value, rest.step]);

  useEffect(() => {
    if (sliderPressed || position === rest.value) return;
    setPosition(rest.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderPressed]);

  return (
    <div className={c.wrapper}>
      <div
        ref={sliderLine}
        className={classNames({
          [c.trackDisabled]: disabled,
          [c.track]: true,
        })}
        onClick={handleClick}
      />
      <div
        className={classNames({
          [c.activeTrackDisabled]: disabled,
          [c.activeTrack]: true,
        })}
        style={sliderActiveStyle}
        onClick={handleClick}
      />
      <div
        role="slider"
        tabIndex={0}
        className={classNames({
          [c.thumbDisabled]: disabled,
          [c.thumbEnabled]: !disabled,
          [c.thumb]: true,
        })}
        ref={thumbRef}
        style={thumbStyles}
        aria-label={rest['aria-label']}
        aria-labelledby={rest['aria-labelledby']}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={rest['aria-valuetext']}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      ></div>
    </div>
  );
}
