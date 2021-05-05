import * as React from 'react';

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
