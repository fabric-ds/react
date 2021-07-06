import React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import { ToggleEntry, ToggleProps } from './props';
import { classNames } from '@chbphone55/classnames';
import { Item } from './item';

function isSingle(data: ToggleProps['data']): data is ToggleEntry {
    if ((data as ToggleEntry).label) return true;
    return false;
}

export function Toggle(props: ToggleProps) {
    const id = useId();

    return (
        <div
            className={classNames({
                'segment-control': props.type === 'radio-button',
                'segment-control--justified': props.equalWidth,
                'segment-control--small': props.small,
                'input-toggle':
                    props.type === 'radio' || props.type === 'checkbox',
            })}
        >
            {isSingle(props.data) ? (
                <Item
                    single
                    onChange={(e) => props.onChange(e)}
                    entry={props.data}
                    name={`${id}:toggle`}
                    key={`${id + props.type}`}
                    type={
                        props.type === 'radio' || props.type === 'radio-button'
                            ? 'radio'
                            : 'checkbox'
                    }
                />
            ) : (
                props.data.map((e, i) => (
                    <Item
                        entry={e}
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
    );
}
