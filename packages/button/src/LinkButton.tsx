import * as React from 'react';
import { classNames } from '@chbphone55/classnames';

export type LinkButtonProps = {
    /** The content to display in the button. */
    children: React.ReactNode;

    /** Additional CSS class for the button. */
    className?: string;

    /** Whether the button is disabled. */
    disabled?: boolean;

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
    // omit children here, because we don't want children to be optional
} & Omit<
    React.PropsWithoutRef<JSX.IntrinsicElements['button']>,
    'children' | 'onClick'
>;

function LinkButton(
    { className, small, type = 'button', ...props }: LinkButtonProps,
    forwardedRef: React.Ref<HTMLButtonElement>,
) {
    return (
        <button
            {...props}
            className={classNames(
                'button button--link',
                { 'button--small': small },
                className,
            )}
            ref={forwardedRef}
            type={type}
        />
    );
}

/**
 * A button that looks like a link
 */
const _LinkButton = React.forwardRef(LinkButton);
export { _LinkButton as LinkButton };
