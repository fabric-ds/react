import * as React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import { useForkedRef } from '@reach/utils';
import { classNames } from '@chbphone55/classnames';
import warning from 'tiny-warning';

import useTextAreaHeight from './useTextAreaHeight';

export type TextAreaProps = {
    /** Whether the element should receive focus on render. */
    autoFocus?: boolean;

    /** Additional CSS class for the container */
    className?: string;

    /** The default value (uncontrolled). */
    defaultValue?: string;

    /** Whether the input is disabled. */
    disabled?: boolean;

    /**
     * Renders the field in an invalid state. Often paired together with `helpText` to provide feedback about the error.
     *
     * @deprecated use `invalid` instead.
     */
    error?: boolean;

    /**  Renders the field in an invalid state. Often paired together with `helpText` to provide feedback about the error. */
    invalid?: boolean;

    /** The content to display as the help text. */
    helpText?: React.ReactNode;

    /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
    id?: string;

    /** The content to display as the label. */
    label?: string;

    /** Handler that is called when the element loses focus. */
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

    /** Handler that is called when the value changes.*/
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

    /** Handler that is called when the element receives focus. */
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

    /** Maximum number of text rows upto which the input can grow. */
    maximumRows?: number;

    /** Minimum number of text rows to show for the input. */
    minimumRows?: number;

    /** The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
    name?: string;

    /** Text hint that occupies the text input when it is empty. */
    placeholder?: string;

    /** Whether the input can be selected but not changed by the user. */
    readOnly?: boolean;

    /** Whether user input is required on the input before form submission. */
    required?: boolean;

    /** Additional CSS styles for the container. */
    style?: React.CSSProperties;

    /** The current value (controlled). */
    value?: string;
} & Omit<
    React.PropsWithoutRef<JSX.IntrinsicElements['textarea']>,
    // omit these, otherwise they seem to form a union type (in the prop table docs)
    'onBlur' | 'onFocus' | 'onChange' | 'value' | 'defaultValue'
>;

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
    forwardRef: React.Ref<HTMLTextAreaElement>,
) {
    if (process.env.NODE_ENV !== 'production') {
        // useEffect with an empty array to only warn once per component instance
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
            // Warn if neither aria-label or aria-labelledby is provided.
            // It is considered WCAG best practice for radio groups.
            warning(
                label || props['aria-label'] || props['aria-labelledby'],
                `<TextArea> requires a 'label', 'aria-label' or an 'aria-labelledby' to be accessible to screen readers.`,
            );

            // Warn if we are using the deprecated error prop
            warning(
                error == null,
                `<TextArea>: The 'error' prop is deprecated. Use 'invalid' instead.`,
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    }

    const ref = React.useRef<HTMLTextAreaElement | null>(null);

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

    const forkedRef = useForkedRef(ref, forwardRef);

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
                ref={forkedRef}
                readOnly={readOnly}
                value={value}
            />
            {helpText && <div className="input__sub-text">{helpText}</div>}
        </div>
    );
}

const _TextArea = React.forwardRef(TextArea);
export { _TextArea as TextArea };
