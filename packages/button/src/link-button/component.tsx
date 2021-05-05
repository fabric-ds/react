import * as React from 'react';
import { classNames } from '@chbphone55/classnames';
import type { LinkButtonProps } from './props';

function LinkButton(
    { className, small, type = 'button', ...props }: LinkButtonProps,
    forwardedRef: React.Ref<HTMLButtonElement>,
) {
    const classes = classNames(
        'button button--link',
        { 'button--small': small },
        className,
    );

    return (
        <button {...props} className={classes} ref={forwardedRef} type={type} />
    );
}

/**
 * A button that looks like a link
 */
const _LinkButton = React.forwardRef(LinkButton);
export { _LinkButton as LinkButton };
