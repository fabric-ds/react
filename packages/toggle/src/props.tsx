export type ToggleEntry = {
    label: string;
    value?: unknown;
    checked?: boolean;
};

export interface ToggleProps {
    /**
     * The value of the Switch
     */
    type: 'radio' | 'checkbox' | 'radio-button';

    /**
     * An array of options to render
     */
    data: ToggleEntry | ToggleEntry[];

    /**
     * Retrieve the currently selected entry
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
