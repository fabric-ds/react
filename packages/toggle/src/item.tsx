import React from 'react';
import { useId } from '../../utils/src';
import { ToggleEntry } from './props';

interface ItemProps extends Pick<HTMLInputElement, 'type' | 'name'> {
  controlled: boolean;
  option?: ToggleEntry;
  children?: React.ReactNode;
  checked?: boolean;
  value?: string; // value for dead toggle
  defaultChecked?: boolean;
  invalid?: boolean;
  helpId?: string;
  label?: string;
  className?: string;
  labelClassName?: string;
  onChange: (data: ToggleEntry | boolean) => void;
}

export function Item({
  controlled,
  option,
  children,
  label,
  invalid,
  value,
  helpId,
  checked,
  defaultChecked,
  labelClassName,
  ...props
}: ItemProps) {
  const id = useId();

  return (
    <>
      <input
        id={id}
        checked={controlled ? checked : undefined}
        defaultChecked={defaultChecked}
        aria-invalid={invalid}
        aria-errormessage={invalid ? helpId : undefined}
        value={label ? undefined : value ?? undefined}
        {...props}
        onChange={(e) =>
          props.onChange(
            label
              ? e.target.checked
              : option
              ? { label: option?.label, value: option?.value }
              : false,
          )
        }
      />

      <label htmlFor={id} className={labelClassName}>
        {!children ? label || option?.label : children}
      </label>
    </>
  );
}
