import * as React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import { classNames } from '@chbphone55/classnames';

import { CheckboxContext } from './CheckboxContext';

export type CheckboxGroupProps = {
    /**
     * The Checkboxes within the CheckboxGroup
     */
    children: React.ReactNode;
    /** Additional CSS class for the container. */
    className?: string;

    /** The default value (uncontrolled). */
    defaultValue?: string[];

    /** Whether group is disabled. */
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

    /** The content to display as the label. */
    label?: React.ReactNode;

    /** Handler that is called when the values changes. */
    onChange?: (value: string[]) => void;

    /** Values of the selected checkboxes. (controlled)
     */
    value?: string[];
} & Omit<
    React.PropsWithoutRef<JSX.IntrinsicElements['div']>,
    'onChange' | 'defaultValue'
>;

function CheckboxGroup(
    {
        children,
        defaultValue,
        disabled,
        error,
        invalid,
        helpText,
        id,
        label,
        onChange = noop,
        value,
        ...props
    }: CheckboxGroupProps,
    ref: React.Ref<HTMLDivElement>,
) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.checked
            ? (value ?? []).concat(event.target.value)
            : (value ?? []).filter((v) => v !== event.target.value);

        onChange(newValue);
    }

    const groupId = useId(id);

    const labelId = label ? `${groupId}__label` : undefined;
    const helpId = helpText ? `${groupId}__hint` : undefined;

    const isInvalid = invalid || error;

    return (
        <div
            aria-labelledby={labelId}
            {...props}
            // Only render the id if it was a provided one, as the generated one from useField doesn't have any
            // purpose for the group element itself
            id={id}
            ref={ref}
            role="group"
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
            <CheckboxContext.Provider
                value={{
                    ariaDescribedby: helpId,
                    defaultValue,
                    disabled,
                    onChange: handleChange,
                    value,
                }}
            >
                {children}
            </CheckboxContext.Provider>

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
 * A CheckboxGroup allows users to select one or more items from a list of choices.
 */
const _CheckboxGroup = React.forwardRef(CheckboxGroup);
export { _CheckboxGroup as CheckboxGroup };
