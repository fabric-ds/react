export interface StepsProps {
    /**
     * Direction of steps
     * @default false
     */
    horizontal?: boolean;

    /**
     * Align steps to the right
     * @default false
     */
    right?: boolean;

    /**
     * Two or more `Step` components
     */
    children: JSX.Element[];

    /**
     * Additional CSS class for the container
     */
    className?: string;
}
