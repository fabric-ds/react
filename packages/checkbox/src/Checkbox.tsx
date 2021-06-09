import * as React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import { classNames } from '@chbphone55/classnames';

import { useCheckboxProvider } from './CheckboxContext';

export type CheckboxProps = {
    /** Whether the element should receive focus on render. */
    autoFocus?: boolean;

    /** Whether the element should be checked (controlled). */
    checked?: boolean;

    /** The label for the Checkbox */
    children?: React.ReactNode;

    /** Additional CSS class for the container. */
    className?: string;

    /** The default checked value (uncontrolled). */
    defaultChecked?: boolean;

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

    /**
     * The content do display as the label
     * @deprecated set the label as `children` instead.
     */
    label?: React.ReactNode;

    /** The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
    name?: string;

    /** Handler that is called when the element loses focus. */
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

    /** Handler that is called when the value changes.*/
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

    /** Handler that is called when the element receives focus. */
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

    /** Whether user input is required on the input before form submission. */
    required?: boolean;

    /** Additional CSS styles for the container. */
    style?: React.CSSProperties;

    /** The value of the input, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue). */
    value?: string;
} & Omit<
    React.PropsWithoutRef<JSX.IntrinsicElements['input']>,
    'onChange' | 'onFocus' | 'onBlur' | 'value'
>;

function Checkbox(
    {
        children,
        checked,
        className,
        defaultChecked,
        disabled,
        error,
        invalid,
        helpText,
        id: providedId,
        label,
        onChange = noop,
        style,
        value,
        ...props
    }: CheckboxProps,
    ref: React.Ref<HTMLInputElement>,
) {
    const {
        ariaDescribedby: groupAriaDescribedby,
        disabled: groupDisabled,
        defaultValue: groupDefaultValue,
        onChange: onGroupChange = noop,
        value: groupValue,
    } = useCheckboxProvider();

    const id = useId(providedId);
    const helpId = helpText ? `${id}__hint` : undefined;

    const isInvalid = invalid || error;

    const isDisabled = disabled || groupDisabled;

    const isDefaultChecked =
        // @ts-ignore
        (groupDefaultValue && groupDefaultValue.includes(value)) ??
        defaultChecked;

    const isChecked =
        // @ts-ignore
        (groupValue && groupValue.includes(value)) ?? checked;

    return (
        <div
            className={classNames(
                'input-toggle',
                {
                    'input-toggle--is-disabled': isDisabled,
                },
                className,
            )}
            style={style}
        >
            <input
                {...props}
                aria-describedby={groupAriaDescribedby ?? helpId}
                aria-errormessage={isInvalid && helpId ? helpId : undefined}
                aria-invalid={isInvalid}
                checked={isChecked}
                defaultChecked={isDefaultChecked}
                disabled={isDisabled}
                id={id}
                onChange={(e) => {
                    onChange(e);
                    onGroupChange(e);
                }}
                ref={ref}
                type="checkbox"
                value={value}
            />
            <label htmlFor={id}>{children || label}</label>
            {helpText && (
                <div
                    className={classNames('field-hint', {
                        'text-danger': isInvalid,
                    })}
                    id={helpId}
                >
                    {helpText}
                </div>
            )}
        </div>
    );
}

const noop = () => {};

/**
 * Checkboxes allow users to select multiple items from a list of individual items, or to mark one individual item as selected.
 */
const _Checkbox = React.forwardRef(Checkbox);
export { _Checkbox as Checkbox };
