import * as React from 'react';

export type BreadcrumbsProps = {
    // prop table doc seems unable to pull out default value with the rename in the function definition
    /** Defines a string value that labels the current element.
     * @default Her er du
     */
    'aria-label'?: string;

    className?: string;

    children?: React.ReactNode[];

    style?: React.CSSProperties;
    // omit aria-label for better prop table docs
} & Omit<React.PropsWithoutRef<JSX.IntrinsicElements['nav']>, 'aria-label'>;
