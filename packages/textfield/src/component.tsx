import { classNames } from '@chbphone55/classnames';
import { useId } from '@finn-no/fabric-react-utils';
import React, { forwardRef } from 'react';
import { TextFieldProps } from './props';

export const TextField = forwardRef(
    (
        {
            className,
            disabled,
            id: providedId,
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
            </div>
        );
    },
);
