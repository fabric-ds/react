import React from 'react';
import { useId } from '../../utils/src';
import { ToggleEntry } from './props';

interface ItemProps extends Pick<HTMLInputElement, 'type' | 'name'> {
  controlled: boolean;
  option?: ToggleEntry;
  children?: React.ReactNode;
  indeterminate?: boolean;
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
  indeterminate = false,
  checked,
  defaultChecked,
  noVisibleLabel,
  labelClassName,
  ...props
}: ItemProps) {
  const id = useId();
  const checkboxRef = React.useRef<HTMLInputElement | null>(null);

  const labelContent = !children ? label || option?.label : children;

  React.useEffect(() => {
    if (!checkboxRef.current) {
      return;
    }
    // 'indeterminate' state of checkbox cannot be assigned via HTML: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes
    checkboxRef.current.indeterminate = indeterminate;
  }, [indeterminate, checkboxRef]);

  return (
    <>
      <input
        ref={checkboxRef}
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
          <span className="sr-only">{labelContent}</span>
        ) : (
          labelContent
        )}
      </label>
    </>
  );
}
