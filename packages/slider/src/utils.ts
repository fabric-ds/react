// a d3 scale like object.
export interface Scale {
    (value: number): number;
    invertExtent(value: number): [number, number];
    thresholds(): number[];
}

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
    if (scale) {
        return scale(ratio);
    }

    let value = (max - min) * ratio;

    value = Math.round(value / step) * step + min;
    return clamp(min, value, max);
}

export function nextValue(value: number, step: number, scale?: Scale): number {
    if (!scale) {
        return value + step;
    }

    const extent = scale.invertExtent(value)[1];

    const next = scale.thresholds().find((v) => v >= extent) ?? 1;
    return scale(next);
}

export function prevValue(value: number, step: number, scale?: Scale): number {
    if (!scale) {
        return value - step;
    }

    const extent = scale.invertExtent(value)[0];

    const prev =
        scale
            .thresholds()
            .reverse()
            .find((v) => v < extent) ?? 0;
    return scale(prev);
}
