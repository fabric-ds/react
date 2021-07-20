export interface ToastProps {
    /**
     * Type of alert
     */
    type?: 'success' | 'error' | 'warning' | 'info' | 'loading';

    /**
     * The content
     */
    text: string;

    /**
     * Can toast be dismissed?
     * @default true
     */
    canClose?: boolean;

    /**
     * Handler for when closed
     */
    onClose?: () => void;
}
