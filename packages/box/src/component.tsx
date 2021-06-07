import React from 'react';
import { classNames } from '@chbphone55/classnames';
import { box } from '@finn-no/fabric-component-classes';
import type { BoxProps } from './props';

const setup = ({
    bleed,
    clickable,
    info,
    neutral,
    bordered,
    className,
    ...attrs
}: any) => ({
    ...attrs,
    tabIndex: clickable ? 0 : undefined,
    onKeyDown: clickable ? (event) => {
        // Manually mapping Enter and Space keydown events to the click event (if there is one).
        // The browser doesn't do this automatically unless the element is a button or an a-element.
        // The Box element can't be a button or link in case someone puts an interactive element inside the box, which would result in invalid HTML and severe a11y issues.
        if (typeof attrs.onClick === 'function' && (event.keyCode === 13 || event.keyCode === 32)) {
            attrs.onClick(event);
        }
    } : undefined,
    className: classNames(
        box.box,
        {
            [box.bleed]: bleed,
            [box.clickable]: clickable,
            'bg-aqua-50': info,
            'hover:bg-aqua-100 active:bg-aqua-200': info && clickable,
            'bg-bluegray-100': neutral,
            'hover:bg-bluegray-200 active:bg-bluegray-300':
                neutral && clickable,
            'border-2 border-bluegray-300': bordered,
        },
        className,
    ),
});

export function Box(props: BoxProps) {
    const { children, as = 'div', ...rest } = props;
    const attrs = setup(rest);
    return React.createElement(as, attrs, props.clickable ? (
        <>
            <div>{ children }</div>
            <span role="button" aria-label="Les mer"></span>
        </>
    ) : children);
}
