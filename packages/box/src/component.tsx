import { classNames } from '@chbphone55/classnames';
import { box } from '@finn-no/fabric-component-classes';
import React from 'react';
import type { BoxProps } from './props';

export function Box({ children, as = 'div', ...props }: BoxProps) {
    return React.createElement(
        as,
        {
            ...(props as Omit<BoxProps, 'children'> as {}),
            tabIndex: props.clickable ? 0 : undefined,
            onKeyDown: props.clickable
                ? (event) => {
                      // Manually mapping Enter and Space keydown events to the click event (if there is one).
                      // The browser doesn't do this automatically unless the element is a button or an a-element.
                      // The Box element can't be a button or link in case someone puts an interactive element inside the box, which would result in invalid HTML and severe a11y issues.
                      if (
                          typeof props.onClick === 'function' &&
                          (event.key === 'Enter' || event.key === ' ')
                      ) {
                          props.onClick(event);
                          return false;
                      }
                  }
                : undefined,
            className: classNames(
                box.box,
                {
                    [box.bleed]: props.bleed,
                    [box.clickable]: props.clickable,
                    'bg-aqua-50': props.info,
                    'hover:bg-aqua-100 active:bg-aqua-200':
                        props.info && props.clickable,
                    'bg-bluegray-100': props.neutral,
                    'hover:bg-bluegray-200 active:bg-bluegray-300':
                        props.neutral && props.clickable,
                    'border-2 border-bluegray-300': props.bordered,
                },
                props.className,
            ),
        },
        props.clickable ? (
            <>
                <div>{children}</div>
                <span role="button" aria-label="Les mer"></span>
            </>
        ) : (
            children
        ),
    );
}
