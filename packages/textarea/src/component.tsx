import { classNames } from '@chbphone55/classnames';
import React, { forwardRef, useRef } from 'react';
import { useId } from '../../utils/src';
import { TextAreaProps } from './props';
import useTextAreaHeight from './useTextAreaHeight';

/**
 * A textarea component that automatically resizes as content changes.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, forwardRef) => {
    const {
      className,
      disabled,
      error,
      helpText,
      id: providedId,
      invalid,
      label,
      maximumRows,
      minimumRows,
      readOnly,
      style,
      value,
      optional,
      ...rest
    } = props;

    const id = useId(providedId);
    const ref = useRef<HTMLTextAreaElement | null>(null);

    const helpId = helpText ? `${id}__hint` : undefined;
    const isInvalid = invalid ?? error;

    useTextAreaHeight({
      ref,
      value,
      maximumRows,
      minimumRows,
    });

    return (
      <div
        className={classNames(className, {
          'input mb-0': true,
          'input--is-invalid': isInvalid,
          'input--is-disabled': disabled,
          'input--is-read-only': readOnly,
        })}
        style={style}
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
        <textarea
          {...rest}
          aria-describedby={helpId}
          aria-errormessage={isInvalid && helpId ? helpId : undefined}
          aria-invalid={isInvalid}
          disabled={disabled}
          id={id}
          // Support both our own ref and any forwarded ref
          ref={(node) => {
            ref.current = node;
            if (forwardRef) {
              if (typeof forwardRef === 'function') {
                forwardRef(node);
              } else {
                forwardRef.current = node;
              }
            }
          }}
          readOnly={readOnly}
          value={value}
        />
        {helpText && <div className="input__sub-text">{helpText}</div>}
      </div>
    );
  },
);
