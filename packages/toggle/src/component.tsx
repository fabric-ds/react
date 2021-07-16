import React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import { ToggleEntry, ToggleProps } from './props';
import { classNames } from '@chbphone55/classnames';
import { Item } from './item';

function Title({ id, isInvalid, title }) {
    return (
        <legend
            id={`${id}__title`}
            className={classNames('field-label', {
                'text-danger': isInvalid,
            })}
        >
            {title}
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
    const isRadioGroup =
        props.type === 'radio' || props.type === 'radio-button';

    return (
        <>
            {props.type === 'radio-button' && props.title && (
                <Title id={id} title={props.title} isInvalid={isInvalid} />
            )}
            <fieldset
                role={isRadioGroup ? 'radiogroup' : undefined}
                aria-invalid={isRadioGroup ? isInvalid : undefined}
                aria-errormessage={
                    isRadioGroup && isInvalid ? helpId : undefined
                }
                aria-describedby={
                    isRadioGroup && !isInvalid ? helpId : undefined
                }
                className={classNames(props.className, {
                    'segment-control': props.type === 'radio-button',
                    'segment-control--justified': props.equalWidth,
                    'segment-control--small': props.small,
                    'input-toggle':
                        props.type === 'radio' || props.type === 'checkbox',
                })}
            >
                {props.type !== 'radio-button' && props.title && (
                    <Title id={id} title={props.title} isInvalid={isInvalid} />
                )}
                {!props.options && props.label ? (
                    <Item
                        label={props.label}
                        checked={props.checked}
                        onChange={(e: boolean) => props.onChange(e)}
                        name={`${id}:toggle`}
                        key={`${id + props.type}`}
                        invalid={isInvalid}
                        helpId={helpId}
                        type={isRadioGroup ? 'radio' : 'checkbox'}
                    />
                ) : (
                    props.options &&
                    props.options.map((option, i) => (
                        <Item
                            checked={props.selected?.some(
                                (s) => s.value === option.value,
                            )}
                            option={option}
                            onChange={(e: ToggleEntry) => props.onChange(e)}
                            name={`${id}:toggle`}
                            key={`${id + i + props.type}`}
                            invalid={isInvalid}
                            helpId={helpId}
                            type={isRadioGroup ? 'radio' : 'checkbox'}
                        />
                    ))
                )}

                {props.type !== 'radio-button' && props.helpText && (
                    <HelpText
                        helpId={helpId}
                        helpText={props.helpText}
                        isInvalid={isInvalid}
                    />
                )}
            </fieldset>
            {props.type === 'radio-button' && props.helpText && (
                <HelpText
                    helpId={helpId}
                    helpText={props.helpText}
                    isInvalid={isInvalid}
                />
            )}
        </>
    );
}
