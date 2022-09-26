export type TextAreaProps = {
  /** Whether the element should receive focus on render. */
  autoFocus?: boolean;

  /** Additional CSS class for the container */
  className?: string;

  /** The default value (uncontrolled). */
  defaultValue?: string;

  /** Whether the input is disabled. */
  disabled?: boolean;

  /**
   * Renders the field in an invalid state. Often paired together with `helpText` to provide feedback about the error.
   *
   * @deprecated use `invalid` instead.
   */
  error?: boolean;

  /**  Renders the field in an invalid state. Often paired together with `helpText` to provide feedback about the error. */
  invalid?: boolean;

  /** The content to display as the help text. */
  helpText?: React.ReactNode;

  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id?: string;

  /** The content to display as the label. */
  label?: string;

  /** Handler that is called when the element loses focus. */
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

  /** Handler that is called when the value changes.*/
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /** Handler that is called when the element receives focus. */
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

  /** Maximum number of text rows upto which the input can grow. */
  maximumRows?: number;

  /** Minimum number of text rows to show for the input. */
  minimumRows?: number;

  /** The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name?: string;

  /** Text hint that occupies the text input when it is empty. */
  placeholder?: string;

  /** Whether the input can be selected but not changed by the user. */
  readOnly?: boolean;

  /** Whether user input is required on the input before form submission. */
  required?: boolean;

  /** Additional CSS styles for the container. */
  style?: React.CSSProperties;

  /** The current value (controlled). */
  value?: string;

  /** Whether to show optional text */
  optional?: boolean;
} & Omit<
  React.PropsWithoutRef<JSX.IntrinsicElements['textarea']>,
  // omit these, otherwise they seem to form a union type (in the prop table docs)
  'onBlur' | 'onFocus' | 'onChange' | 'value' | 'defaultValue'
>;
