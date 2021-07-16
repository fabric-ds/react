import React from 'react';
import { card as c } from '@finn-no/fabric-component-classes';
import { classNames } from '@chbphone55/classnames';
import { CardProps } from './props';

export function Card({ as = 'div', children, ...props }: CardProps) {
    return React.createElement(
        as,
        {
            ...props,
            className: classNames(props.className, {
                [c.card]: true,
                [c.cardSelected]: props.selected,
                [c.cardOutline]: true,
                [props.selected
                    ? c.cardOutlineSelected
                    : c.cardOutlineUnselected]: true,
            }),
        },
        children,
    );
}
