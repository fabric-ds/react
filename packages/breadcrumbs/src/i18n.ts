import { createIntl, createIntlCache, defineMessages } from '@formatjs/intl';
import { default as nbMessages } from '../locale/compiled/nb.json';

const cache = createIntlCache();

export const intl = createIntl(
  {
    locale: 'nb',
    messages: nbMessages,
  },
  cache,
);

export const breadcrumbMessages = defineMessages({
  ariaLabel: {
    id: 'breadcrumbs.ariaLabel',
    defaultMessage: 'You are here',
    description: 'The default aria-label for the breadcrumbs component',
  },
});
