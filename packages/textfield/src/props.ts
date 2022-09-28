export type TextFieldProps = {
  /** Whether the element should receive focus on render. */
  autoFocus?: boolean;

  /** Additional CSS class for the container. */
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
  label?: React.ReactNode;

  /** Standard `input` max attribute, to be used with `type="number".` See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmax). */
  max?: number | string;

  /** Standard `input` min attribute, to be used with `type="number".` See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmin). */
  min?: number | string;

  /** The maximum number of characters supported by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmaxlength). */
  maxLength?: number;

  /** The minimum number of characters required by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmaxlength). */
  minLength?: number;

  /** The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name?: string;

  /** Handler that is called when the element loses focus. */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /** Handler that is called when the value changes.*/
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** Handler that is called when the element receives focus. */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /** Regex pattern that the value of the input must match to be valid. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern). */
  pattern?: string;

  /** Text hint that occupies the text input when it is empty. */
  placeholder?: string;

  /** Whether the input can be selected but not changed by the user. */
  readOnly?: boolean;

  /** Whether user input is required on the input before form submission. */
  required?: boolean;

  /** Additional CSS styles for the container. */
  style?: React.CSSProperties;

  /** The type of input to render. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype). */
  type?: 'text' | 'search' | 'email' | 'password' | 'url' | 'tel' | 'number';

  /** For affix use */
  children?: React.ReactNode;

  /** The current value (controlled). */
  value?: string;

  /** Mark label to indicate that filling in this field is optional */
  optional?: boolean;
} & Omit<
  React.PropsWithoutRef<JSX.IntrinsicElements['input']>,
  // omit these, otherwise they seem to form a union type (in the prop table docs)
  'onBlur' | 'onFocus' | 'onChange' | 'type' | 'value'
>;
