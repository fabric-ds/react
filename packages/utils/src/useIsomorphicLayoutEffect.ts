import { useLayoutEffect as useLayoutEffectSafely, useEffect } from 'react';

// Ensure the name used in components is useLayoutEffect so the eslint react hooks plugin works
export const useLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffectSafely : useEffect;
