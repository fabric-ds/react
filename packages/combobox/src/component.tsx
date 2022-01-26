import { classNames } from '@chbphone55/classnames';
import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TextField } from '../../textfield/src';
import { useId } from '../../utils/src';
import { ComboboxProps, OptionWithIdAndMatch } from './props';
import { createOptionsWithIdAndMatch, getAriaText } from './utils';

const OPTION_HIGHLIGHT_COLOR = 'bluegray-100';
const OPTION_CLASS_NAME = 'f-react-combobox-option';
const MATCH_SEGMENTS_CLASS_NAME = 'f-react-combobox-match';

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  ({ id: pid, ...props }, forwardRef) => {
    const id = useId(pid);
    const listboxId = `${id}-listbox`;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Options list open boolean
    const [isOpen, setOpen] = useState(false);

    // The option the user has navigated to with their keyboard
    const [navigationOption, setNavigationOption] =
      useState<OptionWithIdAndMatch | null>(null);

    // Available options based on user's input value
    const [currentOptions, setCurrentOptions] = useState<
      OptionWithIdAndMatch[]
    >([]);

    // Destructure props
    const {
      options,
      value,
      label,
      invalid,
      helpText,
      placeholder,
      openOnFocus,
      className,
      listClassName,
      disableStaticFiltering = false,
      matchTextSegments,
      children,
      highlightValueMatch,
      onSelect,
      onChange,
      onFocus,
      onBlur,
      ...rest
    } = props;

    // Set and filter available options based on user input
    useEffect(() => {
      setCurrentOptions(
        createOptionsWithIdAndMatch(options, value).filter((option) =>
          !disableStaticFiltering
            ? option.value.toLocaleLowerCase().includes(value.toLowerCase())
            : true,
        ),
      );
    }, [options, disableStaticFiltering, value]);

    function handlekeyDown(e: KeyboardEvent) {
      const isNavigationKey = [
        'ArrowDown',
        'ArrowUp',
        'PageUp',
        'PageDown',
        'Home',
        'End',
      ].includes(e.key);

      const ignoreList = ['ArrowDown', 'ArrowLeft', 'ArrowUp', 'ArrowRight'];

      if (isNavigationKey && !isOpen) {
        return setOpen(true);
      } else if (isNavigationKey && isOpen) {
        findAndSetActiveOption(e, {
          setNavigationOption,
          navigationOption,
          currentOptions,
        });
      }

      // Other keys
      switch (e.key) {
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
          setOpen(true);
          break;
        default:
          if (ignoreList.includes(e.key)) {
            break;
          }

          setOpen(true);
          if (navigationOption) {
            onChange && onChange(navigationOption.value);
            setNavigationOption(null);
          } else {
            onChange && onChange(value);
          }
          break;
      }

      // We can assume the user has a dynamic list
      if (disableStaticFiltering) {
        currentOptions.length && setOpen(true);
      }
    }

    useEffect(() => {
      if (!inputRef.current) return;
      const input = inputRef.current;

      input.addEventListener('keydown', handlekeyDown);
      return () => {
        input.removeEventListener('keydown', handlekeyDown);
      };
    });

    function handleSelect(option: OptionWithIdAndMatch) {
      onSelect && onSelect(option.value); // this may trigger an external api call
      setOpen(false);
      setNavigationOption(null);

      // Set empty states on select and clear when dynamic list
      if (disableStaticFiltering) {
        setCurrentOptions(
          currentOptions.filter((o) => o.id !== navigationOption?.id),
        );
      }
    }

    const TextFieldProps = {
      id,
      value: navigationOption?.value || value,
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
      onChange: function (e) {
        onChange && onChange(e.target.value);
      },
      onFocus: function () {
        if (!openOnFocus) return;
        onFocus && onFocus();
        setOpen(true);
      },
      onBlur: function (e) {
        handleInputBlur(containerRef, e, setOpen);
        onBlur && onBlur(navigationOption?.value || value);
      },
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
      ...rest,
    };

    return (
      <div
        className={classNames(className, 'relative')}
        onBlur={(e) => handleContainerBlur(e, setOpen)}
        ref={containerRef}
      >
        {children ? (
          // @ts-ignore
          <TextField {...TextFieldProps}>{children}</TextField>
        ) : (
          // @ts-ignore
          <TextField {...TextFieldProps} />
        )}

        <span className="sr-only" role="status">
          {getAriaText(currentOptions, value)}
        </span>

        <div
          hidden={!isOpen || !currentOptions.length}
          className={classNames(
            listClassName,
            'absolute left-0 right-0 bg-primary pb-8 rounded-8 bg-white shadow',
          )}
          style={{
            zIndex: 3, // Force popover above misc. page content (mobile safari issue)
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
                console.log(option);
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
                  role="option"
                  aria-selected={navigationOption?.id === option.id}
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

function findAndSetActiveOption(
  e: KeyboardEvent,
  {
    setNavigationOption,
    navigationOption,
    currentOptions,
  }: {
    setNavigationOption: Dispatch<SetStateAction<OptionWithIdAndMatch | null>>;
    navigationOption: OptionWithIdAndMatch | null;
    currentOptions: OptionWithIdAndMatch[];
  },
): void {
  e.preventDefault();

  const currIndex = currentOptions.findIndex(
    (option) => option.id === navigationOption?.id,
  );
  const nextIndex = currIndex + 1;
  const prevIndex = currIndex - 1;

  switch (e.key) {
    case 'ArrowDown':
      setNavigationOption(
        nextIndex > currentOptions.length ? null : currentOptions[nextIndex],
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
        currIndex - 10 < 0 ? currentOptions[0] : currentOptions[currIndex - 10],
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

// If the clicked element on page is not a child of the container
function handleContainerBlur(
  e: React.FocusEvent,
  setOpen: Dispatch<SetStateAction<boolean>>,
) {
  const isClickOutsideContainer = !e.currentTarget.contains(e.relatedTarget);

  if (isClickOutsideContainer) {
    setOpen(false);
  }
}

function handleInputBlur(
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  e: React.FocusEvent,
  setOpen: Dispatch<SetStateAction<boolean>>,
) {
  if (!containerRef.current) return;

  const isClickOutsideContainer = !containerRef.current?.contains(
    e.relatedTarget,
  );

  if (isClickOutsideContainer) {
    setOpen(false);
  }
}
