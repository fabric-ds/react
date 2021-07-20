export interface CardProps {
    /**
     * The contents of the Card
     */
    children: JSX.Element | JSX.Element[];

    /**
     * If the card is selected
     */
    selected?: boolean;

    /**
     * The wrapping container element
     * @default div
     */
    as?: string;

    /**
     * Add your own custom styles to the container element
     */
    className?: string;

    /**
     * When the card is clicked
     */
    onClick?: () => void;
}
