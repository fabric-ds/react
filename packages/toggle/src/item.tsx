import React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import { ToggleEntry } from './props';

interface ItemProps extends Pick<HTMLInputElement, 'type' | 'name'> {
    option?: ToggleEntry;
    checked?: boolean;
    invalid?: boolean;
    helpId?: string;
    label?: string;
    onChange: (data: ToggleEntry | boolean) => void;
}

export function Item({
    option,
    label,
    invalid,
    helpId,
    checked,
    ...props
}: ItemProps) {
    const id = useId();

    return (
        <>
            <input
                id={id}
                defaultChecked={checked}
                aria-invalid={invalid}
                aria-errormessage={helpId}
                {...props}
                onChange={(e) =>
                    props.onChange(
                        label
                            ? e.target.checked
                            : option
                            ? { label: option?.label, value: option?.value }
                            : false,
                    )
                }
            />
            <label htmlFor={id}>{label || option?.label}</label>
        </>
    );
}
