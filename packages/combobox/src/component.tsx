import { classNames } from '@chbphone55/classnames';
import { useId } from '../../utils/src';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { TextField } from '../../textfield/src';
import { ComboboxOption, ComboboxProps } from './props';
import { generateId } from '../../utils/src/useId';

const OPTION_HIGHLIGHT_COLOR = 'bluegray-100';
const OPTION_CLASS_NAME = 'f-react-combobox-option';
const MATCH_SEGMENTS_CLASS_NAME = 'f-react-combobox-match';

type Option = ComboboxOption & { id: string; currentInputValue: string };

function createOptionsWithIdAndMatch(
  options: ComboboxOption[],
  currentInputValue: string,
): Option[] {
  return options.map((option) => ({
    ...option,
    id: generateId(),
    currentInputValue,
  }));
}

function isPlural(array) {
  return array.length > 1 || array.length === 0;
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (props, forwardRef) => {
    const {
      id: pid,
      options,
      value,
      onSelect,
      onChange,
      onFocus,
      onBlur,
      label,
      invalid,
      helpText,
      placeholder,
      openOnFocus,
      className,
      listClassName,
      disableStaticFiltering = false,
      matchTextSegments,
      highlightValueMatch,
      children,
      ...rest
    } = props;

    const id = useId(pid);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [isOpen, setOpen] = useState(false);
    const [navigationOption, setNavigationOption] = useState<Option | null>(
      null,
    );
    const [currentOptions, setCurrentOptions] = useState<Option[]>([]);

    useEffect(() => {
      setCurrentOptions(
        createOptionsWithIdAndMatch(options, value).filter((option) =>
          !disableStaticFiltering
            ? option.value.toLocaleLowerCase().includes(value.toLowerCase())
            : true,
        ),
      );
    }, [options, disableStaticFiltering, value]);

    const handleSelect = (option: Option) => {
      onSelect && onSelect(option.value);

      // Set empty states on select
      setNavigationOption(null);
      setCurrentOptions([]);
    };

    function findAndSetActiveOption(e: KeyboardEvent): void {
      e.preventDefault();

      const currIndex = currentOptions.findIndex(
        (option) => option.id === navigationOption?.id,
      );
      const nextIndex = currIndex + 1;
      const prevIndex = currIndex - 1;

      switch (e.key) {
        case 'ArrowDown':
          setNavigationOption(
            nextIndex > currentOptions.length
              ? null
              : currentOptions[nextIndex],
          );
          break;
        case 'ArrowUp':
          setNavigationOption(
            prevIndex === -2
              ? currentOptions[currentOptions.length - 1]
              : prevIndex < 0
              ? null
              : currentOptions[prevIndex],
          );
          break;
        case 'PageUp':
          setNavigationOption(
            currIndex - 10 < 0
              ? currentOptions[0]
              : currentOptions[currIndex - 10],
          );
          break;
        case 'PageDown':
          setNavigationOption(
            currIndex + 10 > currentOptions.length
              ? currentOptions[currentOptions.length - 1]
              : currentOptions[currIndex + 10],
          );
          break;
        case 'Home':
          setNavigationOption(currentOptions[0]);
          break;
        case 'End':
          setNavigationOption(currentOptions[currentOptions.length - 1]);
          break;
      }
    }

    const handlekeyDown = (e: KeyboardEvent) => {
      const isNavigationKey = [
        'ArrowDown',
        'ArrowUp',
        'PageUp',
        'PageDown',
        'Home',
        'End',
      ].includes(e.key);

      if (isNavigationKey && !isOpen) {
        return setOpen(true);
      }

      if (isNavigationKey) {
        if (!isOpen) return;
        findAndSetActiveOption(e);
      }

      // Other keys
      switch (e.key) {
        case 'ArrowLeft':
          onChange && onChange(navigationOption?.value || value);
          setNavigationOption(null);
          break;
        case 'Enter':
          if (navigationOption) {
            // Handle Enter only when option is selected, otherwise let the event
            // bubble up to any enclosing form elements etc.
            e.preventDefault();
            handleSelect(navigationOption);
          }
          setOpen(false);
          break;
        case 'Tab':
        case 'Delete':
          // Dismiss the popover
          setOpen(false);
          break;
        case 'Escape':
          if (isOpen) {
            // Dismiss the popover if visible
            setOpen(false);
          } else {
            // Clear the combobox if popover is hidden
            onChange('');
          }
          setNavigationOption(null);
          break;
        case 'Backspace':
          onChange(navigationOption?.value || value);
          setNavigationOption(null);
          break;
        default:
          if (e.key.length) {
            onChange(navigationOption?.value || value);
            setNavigationOption(null);
          }
          break;
      }
    };

    useEffect(() => {
      if (!inputRef.current) return;
      const input = inputRef.current;

      input.addEventListener('keydown', handlekeyDown);
      return () => {
        input.removeEventListener('keydown', handlekeyDown);
      };
    });

    const listboxId = `${id}-listbox`;
    const TextFieldProps = {
      id,
      ref: function (node: HTMLInputElement) {
        inputRef.current = node;
        if (forwardRef) {
          if (typeof forwardRef === 'function') {
            forwardRef(node);
          } else {
            forwardRef.current = node;
          }
        }
      },
      value: navigationOption?.value || value,
      onChange: function (e) {
        onChange && onChange(e.target.value);
      },
      label,
      invalid,
      helpText,
      placeholder,
      role: 'combobox',
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-autocomplete': 'list',
      'aria-expanded': !!navigationOption?.id,
      'aria-activedescendant': isOpen ? navigationOption?.id : undefined,
      'aria-controls': listboxId,
      onFocus: () => {
        if (!openOnFocus) return;
        onFocus && onFocus();
        setOpen(true);
      },
      onBlur,
      ...rest,
    };

    // If the clicked element on page is not a child of the container
    function handleContainerBlur(e: React.FocusEvent) {
      const isClickOutsideContainer = !e.currentTarget.contains(
        e.relatedTarget,
      );

      if (isClickOutsideContainer) {
        setOpen(false);
      }
    }

    return (
      <div
        className={classNames(className, {
          relative: true,
        })}
        onBlur={handleContainerBlur}
      >
        {children ? (
          // @ts-ignore
          <TextField {...TextFieldProps}>{children}</TextField>
        ) : (
          // @ts-ignore
          <TextField {...TextFieldProps} />
        )}

        <span className="sr-only" role="status">
          {currentOptions &&
          currentOptions.filter((option) =>
            option.value.toLowerCase().includes(value.toLowerCase()),
          ).length
            ? `${currentOptions.length} resultat${
                isPlural(currentOptions) ? 'er' : ''
              }`
            : `Ingen resultater, viser ${
                isPlural(currentOptions) ? 'alle' : ''
              } ${currentOptions.length} alternativ${
                isPlural(currentOptions) ? 'er' : ''
              }`}
        </span>

        <div
          hidden={!isOpen && !currentOptions.length}
          className={classNames(listClassName, {
            'absolute left-0 right-0 pb-8 rounded-8 bg-white shadow': true,
          })}
          style={{
            // Force popover above misc. page content (mobile safari issue)
            zIndex: 3,
          }}
        >
          <ul
            id={listboxId}
            role="listbox"
            className={classNames('m-0 p-0 select-none list-none', {
              [MATCH_SEGMENTS_CLASS_NAME]: matchTextSegments,
            })}
          >
            {currentOptions.map((option) => {
              const display = option.label || option.value;
              let match: React.ReactNode = [];

              if (matchTextSegments && !highlightValueMatch) {
                const startIdx = display
                  .toLowerCase()
                  .indexOf(value.toLowerCase());

                if (startIdx !== -1) {
                  const endIdx = startIdx + value.length;
                  match = (
                    <>
                      {display.substring(0, startIdx)}
                      <span data-combobox-text-match className="font-bold">
                        {display.substring(startIdx, endIdx)}
                      </span>
                      {display.substring(endIdx)}
                    </>
                  );
                } else {
                  match = <span>{display}</span>;
                }
              } else if (highlightValueMatch) {
                match = highlightValueMatch(display, value);
              }

              return (
                <li
                  key={option.id}
                  id={option.id}
                  aria-selected={navigationOption?.id === option.id || false}
                  role="option"
                  tabIndex={-1}
                  onClick={() => {
                    setNavigationOption(option);
                    setTimeout(() => {
                      handleSelect(option);
                      setOpen(false);
                    }, 1);
                  }}
                  className={classNames({
                    [`block cursor-pointer p-8 hover:bg-${OPTION_HIGHLIGHT_COLOR} ${OPTION_CLASS_NAME}`]:
                      true,
                    [`bg-${OPTION_HIGHLIGHT_COLOR}`]:
                      navigationOption?.id === option.id,
                  })}
                >
                  {matchTextSegments || highlightValueMatch ? match : display}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  },
);
