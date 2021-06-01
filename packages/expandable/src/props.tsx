import * as React from 'react';

export type ExpandableProps = {
    children: React.ReactNode;

    /**
     * Additional classes to include
     */
    className?: string;

    /**
     * CSS styles to inline on the component
     */
    style?: React.CSSProperties;

    /**
     * Toggles bleed, makes a box full-width on mobile
     * @default false
     */
    bleed?: boolean;

    /**
     * Styles the box with light blue color
     * @default false
     */
    info?: boolean;

    /**
     * The state of the component, either true for expanded or false for closed.
     * @default false
     */
    expanded?: boolean;

    /**
     * Event function to be called any time the component is expanded or closed. Function will be passed a boolean with a value of true if the component is now expanded or false if it is now closed.
     */
    onChange?: (state: boolean) => void;

    /**
     * Component title. Can be a string or component. Used to display the title value which is always present regardless of whether the component is open or closed.
     */
    title: React.ReactNode;

    /**
     * Whether to display the component as a padded box or not.
     * @default false
     */
    box?: boolean;

    /**
     * Additional CSS classes to include on the button part of the component
     */
    buttonClass?: string;

    /**
     * Additional CSS classes to include on the content part of the component
     */
    contentClass?: string;

    /**
     * Whether to display the chevron on the button part of the component
     * @default true
     */
    chevron?: boolean;
};
