import * as React from 'react';
import { classNames } from '@chbphone55/classnames';
import { interleave } from './utils';
import type { BreadcrumbsProps } from './props';

const setup = (props) => {
    const { children, ariaLabel, style, className, ...rest } = props;
    return {
        attrs: {
            ...rest,
            children: interleave(React.Children.toArray(children)),
            'aria-label': ariaLabel || 'Her er du',
            style,
        },
        classes: classNames('flex space-x-8', className),
    };
};

export const Breadcrumbs = (props: BreadcrumbsProps) => {
    const { classes, attrs } = setup(props);
    return <nav className={classes} {...attrs} />;
};
