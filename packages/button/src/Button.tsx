import * as React from 'react';
import { classNames } from '@chbphone55/classnames';

export type ButtonProps = {
    /** The content to display in the button. */
    children: React.ReactNode;

    /** Additional CSS class for the button. */
    className?: string;

    /** Whether the button is disabled. */
    disabled?: boolean;

    /** Wheter the button has flat styles. Note that not all variants have a distinctive flat look. */
    flat?: boolean;

    /** If `true`, the button will render as in progress. */
    inProgress?: boolean;

    /** Handler that is called when the element is clicked. */
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

    /** Whether button should be a smaller size. */
    small?: boolean;

    /** Additional CSS styles for the button. */
    style?: React.CSSProperties;

    /** The behavior of the button when used in an HTML form.
     * @default button
     */
    type?: 'button' | 'submit' | 'reset';

    /**
     * The type of button to render.
     *
     * @default secondary
     */
    variant?: 'primary' | 'secondary' | 'destructive' | 'order' | 'utility';
} & Omit<
    React.PropsWithoutRef<JSX.IntrinsicElements['button']>,
    // omit children here, because we don't want children to be optional
    'children' | 'onClick'
>;

function Button(
    {
        className,
        disabled,
        flat,
        inProgress,
        small,
        type = 'button',
        variant = 'secondary',
        ...props
    }: ButtonProps,
    forwardedRef: React.Ref<HTMLButtonElement>,
) {
    const classes = {
        'button--is-disabled': !inProgress && disabled,
        'button--in-progress': inProgress,
        'button--small': small,
    };

    return (
        <button
            {...props}
            ref={forwardedRef}
            className={classNames(
                `button button--${getButtonVariant(variant, flat)}`,
                classes,
                className,
            )}
            disabled={disabled || inProgress}
            type={type}
        />
    );
}

function getButtonVariant(
    variant: 'primary' | 'secondary' | 'destructive' | 'order' | 'utility',
    flat?: boolean,
) {
    if (variant === 'destructive' && flat) {
        return 'destructive-flat';
    } else if (flat) {
        return 'tertiary';
    }
    return variant;
}

const _Button = React.forwardRef(Button);
export { _Button as Button };
