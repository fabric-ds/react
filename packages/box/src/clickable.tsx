import React from 'react';
import { classNames } from '@chbphone55/classnames';
import { Item as ToggleItem } from '../../toggle/src/item';
import { ClickableProps } from './props';

export function Clickable({
  children,
  radio,
  checkbox,
  value,
  ...props
}: ClickableProps) {
  const type = radio ? 'radio' : 'checkbox';

  return radio || checkbox ? (
    <ToggleItem
      labelClassName={props.labelClassName}
      className="absolute inset-0 h-full w-full appearance-none cursor-pointer focus-ring"
      type={type}
      controlled={false}
      onChange={() => undefined}
      value={value}
      name={`dead:toggle`}
    >
      {children}
    </ToggleItem>
  ) : (
    React.createElement(
      props.href ? 'a' : 'button',
      {
        ...props,
        className: classNames(props.className, 'focus-ring'),
        type: props.href ? undefined : props.type || 'button',
      },
      <>
        <span className="inset-0 absolute" aria-hidden="true"></span>
        {children}
      </>,
    )
  );
}
