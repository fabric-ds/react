export type ToggleEntry = {
  label: string;
  value: unknown;
};

export interface ToggleProps {
  /**
   * The type of Toggle
   */
  type: 'radio' | 'checkbox' | 'radio-button';

  /**
   * The option(s) title
   */
  title?: string;

  /**
   * Renders options in invalid state. Often paired together with `helpText` to provide feedback about the error.
   */
  invalid?: boolean;

  /**
   * Help text beneath options
   */
  helpText?: string;

  /**
   * An array of options to render
   */
  options?: ToggleEntry[];

  /**
   * An array of options to be selected / checked (controlled)
   */
  selected?: ToggleEntry[];

  /**
   * An array of options to be selected / checked on mount (uncontrolled)
   */
  defaultSelected?: ToggleEntry[];

  /**
   * If you only need to render a single option, use this prop instead
   */
  label?: string;

  /**
   * Whether the single option should be checked (controlled)
   */
  checked?: boolean;

  /**
   * Whether the single option should be checked on mount (uncontrolled)
   */
  defaultChecked?: boolean;

  /**
   * Retrieve the selected entry or a boolean value, depending on whether you are working with single or multiple options
   */
  onChange: (value: ToggleEntry | boolean | any) => void;

  /**
   * Whether the elements should be small
   */
  small?: boolean;

  /**
   * Whether the toggle is optional
   * Appends (valgfritt) to the end of the title for indication
   */
  optional?: boolean;

  /**
   * Will make each radio-button equal width
   */
  equalWidth?: boolean;

  /**
   * Custom classes applied to the wrapping container
   */
  className?: string;

  /**
   * Whether label should be invisible
   */
  noVisibleLabel?: boolean;
  /**
   * Whether a single option is indeterminate, or "partially checked."
   * The checkbox will appear with a small dash instead of a tick to indicate that the option is not exactly checked or unchecked.
   */
  indeterminate?: boolean;
}
