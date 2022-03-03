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

function isPlural(array) {
  return array.length > 1 || array.length === 0;
}

export function getAriaText(options: OptionWithIdAndMatch[], value: string) {
  if (!options) return;

  const filteredOptionsByInputValue = options.filter((option) =>
    option.value.toLowerCase().includes(value.toLowerCase()),
  );

  return filteredOptionsByInputValue.length
    ? `${filteredOptionsByInputValue.length} resultat${
        isPlural(filteredOptionsByInputValue) ? 'er' : ''
      }`
    : `Ingen resultater`;
}
