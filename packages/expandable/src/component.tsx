import { classNames } from '@chbphone55/classnames';
import {
  box as boxClasses,
  buttonReset,
} from '@fabric-ds/css/component-classes';
import React from 'react';
import { ExpandTransition, UnstyledHeading } from '../../_helpers';
import { ExpandableProps } from './props';

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
    headingLevel,
    ...rest
  } = props;

  const [stateExpanded, setStateExpanded] = React.useState(expanded);

  React.useEffect(() => {
    setStateExpanded(expanded);
  }, [expanded]);

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
      <UnstyledHeading level={headingLevel}>
        <button
          type='button'
          aria-expanded={stateExpanded}
          className={classNames({
            [buttonClass || '']: true,
            [buttonReset + ' hover:underline focus:underline']: true,
            ['w-full text-left relative ' + boxClasses.box]: box,
            'hover:text-aqua-700 active:text-aqua-800': info,
          })}
          onClick={() => toggleExpandable(stateExpanded)}
        >
          <div className="flex justify-between align-center">
            {typeof title === 'string' ? (
              <span className="h4">{title}</span>
            ) : (
              title
            )}
            {chevron && (
              <div
                className={classNames({
                  'self-center transform transition-transform': true,
                  '-rotate-180': stateExpanded,
                  'relative left-8': !box,
                  'box-chevron': box,
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
          </div>
        </button>
      </UnstyledHeading>
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
    <ExpandTransition show={stateExpanded}>{children}</ExpandTransition>
  ) : (
    <div
      className={classNames({
        'overflow-hidden': true,
        'h-0 invisible': !stateExpanded,
      })}
      aria-hidden={!stateExpanded ? true : undefined}
    >
      {children}
    </div>
  );
}
