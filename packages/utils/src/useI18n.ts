import { useEffect, useState } from 'react';
import { dynamicActivateI18n } from './dynamicActivatei18n';

function detectLocale() {
  try {
    return document.documentElement.lang;
  } catch (e) {
    console.warn('could not detect locale, falling back to source locale', e);
    return 'en';
  }
}

/**
 * React hooks that dynamically loads selected locale for a package
 * @param pkg
 * @param locale
 * @returns a flag letting you know whether the locale is ready (not necessary to use)
 */
export function useI18n(pkg: string, locale?: string) {
  const [ready, setReady] = useState(false);

  const resolvedLocale = locale ?? detectLocale();

  useEffect(() => {
    Promise.allSettled([dynamicActivateI18n(pkg, resolvedLocale)]).finally(() =>
      setReady(true),
    );
  }, [resolvedLocale, pkg]);

  return ready;
}
