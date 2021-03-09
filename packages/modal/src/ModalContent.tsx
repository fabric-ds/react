import * as React from 'react';
import { classNames } from '@chbphone55/classnames';

export type ModalContentProps = {
    className?: string;
    style?: React.CSSProperties;
} & React.PropsWithoutRef<JSX.IntrinsicElements['div']>;

/**
 * The component for the  `<Modal>` content. Handles overflow scrolling and spacing.
 */
export const ModalContent = ({ className, ...props }: ModalContentProps) => (
    <div
        className={classNames(
            'overflow-y-auto overflow-x-hidden p-32 last-child:mb-0',
            className,
        )}
        {...props}
    />
);
