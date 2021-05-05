import { Scale } from '../utils';

export type RegularSliderProps = {
    /** String value that labels the slider. */
    'aria-label'?: string;

    /** Identifies the element that labels the slider. */
    'aria-labelledby'?: string;

    /**  Human readable text alternative for the value. */
    'aria-valuetext'?: string;

    /** Additional CSS class for the container. */
    className?: string;

    /** Whether the slider is disabled. */
    disabled?: boolean;

    /** Handler that is called every time the value of the slider changes. */
    onInput?: (value: number) => void;

    /** Handler that is called when the value of the slider has settled. */
    onChange?: (value: number) => void;

    /** The greatest value in the range of permitted values. */
    max?: number;

    /** The lowest value in the range of permitted values. */
    min?: number;

    /** A d3-scale object for non linear slider scales.
     * @see d3-scale repository https://github.com/d3/d3-scale
     */
    scale?: Scale;

    /** Specifies the value granularity. */
    step?: number;

    /** The current value. */
    value: number;
};
