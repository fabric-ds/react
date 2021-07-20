import React from 'react';
import { card as c } from '@finn-no/fabric-component-classes';
import { classNames } from '@chbphone55/classnames';
import { CardProps } from './props';

export function Card({ as = 'article', children, ...props }: CardProps) {
    return React.createElement(
        as,
        {
            ...props,
            className: classNames(props.className, {
                'outline-none focus:ring ring-offset-1 ring-aqua-200': true,
                [c.card]: true,
                [c.cardSelected]: props.selected,
                [c.cardOutline]: true,
                [props.selected
                    ? c.cardOutlineSelected
                    : c.cardOutlineUnselected]: true,
                [props.selected ? 'focus:border-blue-500' : '']: true,
            }),
            tabIndex: 0,
            onKeyDown: props.onClick
                ? (e) => {
                      if (
                          typeof props.onClick === 'function' &&
                          (e.key === 'Enter' || e.key === ' ')
                      ) {
                          e.preventDefault();
                          props.onClick();
                          return;
                      }
                  }
                : undefined,
        },
        <>
            {props.onClick && (
                <button
                    className="sr-only"
                    aria-pressed={props.selected}
                    tabIndex={-1}
                >
                    Velg
                </button>
            )}

            {!props.onClick && props.selected && (
                <span
                    role="checkbox"
                    aria-checked="true"
                    aria-disabled="true"
                />
            )}

            {children}
        </>,
    );
}
