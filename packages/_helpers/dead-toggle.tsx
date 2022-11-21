import { classNames } from '@chbphone55/classnames';
import React from 'react';
import { Item } from '../toggle/src/item';

export interface DeadToggleProps {
  /**
   * Passes radio type to the underlying toggle
   */
  radio?: boolean;

  /**
   * Passes checkbox type to the underlying toggle
   */
  checkbox?: boolean;

  /**
   * Value for the input
   */
  value?: string;

  /**
   * Whether the toggle is checked
   */
  checked?: boolean;

  /**
   * Additional classnames to the toggle wrapper
   */
  className?: string;

  /**
   * Additional classnames to the toggle label
   */
  labelClassName?: string;
}

export function DeadToggle(props: DeadToggleProps) {
  const type = props.radio ? 'radio' : 'checkbox';

  return (
    <div
      className={classNames(props.className, {
        'input-toggle h-20 w-20 pointer-events-none': true,
      })}
      aria-hidden="true"
    >
      <Item
        type={type}
        className="hidden"
        labelClassName={props.labelClassName}
        name="dead-toggle"
        controlled={true}
        onChange={() => undefined}
        value={props.value}
        checked={props.checked}
      />
    </div>
  );
}
