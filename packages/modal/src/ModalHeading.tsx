import * as React from 'react';
import { classNames } from '@chbphone55/classnames';

import { HeadingIdContext } from './Modal';

export type ModalHeadingProps = {
    className?: string;

    /**
     * If a custom id is required, use `aria-labelledby` on `<Modal>`.
     */
    id?: never;

    style?: React.CSSProperties;
} & React.PropsWithoutRef<JSX.IntrinsicElements['h1']>;

/**
 * A heading component that also labels the `Modal` for screen readers. Usually the first child
 * in `ModalContent`.
 *
 * There should only be a single instance of this component inside a `Modal`. If you need
 * additional headings, use regular heading elements.
 */
export const ModalHeading = ({
    className,
    children,
    ...props
}: ModalHeadingProps) => {
    const id = React.useContext(HeadingIdContext);

    return (
        <h1 className={classNames('h3 mb-16', className)} {...props} id={id}>
            {children}
        </h1>
    );
};
