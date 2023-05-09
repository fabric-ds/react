import { i18n } from '@lingui/core';
import { generateId } from '../../utils/src/useId';
import { ComboboxOption, OptionWithIdAndMatch } from './props';

// Add id and match to the object
export function createOptionsWithIdAndMatch(
  options: ComboboxOption[],
  currentInputValue: string,
): OptionWithIdAndMatch[] {
  return options.map((option) => ({
    ...option,
    id: generateId(),
    currentInputValue,
  }));
}

export function getAriaText(options: OptionWithIdAndMatch[], value: string) {
  if (!options) return;

  const filteredOptionsByInputValue = options.filter((option) =>
    option.value.toLowerCase().includes(value.toLowerCase()),
  );

  const pluralResults = i18n._(
    /*i18n*/ {
      id: 'combobox.aria.pluralResults',
      message: '{numResults, plural, one {# result} other {# results}}',
      comment: 'Aria text for combobox when one or more results',
    },
    {
      numResults: filteredOptionsByInputValue.length,
    },
  );

  const noResults = i18n._(
    /*i18n*/ {
      id: 'combobox.aria.noResults',
      message: 'No results',
      comment: 'Aria text for combobox when no results',
    },
  );

  return filteredOptionsByInputValue.length ? pluralResults : noResults;
}
