import * as React from 'react';
import { classNames } from '@chbphone55/classnames';
import type { BreadcrumbsProps } from './props';

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { children, className, ...rest } = props;
  const ariaLabel = props['aria-label'] || 'Her er du';

  return (
    <nav
      className={classNames('flex space-x-8 space-x-reverse', props.className)}
      aria-label={ariaLabel}
      {...rest}
    >
      <h2 className="sr-only">{ariaLabel}</h2>
      {children?.map((crumb, i) => [
        crumb,
        i !== children.length - 1 && (
          <span key={i} aria-hidden className="select-none">
            /
          </span>
        ),
      ])}
    </nav>
  );
};
