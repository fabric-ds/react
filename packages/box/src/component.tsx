import { classNames } from '@chbphone55/classnames';
import { box } from '@fabric-ds/component-classes';
import React from 'react';
import { BoxProps } from './props';

export function Box(props: BoxProps) {
  const {
    children,
    as = 'div',
    bleed,
    clickable,
    neutral,
    bordered,
    info,
    ...rest
  } = props;

  return React.createElement(
    as,
    {
      ...(rest as Omit<BoxProps, 'children'> as {}),
      className: classNames(
        box.box,
        {
          [box.bleed]: bleed,
          [box.clickable]: clickable,
          'bg-aqua-50': info,
          'hover:bg-aqua-100 active:bg-aqua-200': info && clickable,
          'bg-bluegray-100': neutral,
          'hover:bg-bluegray-200 active:bg-bluegray-300': neutral && clickable,
          'border-2 border-bluegray-300': bordered,
        },
        props.className,
      ),
    },
    children,
  );
}
