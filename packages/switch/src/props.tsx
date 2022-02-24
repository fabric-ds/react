import React from 'react';

export interface SwitchProps {
  /**
   * The unique identifier
   */
  id?: string;

  /**
   * The value of the Switch
   */
  value: boolean;

  /**
   * Handler for when the Switch is clicked
   */
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Defines a string value that labels the current element. Must be set if `aria-labelledby` is not defined,
   */
  'aria-label'?: string;

  /**
   * Identifies the element (or elements) that labels the current element. Must be set if `aria-label` is not defined.
   */
  'aria-labelledby'?: string;
}
