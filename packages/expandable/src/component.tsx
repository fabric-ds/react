import { classNames } from '@chbphone55/classnames';
import { box as boxClasses, buttonReset } from '@fabric-ds/component-classes';
import React from 'react';
import { AnimatedExpansion } from '../../_helpers';
import type { ExpandableProps } from './props';

export function Expandable(props: ExpandableProps) {
  const {
    children,
    expanded = false,
    title = '',
    info = false,
    box = false,
    bleed = false,
    buttonClass = '',
    contentClass = '',
    className,
    onChange,
    chevron = true,
    animated,
    ...rest
  } = props;

  const [stateExpanded, setStateExpanded] = React.useState(expanded);

  const toggleExpandable = (state) => {
    setStateExpanded(!state);
    if (onChange) onChange(!state);
  };

  return (
    <div
      {...rest}
      className={classNames(className, {
        'bg-aqua-50': info,
        ['py-0 px-0 ' + boxClasses.box]: box,
        [boxClasses.bleed]: bleed,
      })}
    >
      <button
        aria-expanded={stateExpanded}
        className={classNames({
          [buttonClass || '']: true,
          [buttonReset + ' hover:underline focus:underline']: true,
          ['w-full text-left relative ' + boxClasses.box]: box,
          'hover:text-aqua-700 active:text-aqua-800': info,
        })}
        onClick={() => toggleExpandable(stateExpanded)}
      >
        {title && <span className="h4">{title}</span>}
        {chevron && (
          <div
            className={classNames({
              'inline-block align-middle transform transition-transform': true,
              '-rotate-180': expanded,
              'relative left-8': !box,
              'box-chevron absolute right-16': box,
            })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M2.5 5.5L8 11l5.5-5.5"
              />
            </svg>
          </div>
        )}
      </button>

      <ExpansionBehaviour animated={animated} stateExpanded={stateExpanded}>
        <div
          className={classNames({
            [contentClass || '']: true,
            [boxClasses.box + (title ? ' pt-0' : '')]: box,
          })}
        >
          {children}
        </div>
      </ExpansionBehaviour>
    </div>
  );
}

function ExpansionBehaviour({ animated, stateExpanded, children }) {
  return animated ? (
    <AnimatedExpansion show={stateExpanded}>{children}</AnimatedExpansion>
  ) : (
    <div
      className={classNames({
        'overflow-hidden': true,
        'h-0 invisible': !stateExpanded,
      })}
      aria-hidden={!stateExpanded}
    >
      {children}
    </div>
  );
}
