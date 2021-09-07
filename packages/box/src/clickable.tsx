import { classNames } from '@chbphone55/classnames';
import React from 'react';
import { ClickableProps } from './props';

export function Clickable({ children, ...props }: ClickableProps) {
    return React.createElement(
        props.href ? 'a' : 'button',
        {
            ...props,
            className: classNames(props.className, 'focus-ring'),
            type: props.href ? undefined : props.type || 'button',
        },
        <>
            <span className="inset-0 absolute" aria-hidden="true"></span>
            {children}
        </>,
    );
}
