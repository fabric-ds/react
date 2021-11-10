import { classNames } from '@chbphone55/classnames';
import { useId } from '../../utils/src';
import React, { forwardRef } from 'react';
import { TextFieldProps } from './props';

export const TextField = forwardRef(
  (
    {
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
      ...props
    }: TextFieldProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const id = useId(providedId);

    const helpId = helpText ? `${id}__hint` : undefined;
    const isInvalid = invalid || error;

    return (
      <div
        className={classNames({
          'has-suffix': children?.props.suffix,
          'has-prefix': children?.props.prefix,
        })}
      >
        <div className="input">
          {label && <label htmlFor={id}>{label}</label>}
          <div
            className={classNames(className, {
              'input mb-0': true,
              'input--is-invalid': isInvalid,
              'input--is-disabled': disabled,
              'input--is-read-only': readOnly,
            })}
            style={style}
          >
            <input
              {...props}
              aria-describedby={helpId}
              aria-errormessage={isInvalid && helpId ? helpId : undefined}
              aria-invalid={isInvalid}
              disabled={disabled}
              id={id}
              readOnly={readOnly}
              ref={ref}
              type={type}
            />
            {helpText && (
              <div className="input__sub-text" id={helpId}>
                {helpText}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  },
);
