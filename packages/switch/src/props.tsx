export interface SwitchProps {
    /**
     * The unique identifier
     */
    id?: string;

    /**
     * Whether the Switch is disabled
     */
    disabled?: boolean;

    /**
     * Handler for when the Switch is clicked
     */
    onClick: (value: boolean) => void;

    /**
     * The value of the Switch
     */
    value: boolean;
}
