import React from 'react';
import { suffix as s } from '@fabric-ds/component-classes';
import { classNames } from '@chbphone55/classnames';
import { SuffixProps } from './props';

export function Suffix(props: SuffixProps) {
  return React.createElement(
    props.label ? 'div' : 'button',
    {
      onClick: props.onClick,
      className: classNames({
        [s.wrapper]: true,
        [s.wrapperWithLabel]: props.label,
        [s.wrapperWithIcon]: !props.label,
      }),
    },
    <div>
      {props.clear && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4.03 2.97a.75.75 0 00-1.06 1.06L6.94 8l-3.97 3.97a.75.75 0 101.06 1.06L8 9.06l3.97 3.97a.75.75 0 101.06-1.06L9.06 8l3.97-3.97a.75.75 0 00-1.06-1.06L8 6.94 4.03 2.97z"
            clipRule="evenodd"
          />
        </svg>
      )}

      {props.search && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
        >
          <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            clipPath="url(#nra-cclip0)"
          >
            <path d="M8.796 11.803A5.684 5.684 0 104.349 1.341a5.684 5.684 0 004.447 10.462zM11 11l4 4" />
          </g>
          <defs>
            <clipPath id="nra-cclip0">
              <path fill="currentColor" d="M0 0h16v16H0z" />
            </clipPath>
          </defs>
        </svg>
      )}

      {props.label && <span className={s.label}>{props.label}</span>}
    </div>,
  );
}
