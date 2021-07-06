import React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import { ToggleEntry } from './props';

interface ItemProps extends Pick<HTMLInputElement, 'type' | 'name'> {
    entry: ToggleEntry;
    single?: boolean;
    onChange: (data: ToggleEntry | boolean) => void;
}

export function Item({
    entry: { label, value, checked },
    single,
    ...props
}: ItemProps) {
    const id = useId();

    return (
        <>
            <input
                id={id}
                defaultChecked={checked}
                {...props}
                onChange={(e) =>
                    props.onChange(single ? e.target.checked : { label, value })
                }
            />
            <label htmlFor={id}>{label}</label>
        </>
    );
}
