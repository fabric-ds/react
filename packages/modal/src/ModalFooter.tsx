import * as React from 'react';
import { classNames } from '@chbphone55/classnames';

export type ModalFooterProps = {
    className?: string;

    /**
     * The space to display between columns. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap).
     */
    columnGap?:
        | 0
        | 1
        | 2
        | 4
        | 6
        | 8
        | 10
        | 12
        | 14
        | 16
        | 20
        | 24
        | 28
        | 32
        | 40
        | 44
        | 48
        | 56
        | 64
        | 80
        | 96
        | 112
        | 128
        | 144;

    style?: React.CSSProperties;
} & React.PropsWithoutRef<JSX.IntrinsicElements['div']>;

/**
 * A flexed footer. Usuallly used together with actionable buttons for the modal.
 *
 * Use `columnGap` to adjust the spacing between the columns.
 */
export const ModalFooter = ({
    className,
    columnGap = 8,
    ...props
}: ModalFooterProps) => (
    <div
        className={classNames(
            // negative margin here to offset the padding of ModalContent
            'flex justify-end p-32 -mt-32',
            { [`space-x-${columnGap}`]: columnGap },
            className,
        )}
        {...props}
    />
);
