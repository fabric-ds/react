import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { classNames } from '@chbphone55/classnames';
import {
  opposites,
  rotation,
  useRecompute as recompute,
} from '@fabric-ds/core/attention';
import { ArrowProps, AttentionProps } from './props';

export function Attention(props: AttentionProps) {
  const {
    noArrow,
    isShowing,
    children,
    placement,
    targetEl,
    className,
    ...rest
  } = props;

  const [actualDirection, setActualDirection] = useState(placement);

  const attentionRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const attentionState = {
    get isShowing() {
      return isShowing;
    },
    get isCallout() {
      return rest.callout;
    },
    get actualDirection() {
      return actualDirection;
    },
    set actualDirection(v) {
      setActualDirection(v);
    },
    get directionName() {
      return placement;
    },
    get arrowEl() {
      return arrowRef.current;
    },
    get attentionEl() {
      return attentionRef.current;
    },
    set attentionEl(v) {
      attentionRef.current = v;
    },
    get targetEl() {
      return targetEl?.current;
    },
    get noArrow() {
      return props.noArrow;
    },
  };

  // Recompute on re-render
  useEffect(() => {
    recompute(attentionState);
  });

  return (
    <div
      className={classNames(
        {
          'absolute z-50': !props.callout,
          invisible: !isShowing && !props.callout,
          hidden: !isShowing && !props.tooltip,
        },
        className,
      )}
      ref={attentionRef}
    >
      <div
        className={classNames({
          'border-2 relative': true,
          'bg-gray-700 border-gray-700 text-white rounded-4 py-6 px-8':
            props.tooltip,
          'bg-green-100 border-green-400 py-8 px-16 rounded-8': props.callout,
          'bg-white border-white rounded-8 p-16 filter drop-shadow-20':
            props.popover,
        })}
      >
        {!props.noArrow && (
          <Arrow {...props} ref={arrowRef} direction={placement} />
        )}
        <div className="last-child:mb-0">{props.children}</div>
      </div>
    </div>
  );
}

const Arrow = forwardRef<HTMLDivElement, ArrowProps>((props, ref) => {
  const { direction, tooltip, callout, popover } = props;

  const arrowDirection = opposites[direction];

  return (
    <div
      ref={ref}
      className={classNames({
        'absolute h-14 w-14 border-2 border-b-0 border-r-0 transform': true,
        [`-${arrowDirection}-8`]: true,
        'bg-gray-700 border-gray-700': tooltip,
        'bg-green-100 border-green-400': callout,
        'bg-white border-white': popover,
      })}
      style={{
        // TW doesn't let us specify exactly one corner, only whole sides
        borderTopLeftRadius: '4px',
        zIndex: 1,
        // border alignment is off by a fraction of a pixel, this fixes it
        [`margin${
          arrowDirection.charAt(0).toUpperCase() + arrowDirection.slice(1)
        }`]: '-0.5px',
        transform: `rotate(${rotation[arrowDirection]}deg)`,
      }}
    />
  );
});
