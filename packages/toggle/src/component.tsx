import React from 'react';
import { useId } from '../../utils/src';
import { ToggleEntry, ToggleProps } from './props';
import { classNames } from '@chbphone55/classnames';
import { Item } from './item';

function Title({ id, isInvalid, title, optional }) {
  return (
    <legend
      id={`${id}__title`}
      className={classNames('field-label', {
        'text-danger': isInvalid,
      })}
    >
      {title}
      {optional && (
        <span className="pl-8 font-normal text-14 text-gray-500">
          (valgfritt)
        </span>
      )}
    </legend>
  );
}

function HelpText({ isInvalid, helpId, helpText }: any) {
  return (
    <div
      id={helpId}
      className={classNames('field-hint', { 'text-danger': isInvalid })}
    >
      {helpText}
    </div>
  );
}

export function Toggle(props: ToggleProps) {
  const id = useId();

  const helpId = props.helpText ? `${id}__hint` : undefined;
  const isInvalid = props.invalid;
  const isRadioGroup = props.type === 'radio' || props.type === 'radio-button';

  const isControlled =
    props.selected !== undefined || props.checked !== undefined;

  return (
    <fieldset
      role={isRadioGroup ? 'radiogroup' : undefined}
      aria-invalid={isRadioGroup ? isInvalid : undefined}
      aria-errormessage={isRadioGroup && isInvalid ? helpId : undefined}
      aria-describedby={helpId}
      className="field"
    >
      {props.title && (
        <Title
          id={id}
          title={props.title}
          isInvalid={isInvalid}
          optional={props.optional}
        />
      )}
      <div
        className={classNames(props.className, {
          'segment-control': props.type === 'radio-button',
          'segment-control--justified': props.equalWidth,
          'segment-control--small': props.small,
          'input-toggle': props.type === 'radio' || props.type === 'checkbox',
        })}
      >
        {!props.options && props.label ? (
          <Item
            controlled={isControlled}
            label={props.label}
            checked={props.checked}
            defaultChecked={props.defaultChecked}
            indeterminate={props.indeterminate}
            // @ts-ignore TODO: typecheck
            onChange={(e: boolean) => props.onChange(e)}
            name={`${id}:toggle`}
            key={`${id + props.type}`}
            invalid={isInvalid}
            helpId={helpId}
            type={isRadioGroup ? 'radio' : 'checkbox'}
            noVisibleLabel={props.noVisibleLabel}
          />
        ) : (
          props.options &&
          props.options.map((option, i) => (
            <Item
              controlled={isControlled}
              checked={props.selected?.some((s) => s.value === option.value)}
              defaultChecked={props.defaultSelected?.some(
                (s) => s.value === option.value,
              )}
              option={option}
              // @ts-ignore TODO: typecheck
              onChange={(e: ToggleEntry) => props.onChange(e)}
              name={`${id}:toggle`}
              key={`${id + i + props.type}`}
              invalid={isInvalid}
              helpId={helpId}
              type={isRadioGroup ? 'radio' : 'checkbox'}
              noVisibleLabel={props.noVisibleLabel}
            />
          ))
        )}
      </div>

      {props.helpText && (
        <HelpText
          helpId={helpId}
          helpText={props.helpText}
          isInvalid={isInvalid}
        />
      )}
    </fieldset>
  );
}
