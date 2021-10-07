import React from 'react';
import { useId } from '../../utils/src/index.js';
import { ToggleEntry } from './props.js';

interface ItemProps extends Pick<HTMLInputElement, 'type' | 'name'> {
  controlled: boolean;
  option?: ToggleEntry;
  checked?: boolean;
  defaultChecked?: boolean;
  invalid?: boolean;
  helpId?: string;
  label?: string;
  onChange: (data: ToggleEntry | boolean) => void;
}

export function Item({
  controlled,
  option,
  label,
  invalid,
  helpId,
  checked,
  defaultChecked,
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
      <label htmlFor={id}>{label || option?.label}</label>
    </>
  );
}
