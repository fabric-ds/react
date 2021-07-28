import { classNames } from '@chbphone55/classnames';
import { useId } from '@finn-no/fabric-react-utils';
import React, { forwardRef, Ref, useRef } from 'react';
import { TextAreaProps } from './props';
import useTextAreaHeight from './useTextAreaHeight';

/**
 * A textarea component that automatically resizes as content changes.
 */
function TextArea(
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
) {
    const ref = useRef<HTMLTextAreaElement | null>(null);

    useTextAreaHeight({
        ref,
        value,
        maximumRows,
        minimumRows,
    });

    const id = useId(providedId);
    const helpId = helpText ? `${id}__hint` : undefined;

    const isInvalid = invalid ?? error;

    const classes = {
        'input--is-invalid': isInvalid,
        'input--is-disabled': disabled,
        'input--is-read-only': readOnly,
    };

    return (
        <div
            className={classNames('input mb-0', classes, className)}
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
}

const _TextArea = forwardRef(TextArea);
export { _TextArea as TextArea };
