import * as React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import { classNames } from '@chbphone55/classnames';
import warning from 'tiny-warning';

export type SelectProps = {
    /** Whether the element should receive focus on render. */
    autoFocus?: boolean;

    /** The `option` elements to populate the select with */
    children?: React.ReactNode;

    /** Additional CSS class for the container. */
    className?: string;

    /** The default value (uncontrolled). */
    defaultValue?: string;

    /** Whether the select is disabled. */
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

    /** The name of the select element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
    name?: string;

    /** Handler that is called when the element loses focus. */
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;

    /** Handler that is called when the value changes.*/
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;

    /** Handler that is called when the element receives focus. */
    onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;

    /** Whether user input is required on the select before form submission. */
    required?: boolean;

    /** Additional CSS styles for the container. */
    style?: React.CSSProperties;

    /** The current value (controlled). */
    value?: string;
} & Omit<
    React.PropsWithoutRef<JSX.IntrinsicElements['select']>,
    'onBlur' | 'onChange' | 'onFocus' | 'value' | 'defaultValue'
>;

function Select(
    {
        children,
        className,
        disabled,
        error,
        invalid,
        id: providedId,
        helpText,
        label,
        style,
        ...props
    }: SelectProps,
    ref: React.Ref<HTMLSelectElement>,
) {
    if (process.env.NODE_ENV !== 'production') {
        // use a reference to only warn once per component instance
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
            // Warn if the component isn't accessible.
            warning(
                label || props['aria-label'] || props['aria-labelledby'],
                `<Select> requires a 'label', 'aria-label' or an 'aria-labelledby' to be accessible to screen readers.`,
            );

            // Warn if we are using the deprecated error prop
            warning(
                error == null,
                `<Select>: The 'error' prop is deprecated. Use 'invalid' instead.`,
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
    };

    return (
        <div
            className={classNames('input mb-0', classes, className)}
            style={style}
        >
            {label && <label htmlFor={id}>{label}</label>}
            <div className="input--select__wrap">
                <select
                    aria-describedby={helpId}
                    aria-errormessage={isInvalid && helpId ? helpId : undefined}
                    aria-invalid={isInvalid}
                    id={id}
                    disabled={disabled}
                    ref={ref}
                    {...props}
                >
                    {children}
                </select>
            </div>
            {helpText && (
                <div className="input__sub-text" id={helpId}>
                    {helpText}
                </div>
            )}
        </div>
    );
}

const _Select = React.forwardRef(Select);

export { _Select as Select };
