import React, { useCallback, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Hook for determining the size of an element using the Resize Observer API.
 *
 * @param ref - A React ref to an element
 */
export default function useElementSizeObserver(
    ref: React.RefObject<Element>,
): { width: number; height: number } {
    let [size, setSize] = useState({ width: 0, height: 0 });

    const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
        setSize({
            // we only observe one element, so accessing the first entry here is fine
            width: entries[0].contentRect.width,
            height: entries[0].contentRect.height,
        });
    }, []);

    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }

        // Set initial size here, as the one from the observer fires too late on iOS safari
        const { width, height } = ref.current.getBoundingClientRect();
        setSize({ width, height });

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(ref.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [ref, handleResize]);

    return size;
}
