import React from 'react';
import { classNames } from '@chbphone55/classnames';
import { Item as ToggleItem } from '../toggle/src/item';
import { useId } from '../utils/src/useId';

export type ClickableProps = {
  /**
   * Passes radio type to the underlying toggle
   */
  radio?: boolean;

  /**
   * Passes checkbox type to the underlying toggle
   */
  checkbox?: boolean;

  /**
   * Value of the dead toggle
   */
  value?: string;

  /**
   * Clickable element children
   */
  children: JSX.Element | JSX.Element[] | string;

  /**
   * Redirect to url on click
   * If passed, clickable renders as an anchor tag allowing you to pass properties such as target, rel, etc.
   */
  href?: string;

  /**
   * Additional classnames to the toggle label
   */
  labelClassName?: string;

  /**
   * Click handler
   */
  onClick?: () => void;
} & Partial<Omit<HTMLAnchorElement, 'children'>> &
  Partial<Omit<HTMLButtonElement, 'children'>>;

export function Clickable({
  children,
  radio,
  checkbox,
  value,
  ...props
}: ClickableProps) {
  const id = useId();
  const type = radio ? 'radio' : 'checkbox';

  return radio || checkbox ? (
    <ToggleItem
      labelClassName={props.labelClassName}
      className="focus-ring focus-ring-inset absolute inset-0 h-full w-full appearance-none cursor-pointer"
      type={type}
      controlled={false}
      onChange={props.onClick ? props.onClick : () => undefined}
      value={value}
      name={`${props.name || id}:toggle`}
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
