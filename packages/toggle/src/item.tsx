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
  noVisibleLabel?: boolean;
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
  noVisibleLabel,
  labelClassName,
  ...props
}: ItemProps) {
  const id = useId();

  const labelContent = !children ? label || option?.label : children;

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
        {noVisibleLabel ? (
          <span className="invisible w-0">{labelContent}</span>
        ) : (
          labelContent
        )}
      </label>
    </>
  );
}
