import { classNames } from '@chbphone55/classnames';
import React, { forwardRef } from 'react';
import { useId } from '../../utils/src';
import { TextFieldProps } from './props';

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const {
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
      optional,
      ...rest
    } = props;

    const id = useId(providedId);

    const helpId = helpText ? `${id}__hint` : undefined;
    const isInvalid = invalid || error;

    const hasSuffix = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.props.suffix,
    );
    const hasPrefix = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.props.prefix,
    );

    return (
      <div
        className={classNames({
          'has-suffix': hasSuffix,
          'has-prefix': hasPrefix,
        })}
      >
        <div
          className={classNames({
            'input mb-0': true,
            'input--is-invalid': isInvalid,
            'input--is-disabled': disabled,
            'input--is-read-only': readOnly,
          })}
        >
          {label && (
            <label htmlFor={id}>
              {label}
              {optional && (
                <span className="pl-8 font-normal text-14 text-gray-500">
                  (valgfritt)
                </span>
              )}
            </label>
          )}
          <div className="relative">
            <input
              {...rest}
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
      </div>
    );
  },
);
