import * as React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import { classNames } from '@chbphone55/classnames';

import { useRadioProvider } from './RadioContext';

export type RadioProps = {
    /** Whether the element should receive focus on render. */
    autoFocus?: boolean;

    /** The label for the Radio */
    children?: React.ReactNode;

    /** Whether the radio buttion is disabled. */
    disabled?: boolean;

    /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
    id?: string;

    /**
     * The content do display as the label
     * @deprecated set the label as `children` instead.
     */
    label?: React.ReactNode;

    /** The value of the radio button, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value). */
    value: string;
} & Omit<React.PropsWithoutRef<JSX.IntrinsicElements['input']>, 'value'>;

const Radio = (
    {
        className,
        children,
        disabled: radioDisabled,
        id: providedId,
        label,
        style,
        value,
        ...props
    }: RadioProps,
    ref: React.Ref<HTMLInputElement>,
) => {
    const {
        ariaDescribedby,
        defaultValue: groupDefaultValue,
        disabled: groupDisabled,
        onChange = noop,
        name,
        required,
        value: groupValue,
    } = useRadioProvider();

    // Disable the rule here. Hopefully the provided id isn't passed conditionally
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const id = providedId || useId();

    const disabled = groupDisabled || radioDisabled;

    const isControlled = groupValue != null;

    return (
        <div
            className={classNames(
                'input-toggle',
                {
                    'input-toggle--is-disabled': disabled,
                },
                className,
            )}
            style={style}
        >
            <input
                aria-describedby={ariaDescribedby}
                checked={isControlled ? groupValue === value : undefined}
                defaultChecked={
                    !isControlled ? groupDefaultValue === value : undefined
                }
                disabled={disabled}
                id={id}
                name={name}
                onChange={(e) => onChange(e.target.value)}
                ref={ref}
                required={required}
                type="radio"
                value={value}
                {...props}
            />
            <label htmlFor={id}>{children || label}</label>
        </div>
    );
};

const noop = () => {};

/**
 * Radio buttons allow users to select a single option from a list of mutually exclusive options.
 * All possible options are exposed up front for users to compare.
 *
 * Cannot be used outside of a RadioGroup
 */
const _Radio = React.forwardRef(Radio);
export { _Radio as Radio };
