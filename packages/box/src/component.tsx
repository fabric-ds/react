import React from 'react';
import { classNames } from '@chbphone55/classnames';
import { box } from '@finn-no/fabric-component-classes';

const setup = ({
    bleed,
    clickable,
    info,
    neutral,
    bordered,
    className,
    ...attrs
}) => ({
    ...attrs,
    tabIndex: clickable ? 0 : undefined,
    role: clickable ? 'button' : undefined,
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

export function Box(props) {
    const { children, as = 'div', ...rest } = props;
    const attrs = setup(rest);
    return React.createElement(as, attrs, children);
}
