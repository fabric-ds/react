export type ToggleEntry = {
    label: string;
    value: unknown;
};

export interface ToggleProps {
    /**
     * The type of Toggle
     */
    type: 'radio' | 'checkbox' | 'radio-button';

    /**
     * The option(s) title
     */
    title?: string;

    /**
     * Renders options in invalid state. Often paired together with `helpText` to provide feedback about the error.
     */
    invalid?: boolean;

    /**
     * Help text beneath options
     */
    helpText?: string;

    /**
     * An array of options to render
     */
    options?: ToggleEntry[];

    /**
     * An array of options to be checked on mount
     */
    selected?: ToggleEntry[];

    /**
     * If you only need to render a single option, use this prop instead
     */
    label?: string;

    /**
     * Whether the single option should be checked by default
     */
    checked?: boolean;

    /**
     * Retrieve the selected entry or a boolean value, depending on whether you are working with single or multiple options
     */
    onChange: (value: ToggleEntry | boolean) => void;

    /**
     * Whether the elements should be small
     */
    small?: boolean;

    /**
     * Will make each radio-button equal width
     */
    equalWidth?: boolean;
}
