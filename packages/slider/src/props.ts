export type SliderProps = {
  /**
   * The greatest value in the range of permitted values
   * @default 100
   */
  max: number;

  /**
   * The lowest value in the range of permitted values
   * @default 0
   */
  min: number;

  /** Specifies the value granularity */
  step: number;

  /** The current value */
  value: number;

  /** Whether the slider is disabled */
  disabled?: boolean;

  /** Handler that is called when the value of the slider changes */
  onChange?: (value: number) => void;

  /** String value that labels the slider */
  'aria-label'?: string;

  /** Identifies the element that labels the slider */
  'aria-labelledby'?: string;

  /**  Human readable text alternative for the value */
  'aria-valuetext'?: string;
};
