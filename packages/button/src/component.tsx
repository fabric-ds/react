import React, { forwardRef, Ref } from 'react';
import { classNames } from '@chbphone55/classnames';
import type { ButtonProps } from './props';

export const Button = forwardRef(
  (
    props: ButtonProps,
    ref: Ref<HTMLButtonElement> | Ref<HTMLAnchorElement>,
  ) => {
    const classes = classNames(props.className, {
      button: true,
      // primary buttons
      'button--primary': props.primary,
      'button--destructive': props.negative,
      // quiet
      'button--flat': props.secondary && props.quiet,
      'button--destructive-flat': props.negative && props.quiet,
      'button--utility-flat': props.utility && props.quiet,
      // others
      'button--small': props.small,
      'button--utility': props.utility && !props.quiet,
      'button--link': props.link,
      'button--pill': props.pill,
      'button--in-progress': props.loading,
    });

    return (
      <>
        {props.href ? (
          <a
            target={props.target}
            rel={
              props.target === '_blank' ? props.rel || 'noopener' : undefined
            }
            ref={ref as Ref<HTMLAnchorElement>}
            className={classes}
          >
            {props.children}
          </a>
        ) : (
          <button
            {...props}
            type={props.type || 'button'}
            ref={ref as Ref<HTMLButtonElement>}
            className={classes}
          >
            {props.children}
          </button>
        )}
        {props.loading ? (
          <span
            className="sr-only"
            role="progressbar"
            aria-valuenow={0}
            aria-valuetext="Laster..."
          />
        ) : null}
      </>
    );
  },
);
