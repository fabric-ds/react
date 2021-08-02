export type ComboboxOption = {
    value: string;
    label?: string;
};

export type ComboboxProps = {
    /**
     * Unique identifier for the input field
     */
    id?: string | number;

    /**
     * The available options to select from
     */
    options: ComboboxOption[];

    /**
     * Label above input
     */
    label?: string;

    /**
     * Input placeholder
     */
    placeholder?: string;

    /**
     * Whether the popover opens when focus is on the text field.
     * @default false
     */
    openOnFocus?: boolean;

    /**
     * Whether the matching text segments in the options should be highlighted. Customise the styling by using CSS selectors to override `[data-combobox-text-match]`.
     * @default false
     */
    matchTextSegments?: boolean;

    /**
     * Called when the user selects an option
     */
    onSelect?(value: string): void;

    /**
     * Called when the value of the input changes
     */
    onChange?(value: string): void;

    /**
     * Additional combobox styling
     */
    className?: string;

    /**
     * Defines a string value that labels the current element. Must be set if `aria-labelledby` is not defined,
     */
    'aria-label'?: string;

    /**
     * Identifies the element (or elements) that labels the current element. Must be set if `aria-label` is not defined.
     */
    'aria-labelledby'?: string;
};
