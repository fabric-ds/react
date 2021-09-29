import * as React from 'react';
import { classNames } from '@chbphone55/classnames';
import { interleave } from './utils';
import type { BreadcrumbsProps } from './props';

const setup = (props) => {
  const { children, ariaLabel, className, ...rest } = props;
  return {
    attrs: {
      'aria-label': ariaLabel || 'Her er du',
      ...rest,
    },
    children: interleave(React.Children.toArray(children)),
    classes: classNames('flex space-x-8', className),
  };
};

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { classes, children, attrs } = setup(props);
  return (
    <nav className={classes} {...attrs}>
      <h2 className="u-screen-reader-only">{attrs['aria-label']}</h2>
      {children}
    </nav>
  );
};
