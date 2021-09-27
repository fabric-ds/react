import { useLayoutEffect } from '@fabric-ds/react-utils';
import React, { useEffect, useRef } from 'react';

type Params = {
    ref: React.RefObject<HTMLTextAreaElement>;
    value?: string;
    /** The minimum number of rows of text to display */
    minimumRows?: number;
    /** The maximum number of rows of text to display */
    maximumRows?: number;
};

export default function useTextAreaHeight({
    ref,
    value,
    minimumRows,
    maximumRows,
}: Params): void {
    const minHeight = useRef(-Infinity);
    const maxHeight = useRef(Infinity);

    const isControlled = value !== undefined;

    function resize(textarea: HTMLTextAreaElement) {
        textarea.style.setProperty('height', 'auto');

        let height = Math.max(minHeight.current, textarea.scrollHeight);

        height = Math.min(maxHeight.current, height);

        textarea.style.setProperty('height', height + 'px');
    }

    // Calculate the minimum and maximal heights
    useLayoutEffect(() => {
        if (ref.current && (minimumRows || maximumRows)) {
            const style = getComputedStyle(ref.current);

            const lineHeight = parseFloat(
                style.getPropertyValue('line-height'),
            );

            const topPadding = parseFloat(
                style.getPropertyValue('padding-top'),
            );
            const bottomPadding = parseFloat(
                style.getPropertyValue('padding-bottom'),
            );
            const bottomBorder = parseFloat(
                style.getPropertyValue('border-bottom-width'),
            );
            const offset = topPadding + bottomPadding + bottomBorder;

            if (minimumRows) {
                minHeight.current = lineHeight * minimumRows + offset;
            }
            if (maximumRows) {
                maxHeight.current = lineHeight * maximumRows + offset;
            }
        }
    }, [ref, maximumRows, minimumRows]);

    /**
     * This handles both the initial sizing and resizing when the value changes for a controlled component
     */
    useLayoutEffect(() => {
        if (ref.current) {
            resize(ref.current);
        }
    }, [ref, value]);

    /**
     * Resizing for uncontrolled textareas
     */
    useEffect(() => {
        if (ref.current && !isControlled) {
            const textarea = ref.current;

            const handleInput = () => {
                resize(textarea);
            };

            textarea.addEventListener('input', handleInput);

            return () => textarea.removeEventListener('input', handleInput);
        }
    }, [ref, isControlled]);
}
