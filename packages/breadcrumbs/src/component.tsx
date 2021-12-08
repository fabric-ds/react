import * as React from 'react';
import { classNames } from '@chbphone55/classnames';
import type { BreadcrumbsProps } from './props';

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { children, className, ...rest } = props;
  const ariaLabel = props['aria-label'] || 'Her er du';

  const flatChildren = recurse(children, []);

  function recurse(obj, array) {
    for (let i = 0; i < obj.length; i++) {
      if (
        Array.isArray(obj[i].props.children) &&
        obj[i].props.children.length
      ) {
        return recurse(obj[i].props.children, array);
      }
      array.push(obj[i]);
    }

    return array;
  }

  return (
    <nav
      className={classNames('flex space-x-8 space-x-reverse', props.className)}
      aria-label={ariaLabel}
      {...rest}
    >
      <h2 className="sr-only">{ariaLabel}</h2>
      {flatChildren.map((crumb, i) => [
        crumb,
        i !== flatChildren.length - 1 && (
          <span key={i} aria-hidden className="select-none">
            /
          </span>
        ),
      ])}
    </nav>
  );
};
