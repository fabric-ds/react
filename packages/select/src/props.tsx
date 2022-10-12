import * as React from 'react';

export type SelectProps = {
  /** Whether the element should receive focus on render. */
  autoFocus?: boolean;

  /** The `option` elements to populate the select with. */
  children?: React.ReactNode;

  /** Additional CSS class for the container */
  className?: string;

  /** The default value (uncontrolled). */
  defaultValue?: string;

  /**  Renders the field in an invalid state. Often paired together with `hint` to provide feedback about the error. */
  invalid?: boolean;

  /** The content to display as the help text. */
  hint?: React.ReactNode;

  /** Whether to always show hint */
  always?: boolean;

  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id?: string;

  /** The content to display as the label. */
  label?: React.ReactNode;

  /** The name of the select element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name?: string;

  /** Handler that is called when the element loses focus. */
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;

  /** Handler that is called when the value changes.*/
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  /** Handler that is called when the element receives focus. */
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;

  /** Whether user input is required on the select before form submission. */
  required?: boolean;

  /** Additional CSS styles for the container. */
  style?: React.CSSProperties;

  /** The current value (controlled). */
  value?: string;

  /** Whether to show optional text */
  optional?: boolean;
} & Omit<
  React.PropsWithoutRef<JSX.IntrinsicElements['select']>,
  'onBlur' | 'onChange' | 'onFocus' | 'value' | 'defaultValue'
>;
