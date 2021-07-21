export interface ToastProps {
    /**
     * Type of alert
     */
    type?: 'success' | 'error' | 'warning' | 'info' | string;

    /**
     * Duration of toast in milliseconds
     * Set to 0 to disable auto-removal
     * @default  2400
     */
    duration?: number;

    /**
     * The toast message
     */
    text: string;

    /**
     * Can toast be dismissed?
     * @default true
     */
    canClose?: boolean;

    /**
     * Dismiss handler
     */
    onClose?: () => void;
}
