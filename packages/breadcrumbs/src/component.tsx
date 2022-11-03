import * as React from 'react';
import { classNames } from '@chbphone55/classnames';
import type { BreadcrumbsProps } from './props';
import { interleave } from '@fabric-ds/core/breadcrumbs';

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { children, className, ...rest } = props;
  const ariaLabel = props['aria-label'] || 'Her er du';

  // Handles arrays of nodes passed as children
  const flattenedChildren = children.flat(Infinity);

  return (
    <nav
      className={classNames('flex space-x-8 space-x-reverse', className)}
      aria-label={ariaLabel}
      {...rest}
    >
      <h2 className="sr-only">{ariaLabel}</h2>
      {interleave(
        flattenedChildren,
        <span aria-hidden className="select-none">
          /
        </span>,
      ).map((element, index) => (
        <React.Fragment key={index}>{element}</React.Fragment>
      ))}
    </nav>
  );
};
