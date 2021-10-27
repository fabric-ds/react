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
    const id = useId(props.id);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const [isVisibleBelow, setIsVisibleBelow] = useState(true);
    const [active, setActive] = useState<Option | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [options, setOptions] = useState<Option[]>(
      props.options.map((o: ComboboxOption) => ({
        ...o,
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      })),
    );

    const validOptions =
      options &&
      options.filter((o) =>
        o.value.toLocaleLowerCase().includes(props.value.toLowerCase()),
      ).length
        ? options.filter((o) =>
            o.value.toLocaleLowerCase().includes(props.value.toLowerCase()),
          )
        : options;

    const handleSelect = (o: Option) => {
      props.onSelect && props.onSelect(o.value);
      props.onChange(o.value);

      setActive(null);
      setMenuOpen(false);
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

      const currIndex = validOptions.findIndex((o) => o.id === active?.id);
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
          menuOpen ? setMenuOpen(false) : props.onChange('');
          setActive(null);
          break;
        case 'Enter':
          if (!active) return;
          handleSelect(active);
          break;
        case 'Backspace':
          props.onChange(active?.value || props.value);
          setActive(null);
          break;
        default:
          if (e.key.length === 1) {
            props.onChange(active?.value || props.value);
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
      if (!props.value) return;

      if (!props.value.trim().length) setMenuOpen(false);
      if (props.value.length) setMenuOpen(true);
    }, [props.value]);

    useEffect(() => {
      if (!props.options.length) return;

      setOptions(
        props.options.map((o: ComboboxOption) => ({
          ...o,
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
        })),
      );
    }, [props.options]);

    return (
      <div
        className={classNames(props.className, {
          relative: true,
        })}
        onBlur={(event) => {
          // If the clicked element on page is not a child of the container
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setMenuOpen(false);
          }
        }}
      >
        <TextField
          id={id}
          ref={ref || inputRef}
          value={active?.value || props.value}
          onChange={(e) =>
            props.onChange &&
            props.onChange(
              !props.value.length ? e.target.value.trim() : e.target.value,
            )
          }
          label={props.label}
          invalid={props.invalid}
          helpText={props.helpText}
          placeholder={props.placeholder}
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={!!active?.id || false}
          aria-activedescendant={menuOpen ? active?.id : undefined}
          aria-controls={`${id}-listbox`}
          onFocus={() => {
            if (!props.openOnFocus) return;
            setMenuOpen(true);
          }}
        />

        {menuOpen ? (
          <div
            ref={listRef}
            className={classNames(props.listClassName, {
              'absolute left-0 right-0 pb-8 rounded-8 bg-white shadow': true,
            })}
            style={{
              zIndex: 2,
              top: !isVisibleBelow
                ? listRef.current
                  ? -listRef.current?.clientHeight + (props.label ? 22 : 0)
                  : 'unset'
                : 'unset',
            }}
          >
            <span className="sr-only" role="status">
              {options &&
              options.filter((o) =>
                o.value.toLocaleLowerCase().includes(props.value.toLowerCase()),
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
                [MATCH_SEGMENTS_CLASS_NAME]: props.matchTextSegments,
              })}
            >
              {validOptions.map((o) => {
                const display = o.label || o.value;
                let match: JSX.Element[] = [];

                if (props.matchTextSegments) {
                  match = [...display].map((l, i) => {
                    if (
                      [...props.value.toLowerCase()].includes(l.toLowerCase())
                    ) {
                      return (
                        <span
                          data-combobox-text-match
                          key={`${o.id}-bold-letter-${l}-${i}`}
                          className="font-bold"
                        >
                          {l}
                        </span>
                      );
                    } else {
                      return <span key={`${o.id}-letter-${l}-${i}`}>{l}</span>;
                    }
                  });
                }

                return (
                  <li
                    key={o.id}
                    aria-selected={active?.id === o.id || false}
                    role="option"
                    tabIndex={-1}
                    onClick={() => {
                      setActive(o);

                      setTimeout(() => {
                        handleSelect(o);
                      }, 1);
                    }}
                    className={classNames({
                      [`block cursor-pointer p-8 hover:bg-${OPTION_HIGHLIGHT_COLOR} ${OPTION_CLASS_NAME}`]:
                        true,
                      [`bg-${OPTION_HIGHLIGHT_COLOR}`]: active?.id === o.id,
                    })}
                  >
                    {props.matchTextSegments ? match : display}
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
