import React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import { ToggleProps } from './props';
import { classNames } from '@chbphone55/classnames';
import { Item } from './item';

export function Toggle(props: ToggleProps) {
    const id = useId();

    const helpId = props.helpText ? `${id}__hint` : undefined;
    const isInvalid = props.invalid;

    return (
        <>
            {props.title && (
                <div
                    id={`${id}__title`}
                    className={classNames('field-label', {
                        'text-danger': isInvalid,
                    })}
                >
                    {props.title}
                </div>
            )}
            <div
                aria-describedby={helpId}
                className={classNames({
                    'segment-control': props.type === 'radio-button',
                    'segment-control--justified': props.equalWidth,
                    'segment-control--small': props.small,
                    'input-toggle':
                        props.type === 'radio' || props.type === 'checkbox',
                })}
            >
                {!props.options && props.label ? (
                    <Item
                        label={props.label}
                        checked={props.checked}
                        onChange={(e) => props.onChange(e)}
                        name={`${id}:toggle`}
                        key={`${id + props.type}`}
                        type={
                            props.type === 'radio' ||
                            props.type === 'radio-button'
                                ? 'radio'
                                : 'checkbox'
                        }
                    />
                ) : (
                    props.options &&
                    props.options.map((option, i) => (
                        <Item
                            checked={props.selected?.some(
                                (s) => s.value === option.value,
                            )}
                            option={option}
                            onChange={(e) => props.onChange(e)}
                            name={`${id}:toggle`}
                            key={`${id + i + props.type}`}
                            type={
                                props.type === 'radio' ||
                                props.type === 'radio-button'
                                    ? 'radio'
                                    : 'checkbox'
                            }
                        />
                    ))
                )}
            </div>
            {props.helpText && (
                <div
                    id={helpId}
                    className={classNames('field-hint', {
                        'text-danger': isInvalid,
                    })}
                >
                    {props.helpText}
                </div>
            )}
        </>
    );
}
