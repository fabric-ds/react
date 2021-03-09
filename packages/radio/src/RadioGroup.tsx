import * as React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import warning from 'tiny-warning';
import { classNames } from '@chbphone55/classnames';
import { RadioContext } from './RadioContext';

export type RadioGroupProps = {
    /**
     * The Radio(s) within the RadioGroup
     */
    children: React.ReactNode;

    /** Additional CSS class for the container. */
    className?: string;

    /** The default value (uncontrolled). */
    defaultValue?: string;

    /** Whether radio group is disabled. */
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

    /** The name of the RadioGroup, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
    name?: string;

    /** Handler that is called when the value changes.*/
    onChange?: (value: string) => void;

    /** Whether user input is required on the input before form submission. */
    required?: boolean;

    /** Additional CSS styles for the container. */
    style?: React.CSSProperties;

    /** The current value (controlled). */
    value?: string;
} & Omit<
    React.PropsWithoutRef<JSX.IntrinsicElements['div']>,
    'onChange' | 'defaultValue'
>;

function RadioGroup(
    {
        children,
        defaultValue,
        disabled,
        id,
        invalid,
        name,
        error,
        helpText,
        label,
        onChange,
        required,
        value,
        ...props
    }: RadioGroupProps,
    ref: React.Ref<HTMLDivElement>,
) {
    if (process.env.NODE_ENV !== 'production') {
        // useEffect with an empty array to only warn once per component instance
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
            // Warn if the component isn't accessible.
            warning(
                label || props['aria-label'] || props['aria-labelledby'],
                `<RadioGroup> requires a 'label', 'aria-label' or an 'aria-labelledby' to be accessible to screen readers.`,
            );
            // Warn if we are using the deprecated error prop
            warning(
                error == null,
                `<RadioGroup>: The 'error' prop is deprecated. Use 'invalid' instead.`,
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    }

    const radioGroupName = useId(name);
    const groupId = useId(id);

    const labelId = label ? `${groupId}__label` : undefined;
    const helpId = helpText ? `${groupId}__hint` : undefined;

    const isInvalid = invalid || error;

    return (
        <div
            aria-errormessage={isInvalid && helpId ? helpId : undefined}
            aria-invalid={isInvalid}
            aria-labelledby={labelId}
            ref={ref}
            // Only render the id if it was a provided one, as the generated one from useId doesn't have any
            // purpose for the group element itself
            id={id}
            {...props}
            role="radiogroup"
        >
            {label && (
                <div
                    id={labelId}
                    className={classNames('field-label', {
                        'text-danger': isInvalid,
                    })}
                >
                    {label}
                </div>
            )}
            <RadioContext.Provider
                value={{
                    ariaDescribedby: helpId,
                    defaultValue,
                    disabled,
                    name: radioGroupName,
                    onChange,
                    required,
                    value,
                }}
            >
                {children}
            </RadioContext.Provider>
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

/**
 * Radio groups allow users to select a single option from a list of mutually exclusive options.
 * All possible options are exposed up front for users to compare.
 */
const _RadioGroup = React.forwardRef(RadioGroup);
export { _RadioGroup as RadioGroup };
