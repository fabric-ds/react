import React from 'react';
import { classNames } from '@chbphone55/classnames';
import { step as c } from '@fabric-ds/css/component-classes';
import { useContext } from 'react';
import { StepsContext } from './component';

export interface StepProps {
  /**
   * Step is active
   * @default false
   */
  active?: boolean;

  /**
   * Step is completed
   * @default false
   */
  completed?: boolean;

  /**
   * Contents of Step
   */
  children: JSX.Element | JSX.Element[];
}

export function Step({ active, completed, children }: StepProps) {
  const StepsProps = useContext(StepsContext);
  const vertical = !StepsProps.horizontal;
  const left = !StepsProps.right;

  return (
    <div
      className={classNames({
        'f-step': true,
        [c.stepVertical]: vertical,
        [c.stepVerticalLeft]: vertical && left,
        [c.stepVerticalRight]: vertical && !left,
        [c.stepHorizontal]: !vertical,
      })}
    >
      {!vertical && (
        <div
          className={classNames({
            'step-line-h-l': true,
            [c.stepLine]: true,
            [c.stepLineHorizontal]: !vertical,
            [c.stepLineIncomplete]: !active && !completed,
            [c.stepLineComplete]: active || completed,
          })}
        />
      )}
      <div
        className={classNames({
          [c.stepDot]: true,
          [c.stepDotVertical]: vertical,
          [c.stepDotVerticalLeft]: vertical && left,
          [c.stepDotVerticalRight]: vertical && !left,
          [c.stepDotHorizontal]: !vertical,
          [c.stepDotIncomplete]: !(active || completed),
          [c.stepDotActive]: active,
          [c.stepDotComplete]: completed,
        })}
      >
        <svg
          role="img"
          aria-label={completed ? '✓' : '⍻'}
          aria-current={active ? 'step' : undefined}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M13.007 4.447a.75.75 0 01.046 1.06l-5.5 6a.75.75 0 01-1.083.023l-3-3a.75.75 0 011.06-1.06l2.446 2.446 4.971-5.423a.75.75 0 011.06-.046z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div
        className={classNames({
          'step-line-h-r': true,
          [c.stepLine]: true,
          [c.stepLineVertical]: vertical,
          [c.stepLineVerticalLeft]: vertical && left,
          [c.stepLineVerticalRight]: vertical && !left,
          [c.stepLineHorizontal]: !vertical,
          [c.stepLineIncomplete]: !completed,
          [c.stepLineComplete]: completed,
        })}
      />
      <div
        className={classNames({
          [c.content]: true,
          [c.contentVertical]: vertical,
          [c.contentHorizontal]: !vertical,
        })}
      >
        {children}
      </div>
    </div>
  );
}
