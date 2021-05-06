import * as React from 'react';

export type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset';
    primary?: boolean,
    secondary?: boolean,
    negative?: boolean,
    utility?: boolean,
    quiet?: boolean,
    small?: boolean,
    red?: boolean,
    link?: boolean,
    pill?: boolean,
    loading?: boolean,
    href?: string,
    label?: string
      
} & Omit<
    React.PropsWithoutRef<JSX.IntrinsicElements['button']>,
    // omit children here, because we don't want children to be optional
    'children' | 'onClick'
>;
