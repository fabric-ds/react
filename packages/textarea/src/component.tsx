import { classNames } from '@chbphone55/classnames';
import { useId } from '../../utils/src';
import React, { forwardRef, Ref, useRef } from 'react';
import { TextAreaProps } from './props';
import useTextAreaHeight from './useTextAreaHeight';

/**
 * A textarea component that automatically resizes as content changes.
 */
export const TextArea = forwardRef(
  (
    {
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
      ...props
    }: TextAreaProps,
    forwardRef: Ref<HTMLTextAreaElement>,
  ) => {
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
        {label && <label htmlFor={id}>{label}</label>}
        <textarea
          {...props}
          aria-describedby={helpId}
          aria-errormessage={isInvalid && helpId ? helpId : undefined}
          aria-invalid={isInvalid}
          disabled={disabled}
          id={id}
          ref={forwardRef || ref}
          readOnly={readOnly}
          value={value}
        />
        {helpText && <div className="input__sub-text">{helpText}</div>}
      </div>
    );
  },
);
