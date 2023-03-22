import { i18n } from '@lingui/core';

/**
 * This util makes sure that only the i18n files for the current locale are loaded.
 * @param package The package you want to dynamic activate for.
 * @param locale The locale you want to activate.
 */
export async function dynamicActivateI18n(pkg: string, locale: string) {
  const { messages } = await import(
    `../../${pkg}/src/locales/${locale}/messages.mjs`
  );

  i18n.load(locale, messages);
  i18n.activate(locale);
}
