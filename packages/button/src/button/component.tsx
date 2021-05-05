import * as React from 'react';
import { classNames } from '@chbphone55/classnames';
import type { ButtonProps } from './props';
import { getButtonVariant } from './utils';

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
    const classes = classNames(
        'button',
        `button--${getButtonVariant(variant, flat)}`,
        {
            'button--is-disabled': !inProgress && disabled,
            'button--in-progress': inProgress,
            'button--small': small,
        },
        className,
    );

    return (
        <button
            {...props}
            ref={forwardedRef}
            className={classes}
            disabled={disabled || inProgress}
            type={type}
        />
    );
}

const _Button = React.forwardRef(Button);
export { _Button as Button };
