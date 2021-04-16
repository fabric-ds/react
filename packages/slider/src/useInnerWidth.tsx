import { useState } from 'react';
import {
    useElementSizeObserver,
    useLayoutEffect,
} from '@finn-no/fabric-react-utils';

// By deducting the handle width we lock the handle to edges of the slider
export default function useInnerWidth(
    slider: React.RefObject<HTMLDivElement>,
    handle: React.RefObject<HTMLDivElement>,
): number {
    const { width } = useElementSizeObserver(slider);
    const [innerWidth, setInnerWidth] = useState(width);

    useLayoutEffect(() => {
        setInnerWidth(width - (handle.current?.offsetWidth ?? 0));
    }, [width, handle]);

    return innerWidth;
}
