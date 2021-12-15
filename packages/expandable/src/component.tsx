import React, { useRef } from 'react';
import { classNames } from '@chbphone55/classnames';
import { expand, collapse } from 'element-collapse';
import { buttonReset, box as boxClasses } from '@fabric-ds/component-classes';
import type { ExpandableProps } from './props';

const setup = ({
  title = '',
  info = false,
  box = false,
  bleed = false,
  buttonClass = '',
  contentClass = '',
  expanded = false,
  className,
  ...attrs
}: any) => ({
  ...attrs,
  wrapperClasses: classNames(className, {
    'bg-aqua-50': info,
    ['py-0 px-0 ' + boxClasses.box]: box,
    [boxClasses.bleed]: bleed,
  }),
  buttonClasses: classNames({
    [buttonClass || '']: true,
    [buttonReset + ' hover:underline focus:underline']: true,
    ['w-full text-left relative ' + boxClasses.box]: box,
    'hover:text-aqua-700 active:text-aqua-800': info,
  }),
  chevronClasses: classNames({
    'inline-block align-middle transform transition-transform': true,
    '-rotate-180': expanded,
    'relative left-8': !box,
    'box-chevron absolute right-16': box,
  }),
  contentClasses: classNames({
    [contentClass || '']: true,
    [boxClasses.box + (title ? ' pt-0' : '')]: box,
  }),
  title,
});

export function Expandable(props: ExpandableProps) {
  const boxRef = useRef(null);
  const { children, expanded = false, onChange, ...rest } = props;
  const [stateExpanded, setStateExpanded] = React.useState(expanded);
  const {
    wrapperClasses,
    buttonClasses,
    contentClasses,
    chevronClasses,
    title,
    chevron = true,
    ...attrs
  } = setup({ expanded: stateExpanded, ...rest });

  const toggleExpandable = (state) => {
    setStateExpanded(!state);
    if (onChange) onChange(!state);

    if (!boxRef.current || !props.animated) return;
    if (!state) {
      expand(boxRef.current);
    } else {
      collapse(boxRef.current);
    }
  };

  return (
    <div {...attrs} className={wrapperClasses}>
      <button
        aria-expanded={stateExpanded}
        className={buttonClasses}
        onClick={() => toggleExpandable(stateExpanded)}
      >
        {title && <span className="h4">{title}</span>}
        {chevron && (
          <div className={chevronClasses}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M2.5 5.5L8 11l5.5-5.5"
              />
            </svg>
          </div>
        )}
      </button>
      <div
        ref={boxRef}
        className={classNames({
          'overflow-hidden': true,
          'h-0': !stateExpanded,
        })}
        aria-hidden={!stateExpanded}
      >
        <div className={contentClasses}>{children}</div>
      </div>
    </div>
  );
}
