import { Scale } from './props';

/**
 * Restricts the value to the given range.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function valueToRatio(
  value: number,
  min: number,
  max: number,
  scale?: Scale,
): number {
  if (scale) {
    // if we are above the middle, use the upper part of the segment
    const extent = (max - min) / 2;
    return scale.invertExtent(value)[value > extent ? 1 : 0];
  }

  return clamp((value - min) / (max - min), 0, 1);
}

export function ratioToValue(
  ratio: number,
  min: number,
  max: number,
  step: number,
  scale?: Scale,
): number {
  if (scale) return scale(ratio);

  let value = (max - min) * ratio;
  value = Math.round(value / step) * step + min;

  return clamp(min, value, max);
}

export function nextValue(value: number, step: number, scale?: Scale): number {
  if (!scale) return value + step;

  const range = scale.range();
  const index = range.indexOf(value);
  const next = Math.min(range.length - 1, index + step);

  return range[next];
}

export function prevValue(value: number, step: number, scale?: Scale): number {
  if (!scale) return value - step;

  const range = scale.range();
  const index = range.indexOf(value);
  const prev = Math.max(0, index - step);
  return range[prev];
}

// Included value in the parameter definition for futureproofing, in case we want to tailor the step increments based on where in the range it is.
export function bigStep(
  value: number,
  step: number,
  min: number,
  max: number,
  scale?: Scale,
): number {
  const minFactor = 2;
  const maxFactor = 20;

  if (!scale) {
    return (
      step *
      Math.max(
        minFactor,
        Math.min(maxFactor, Math.ceil((max - min) / 10 / step)),
      )
    );
  }

  return (
    step *
    Math.max(
      minFactor,
      Math.min(maxFactor, Math.ceil(scale.range().length / 10 / step)),
    )
  );
}
