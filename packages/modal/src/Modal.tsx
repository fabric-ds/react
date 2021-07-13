import * as React from 'react';
import { classNames } from '@chbphone55/classnames';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { useId } from '@finn-no/fabric-react-utils';

export type ModalProps = {
    /**
     * Defines a string value that labels the current element. Must be set if neither `aria-labelledby` or `<ModalHeading>` is defined,
     */
    'aria-label'?: string;

    /**
     * Identifies the element (or elements) that labels the current element. Must be set if neither `aria-label` or `<ModalHeading>` is defined.
     */
    'aria-labelledby'?: string;

    className?: string;

    /**
     * A reference to the element that should be focused. By default it'll be the first interactive element.
     */
    initialFocusRef?: React.RefObject<any>;

    /** Whether the modal is open or not */
    isOpen: boolean;

    /**
     * Handler that is called when the user presses *esc* or clicks outside the modal
     */
    onDismiss?: () => void;

    style?: React.CSSProperties;
} & React.PropsWithoutRef<JSX.IntrinsicElements['div']>;

/**
 * A Modal dialog that renders on top the page
 */
export const Modal = ({
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    className,
    initialFocusRef,
    isOpen,
    onDismiss,
    style,
    ...props
}: ModalProps) => {
    const headingId = useId(ariaLabelledBy);

    console.log(
        classNames([
            'bg-white outline-none rounded-8 overflow-hidden flex flex-col',
            className,
        ]),
    );

    return (
        <DialogOverlay
            allowPinchZoom
            className="fixed inset-0 grid place-content-center z-10"
            initialFocusRef={initialFocusRef}
            isOpen={isOpen}
            onDismiss={onDismiss}
            style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
        >
            <DialogContent
                aria-label={ariaLabel}
                // if aria-label is undefined we assume the user is using ModalHeading or their own heading
                aria-labelledby={ariaLabel ? undefined : headingId}
                className={classNames([
                    className,
                    'bg-white outline-none rounded-8 overflow-hidden flex flex-col',
                ])}
                style={{
                    maxWidth: 300,
                    maxHeight: '80vh',
                    ...style,
                }}
                {...props}
            >
                <HeadingIdContext.Provider value={headingId}>
                    {children}
                </HeadingIdContext.Provider>
            </DialogContent>
        </DialogOverlay>
    );
};

export const HeadingIdContext = React.createContext<string>('');
