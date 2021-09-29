import { classNames } from '@chbphone55/classnames';
import { box } from '@fabric-ds/component-classes';
import React from 'react';
import type { BoxProps } from './props';

export function Box({ children, as = 'div', ...props }: BoxProps) {
  return React.createElement(
    as,
    {
      ...(props as Omit<BoxProps, 'children'> as {}),
      className: classNames(
        box.box,
        {
          [box.bleed]: props.bleed,
          [box.clickable]: props.clickable,
          'bg-aqua-50': props.info,
          'hover:bg-aqua-100 active:bg-aqua-200': props.info && props.clickable,
          'bg-bluegray-100': props.neutral,
          'hover:bg-bluegray-200 active:bg-bluegray-300':
            props.neutral && props.clickable,
          'border-2 border-bluegray-300': props.bordered,
        },
        props.className,
      ),
    },
    children,
  );
}
