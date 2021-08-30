export type ModalProps = {
    /**
     * A string or your own custom elements
     */
    title?: string | JSX.Element | JSX.Element[];

    /**
     * Whether the modal is open or not
     */
    open: boolean;

    /**
     * A default back button or your own custom elements
     */
    left?: boolean | JSX.Element | JSX.Element[];

    /**
     * A default close button or your own custom elements
     */
    right?: boolean | JSX.Element | JSX.Element[];

    /**
     * Buttons passed to the footer
     */
    footer?: JSX.Element | JSX.Element[];

    /**
     * Additional classes added to the container
     */
    className?: string;

    /**
     * An id for the container and ARIA attributes. A random id is generated if none is provided.
     */
    id?: string;

    /**
     * Additional styles to the contianer
     */
    style?: React.CSSProperties;

    /**
     * The modal contents
     */
    children: JSX.Element | JSX.Element[];

    /**
     * Handler that is called when the user presses *esc* or clicks outside the modal
     */
    onDismiss?: () => void;

    /**
     * Defines a string value that labels the current element. Must be set if neither `aria-labelledby` or `<ModalHeading>` is defined,
     */
    'aria-label'?: string;

    /**
     * Identifies the element (or elements) that labels the current element. Must be set if neither `aria-label` or `<ModalHeading>` is defined.
     */
    'aria-labelledby'?: string;

    /**
     * A reference to the element that should be focused. By default it'll be the first interactive element.
     */
    initialFocusRef?: React.RefObject<any>;
};
