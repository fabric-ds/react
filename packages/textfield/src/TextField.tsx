import * as React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import { classNames } from '@chbphone55/classnames';
import warning from 'tiny-warning';

export type TextFieldProps = {
    /** Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete) .*/
    autoComplete?: boolean;

    /** Whether the element should receive focus on render */
    autoFocus?: boolean;

    /** Additional CSS class for the container. */
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
    label?: React.ReactNode;

    /** Standard `input` max attribute, to be used with `type="number".` See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmax). */
    max?: number | string;

    /** Standard `input` min attribute, to be used with `type="number".` See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmin). */
    min?: number | string;

    /** The maximum number of characters supported by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmaxlength). */
    maxLength?: number;

    /** The minimum number of characters required by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmaxlength). */
    minLength?: number;

    /** The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
    name?: string;

    /** Handler that is called when the element loses focus. */
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

    /** Handler that is called when the value changes.*/
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

    /** Handler that is called when the element receives focus. */
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

    /** Regex pattern that the value of the input must match to be valid. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern). */
    pattern?: string;

    /** Text hint that occupies the text input when it is empty. */
    placeholder?: string;

    /** Whether the input can be selected but not changed by the user. */
    readOnly?: boolean;

    /** Whether user input is required on the input before form submission. */
    required?: boolean;

    /** Additional CSS styles for the container. */
    style?: React.CSSProperties;

    /** The type of input to render. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype). */
    type?: 'text' | 'search' | 'email' | 'password' | 'url' | 'tel' | 'number';

    /** The current value (controlled). */
    value?: string;
} & Omit<
    React.PropsWithoutRef<JSX.IntrinsicElements['input']>,
    // omit these, otherwise they seem to form a union type (in the prop table docs)
    'onBlur' | 'onFocus' | 'onChange' | 'type' | 'value'
>;

function TextField(
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
) {
    if (process.env.NODE_ENV !== 'production') {
        // useEffect with an empty array to only warn once per component instance
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
            // Warn if the component isn't accessible.
            warning(
                label || props['aria-label'] || props['aria-labelledby'],
                `<TextField> requires a 'label', 'aria-label' or an 'aria-labelledby' to be accessible to screen readers.`,
            );

            // Warn if we are using the deprecated error prop
            warning(
                error == null,
                `<TextField>: The 'error' prop is deprecated. Use 'invalid' instead.`,
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    }

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
}

const _TextField = React.forwardRef(TextField);
export { _TextField as TextField };
