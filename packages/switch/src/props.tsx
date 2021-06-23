export interface SwitchProps {
    /**
     * The unique identifier, usually used with a label so that you can toggle by clicking the label
     */
    id?: string;

    /**
     * Whether the Switch is disabled
     */
    disabled?: boolean;

    /**
     * When the Switch is toggled
     */
    onChange: (value: boolean) => void;

    /**
     * The default value of the Switch
     */
    value: boolean;
}
