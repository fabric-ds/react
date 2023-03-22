import React from 'react';
import { classNames } from '@chbphone55/classnames';
import { PillProps } from '.';
import { useI18n } from '../../utils/src';
import { i18n } from '@lingui/core';

const c = {
  pill: 'inline-flex items-center py-8 focus-ring text-12 transition-all',
  pillSuggestion:
    'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-700 font-bold',
  pillFilter: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white',
  label: 'pl-12 rounded-l-full',
  labelSuggestion: '',
  labelFilter: '',
  labelWithoutClose: 'pr-12 rounded-r-full',
  labelWithClose: 'pr-2',
  close: 'pr-12 pl-4 py-10 rounded-r-full',
};

export function Pill(props: PillProps) {
  useI18n('pill');

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={props.onClick}
        className={classNames(!props.canClose ? props.className : '', {
          [c.pill]: true,
          [props.suggestion ? c.pillSuggestion : c.pillFilter]: true,
          [c.label]: true,
          [props.canClose ? c.labelWithClose : c.labelWithoutClose]: true,
        })}
      >
        <span className="sr-only">{props.openSRLabel || 'Åpne filter'}</span>
        {props.icon || <span>{props.label}</span>}
      </button>
      {props.canClose && (
        <button
          type="button"
          className={classNames(props.className, {
            [c.pill]: true,
            [props.suggestion ? c.pillSuggestion : c.pillFilter]: true,
            [c.close]: true,
          })}
          onClick={props.onClose}
        >
          <span className="sr-only">
            {props.closeSRLabel ||
              `${i18n._(
                /*i18n*/ {
                  id: 'pill.filter.remove',
                  message: 'Remove filter',
                  comment:
                    'Fallback screenreader message for removal of the filter',
                },
              )} ${props.label}`}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="none"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M4.03 2.97a.75.75 0 00-1.06 1.06L6.94 8l-3.97 3.97a.75.75 0 101.06 1.06L8 9.06l3.97 3.97a.75.75 0 101.06-1.06L9.06 8l3.97-3.97a.75.75 0 00-1.06-1.06L8 6.94 4.03 2.97z"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
}
