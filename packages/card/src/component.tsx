import React from 'react';
import { card as c } from '@fabric-ds/component-classes';
import { classNames } from '@chbphone55/classnames';
import { CardProps } from './props';

export function Card(props: CardProps) {
  const { as = 'article', children, flat, ...rest } = props;
  return React.createElement(
    as,
    {
      ...rest,
      className: classNames(props.className, {
        [c.card]: true,
        [c.cardShadow]: !props.flat,
        [c.cardSelected]: props.selected,
        [c.cardFlat]: props.flat,
        [props.selected ? c.cardFlatSelected : c.cardFlatUnselected]:
          props.flat,
      }),
      tabIndex: 0,
      onKeyDown: props.onClick
        ? (e) => {
            if (
              typeof props.onClick === 'function' &&
              (e.key === 'Enter' || e.key === ' ')
            ) {
              e.preventDefault();
              props.onClick();
              return;
            }
          }
        : undefined,
    },
    <>
      {props.onClick && (
        <button className="sr-only" aria-pressed={props.selected} tabIndex={-1}>
          Velg
        </button>
      )}

      {!props.onClick && props.selected && (
        <span role="checkbox" aria-checked="true" aria-disabled="true" />
      )}

      <div
        className={classNames({
          [c.cardOutline]: !props.flat,
          [props.selected ? c.cardOutlineSelected : c.cardOutlineUnselected]:
            !props.flat,
        })}
      />

      {children}
    </>,
  );
}
