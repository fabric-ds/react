import React, { createContext } from 'react';
import { StepsProps } from './props.js';
import { classNames } from '@chbphone55/classnames';

export const StepsContext = createContext<{
  horizontal?: boolean;
  right?: boolean;
}>({
  horizontal: undefined,
  right: undefined,
});

export function Steps(props: StepsProps) {
  return (
    <StepsContext.Provider
      value={{
        horizontal: props.horizontal,
        right: props.right,
      }}
    >
      <div
        className={classNames(props.className, {
          'w-full': true,
          flex: props.horizontal,
        })}
      >
        {props.children}
      </div>
    </StepsContext.Provider>
  );
}
