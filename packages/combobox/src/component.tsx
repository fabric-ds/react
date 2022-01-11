import { classNames } from '@chbphone55/classnames';
import { useId } from '../../utils/src';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { TextField } from '../../textfield/src';
import { ComboboxOption, ComboboxProps } from './props';

const OPTION_HIGHLIGHT_COLOR = 'bluegray-100';
const OPTION_CLASS_NAME = 'f-react-combobox-option';
const MATCH_SEGMENTS_CLASS_NAME = 'f-react-combobox-match';

type Option = ComboboxOption & { id: string };

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (props, ref) => {
    const {
      id: pid,
      options: poptions,
      value,
      onSelect,
      onChange,
      label,
      invalid,
      helpText,
      placeholder,
      openOnFocus,
      className,
      listClassName,
      matchTextSegments,
      children,
      ...rest
    } = props;

    const id = useId(pid);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const [isVisibleBelow, setIsVisibleBelow] = useState(true);
    const [active, setActive] = useState<Option | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [options, setOptions] = useState<Option[]>(
      poptions.map((option: ComboboxOption) => ({
        ...option,
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      })),
    );

    const validOptions =
      options &&
      options.filter((option) =>
        option.value.toLocaleLowerCase().includes(value.toLowerCase()),
      ).length
        ? options.filter((option) =>
            option.value.toLocaleLowerCase().includes(value.toLowerCase()),
          )
        : options;

    const handleSelect = (option: Option) => {
      onSelect && onSelect(option.value);
      setActive(null);
    };

    const handlekeyDown = (e) => {
      // Ensure menu is open before we allow keyboard navigation
      if (
        !menuOpen &&
        ['ArrowDown', 'ArrowUp', 'PageUp', 'PageDown'].includes(e.key)
      ) {
        return setMenuOpen(true);
      }

      if (!menuOpen) return;
      if (!!!active?.id && ['Home', 'End'].includes(e.key)) return;

      const currIndex = validOptions.findIndex(
        (option) => option.id === active?.id,
      );
      const nextIndex = currIndex + 1;
      const prevIndex = currIndex - 1;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActive(
            nextIndex > validOptions.length ? null : validOptions[nextIndex],
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActive(
            prevIndex === -2
              ? validOptions[validOptions.length - 1]
              : prevIndex < 0
              ? null
              : validOptions[prevIndex],
          );
          break;
        case 'PageUp':
          e.preventDefault();
          setActive(
            currIndex - 10 < 0 ? validOptions[0] : validOptions[currIndex - 10],
          );
          break;
        case 'PageDown':
          e.preventDefault();
          setActive(
            currIndex + 10 > validOptions.length
              ? validOptions[validOptions.length - 1]
              : validOptions[currIndex + 10],
          );
          break;
        case 'Home':
          e.preventDefault();
          setActive(validOptions[0]);
          break;
        case 'End':
          e.preventDefault();
          setActive(validOptions[validOptions.length - 1]);
          break;
        case 'Escape':
          menuOpen ? setMenuOpen(false) : onChange('');
          setActive(null);
          break;
        case 'Enter':
          if (active) {
            // Handle Enter only when option is selected, otherwise let the event
            // bubble up to any enclosing form elements etc.
            e.preventDefault();
            handleSelect(active);
          }
          setMenuOpen(false);
          break;
        case 'Backspace':
          onChange(active?.value || value);
          setActive(null);
          break;
        default:
          if (e.key.length === 1) {
            onChange(active?.value || value);
            setActive(null);
          }
          break;
      }
    };

    const handleListPlacement = () => {
      if (!listRef.current || !inputRef.current) return;

      setIsVisibleBelow(
        !!(
          inputRef.current.getBoundingClientRect().bottom +
            listRef.current.clientHeight <=
          (window.innerHeight || document.documentElement.clientHeight)
        ),
      );
    };

    useEffect(() => {
      if (!inputRef.current) return;
      const input = inputRef.current;

      input.addEventListener('keydown', handlekeyDown);
      window.addEventListener('scroll', handleListPlacement);

      return () => {
        input.removeEventListener('keydown', handlekeyDown);
        window.removeEventListener('scroll', handleListPlacement);
      };
    });

    useEffect(() => {
      if (!value.trim().length) setMenuOpen(false);
      if (value.length) setMenuOpen(true);
    }, [value]);

    useEffect(() => {
      setOptions(
        poptions.map((o: ComboboxOption) => ({
          ...o,
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
        })),
      );
    }, [poptions]);

    const TextFieldProps = {
      id,
      ref: ref || inputRef,
      value: active?.value || value,
      onChange: (e) =>
        onChange &&
        onChange(!value.length ? e.target.value.trim() : e.target.value),
      label,
      invalid,
      helpText,
      placeholder,
      role: 'combobox',
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-autocomplete': 'list',
      'aria-expanded': !!active?.id || false,
      'aria-activedescendant': menuOpen ? active?.id : undefined,
      'aria-controls': `${id}-listbox`,
      onFocus: () => {
        if (!openOnFocus) return;
        setMenuOpen(true);
      },
      ...rest,
    };

    return (
      <div
        className={classNames(className, {
          relative: true,
        })}
        onBlur={(event) => {
          // If the clicked element on page is not a child of the container
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setMenuOpen(false);
          }
        }}
      >
        {children ? (
          // @ts-ignore
          <TextField {...TextFieldProps}>{children}</TextField>
        ) : (
          // @ts-ignore
          <TextField {...TextFieldProps} />
        )}

        {menuOpen ? (
          <div
            ref={listRef}
            className={classNames(listClassName, {
              'absolute left-0 right-0 pb-8 rounded-8 bg-white shadow': true,
              'sr-only': !options.length,
            })}
            style={{
              zIndex: 2,
              top: !isVisibleBelow
                ? listRef.current
                  ? -listRef.current?.clientHeight + (label ? 22 : 0)
                  : 'unset'
                : 'unset',
            }}
          >
            <span className="sr-only" role="status">
              {options &&
              options.filter((option) =>
                option.value
                  .toLocaleLowerCase()
                  .toLocaleLowerCase()
                  .includes(value.toLowerCase()),
              ).length
                ? `${validOptions.length} treff`
                : `Ingen treff, viser ${
                    validOptions.length > 1 || validOptions.length === 0
                      ? 'alle'
                      : ''
                  } ${validOptions.length} alternativ${
                    validOptions.length > 1 || validOptions.length === 0
                      ? 'er'
                      : ''
                  }`}
            </span>
            <ul
              id={`${id}-listbox`}
              role="listbox"
              className={classNames('m-0 p-0 select-none list-none', {
                [MATCH_SEGMENTS_CLASS_NAME]: matchTextSegments,
              })}
            >
              {validOptions.map((option) => {
                const display = option.label || option.value;
                let match: JSX.Element[] = [];

                if (matchTextSegments) {
                  match = [...display].map((letter, i) => {
                    if (
                      [...value.toLowerCase()].includes(letter.toLowerCase())
                    ) {
                      return (
                        <span
                          data-combobox-text-match
                          key={`${option.id}-bold-letter-${letter}-${i}`}
                          className="font-bold"
                        >
                          {letter}
                        </span>
                      );
                    } else {
                      return (
                        <span key={`${option.id}-letter-${letter}-${i}`}>
                          {letter}
                        </span>
                      );
                    }
                  });
                }

                return (
                  <li
                    key={option.id}
                    id={option.id}
                    aria-selected={active?.id === option.id || false}
                    role="option"
                    tabIndex={-1}
                    onClick={() => {
                      setActive(option);
                      setTimeout(() => {
                        handleSelect(option);
                        setMenuOpen(false);
                      }, 1);
                    }}
                    className={classNames({
                      [`block cursor-pointer p-8 hover:bg-${OPTION_HIGHLIGHT_COLOR} ${OPTION_CLASS_NAME}`]:
                        true,
                      [`bg-${OPTION_HIGHLIGHT_COLOR}`]:
                        active?.id === option.id,
                    })}
                  >
                    {matchTextSegments ? match : display}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  },
);
