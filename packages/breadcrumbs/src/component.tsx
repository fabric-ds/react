import * as React from 'react';
import { classNames } from '@chbphone55/classnames';
import type { BreadcrumbsProps } from './props';
import { interleave } from '@fabric-ds/core/breadcrumbs';
import { i18n } from '@lingui/core';
import { useI18n } from '../../utils/src';

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { children, className, ...rest } = props;

  useI18n('breadcrumbs');

  const ariaLabel =
    props['aria-label'] ||
    i18n._(
      /*i18n*/ {
        id: 'breadcrumbs.ariaLabel',
        message: 'Here you are',
        comment: 'Default screenreader message for the breadcrumb component',
      },
    );

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
