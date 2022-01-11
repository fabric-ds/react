import { classNames } from '@chbphone55/classnames';
import React, { forwardRef } from 'react';
import { useId } from '../../utils/src';
import { TextFieldProps } from './props';

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const {
      className,
      disabled,
      id: providedId,
      children,
      invalid,
      error,
      helpText,
      label,
      readOnly,
      type = 'text',
      style,
      ...rest
    } = props;

    const id = useId(providedId);

    const helpId = helpText ? `${id}__hint` : undefined;
    const isInvalid = invalid || error;

    const hasPrefix = children?.props.prefix;
    const hasSuffix = children?.props.suffix;

    return (
      <div
        className={classNames({
          'input mb-0': true,
          'input--is-invalid': isInvalid,
          'input--is-disabled': disabled,
          'input--is-read-only': readOnly,
          'has-suffix': hasSuffix,
          'has-prefix': hasPrefix,
        })}
      >
        {label && <label htmlFor={id}>{label}</label>}
        <div className="relative">
          <input
            {...rest}
            style={{
              paddingLeft: hasPrefix && 37,
              paddingRight: hasSuffix && 37,
            }}
            aria-describedby={helpId}
            aria-errormessage={isInvalid && helpId ? helpId : undefined}
            aria-invalid={isInvalid}
            disabled={disabled}
            id={id}
            readOnly={readOnly}
            ref={ref}
            type={type}
          />
          {children}
        </div>

        {helpText && (
          <div className="input__sub-text" id={helpId}>
            {helpText}
          </div>
        )}
      </div>
    );
  },
);
