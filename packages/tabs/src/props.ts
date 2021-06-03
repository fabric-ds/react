import React from 'react';

export type TabsProps = {
    /**
     * Whether the tabs should use the contained look and feel or not.
     * @default false
     */
    contained?: boolean;

    /**
     * The Tabs within the container.
     */
    children: React.ReactNode;

    /** Additional CSS class for the container */
    className?: string;

    /** Handler that is called when the tab changes. */
    onChange?: (name: string) => void;

    /** Additional CSS styles for the container. */
    style?: React.CSSProperties;
};

export type TabProps = {
    setActive?: (name: string) => void;

    /** Additional CSS class for the tab. */
    className?: string;

    /** Additional content to be included in the tab (eg. icons). Content is placed above the label. */
    children?: React.ReactNode;

    /** Tab name identifier. This value will be omitted as the argument to the Tabs onChange handler. */
    name: string;

    /** The label of the tab item. */
    label: React.ReactNode;

    /** Used to set which tab should be active on mount. Defaults to the first tab if not present. */
    isActive?: boolean;

    /** Additional CSS styles for the tab. */
    style?: React.CSSProperties;

    /**
     * Action to be called when the component is clicked
     */
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};