import React from 'react';
export interface BoxProps {
    /**
     * Expand element children
     */
    children: JSX.Element | JSX.Element[];

    /**
     * Additional classes to include
     */
    className?: string;

    /**
     * CSS styles to inline on the component
     */
    style?: React.CSSProperties;

    /**
     * Action to be called when the component is clicked
     */
    onClick?: (
        e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent,
    ) => void;

    /**
     * Allows customization of the underlying HTML element
     * @default div
     */
    as?: string;

    /**
     * Toggles bleed, makes a box full-width on mobile
     * @default false
     */
    bleed?: boolean;

    /**
     * Applies focus and pointer helpers, should be used with other styling to indicate clickability
     * @default false
     */
    clickable?: boolean;

    /**
     * @default false
     */
    bordered?: boolean;

    /**
     * Styles the box with light blue color
     * @default false
     */
    info?: boolean;

    /**
     * Style the box with light gray color
     * @default false
     */
    neutral?: boolean;
}

export type ClickableProps = {
    /**
     * Clickable element children
     */
    children: JSX.Element | JSX.Element[] | string;

    /**
     * Redirect to url on click
     * If passed, clickable renders as an anchor tag allowing you to pass properties such as target, rel, etc.
     */
    href?: string;

    /**
     * Click handler
     * If passed, clickable renders as a button with a click event
     */
    onClick?: () => void;
} & Partial<Omit<HTMLAnchorElement, 'children'>> &
    Partial<Omit<HTMLButtonElement, 'children'>>;
