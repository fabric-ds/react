export type ComboboxOption = {
  value: string;
  label?: string;
};

export type OptionWithIdAndMatch = ComboboxOption & {
  id: string;
  currentInputValue: string;
};

export type ComboboxProps = {
  /**
   * Unique identifier for the input field
   */
  id?: string;

  /**
   * The available options to select from
   */
  options: ComboboxOption[];

  /**
   * Label above input
   */
  label?: string;

  /**
   * Input placeholder
   */
  placeholder?: string;

  /**
   * The TextField input value
   */
  value: string;

  /**
   * Whether the popover opens when focus is on the text field.
   * @default false
   */
  openOnFocus?: boolean;

  /**
   * Select active option on blur
   * @default true
   */
  selectOnBlur?: boolean;

  /**
   * Whether the matching text segments in the options should be highlighted. Customise the styling by using CSS selectors to override `[data-combobox-text-match]`.
   * This uses the default matching algorithm. Use the `highlightValueMatch` to pass your own matching function.
   * @default false
   */
  matchTextSegments?: boolean;

  /** Disable client-side static filtering
   * @default false
   */
  disableStaticFiltering?: boolean;

  /**
   * Pass your own function for highlight matching
   */
  highlightValueMatch?: (
    optionValue: string,
    inputValue: string,
  ) => React.ReactNode;

  /**
   * Called when the user selects an option
   */
  onSelect?(value: string): void;

  /**
   * Called when the value of the input changes
   */
  onChange(value: string): void;

  /**
   * Called when the input is focus
   */
  onFocus?: () => void;

  /**
   * Called when the input loses focus with the current navigation value or input value
   */
  onBlur?: (value: string) => void;

  /**  Renders the input field in an invalid state. Often paired together with `helpText` to provide feedback about the error. */
  invalid?: boolean;

  /** The content to display as the help text. */
  helpText?: React.ReactNode;

  /**
   * Additional container styling
   */
  className?: string;

  /**
   * Additional list styling
   */
  listClassName?: string;

  /**
   * Defines a string value that labels the current element. Must be set if `aria-labelledby` is not defined,
   */
  'aria-label'?: string;

  /**
   * Identifies the element (or elements) that labels the current element. Must be set if `aria-label` is not defined.
   */
  'aria-labelledby'?: string;

  /** For affix use */
  children?: React.ReactNode;

  /** Whether to show optional text */
  optional?: boolean;
} & Omit<
  React.PropsWithoutRef<JSX.IntrinsicElements['input']>,
  'onChange' | 'type' | 'value' | 'label'
>;
