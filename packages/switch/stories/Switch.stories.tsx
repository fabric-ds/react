import React, { useState } from 'react';
import { Switch } from '../src';

const metadata = { title: 'Forms/Switch' };
export default metadata;

export const DefaultDisabled = () => {
    const [value, setValue] = useState(false);

    return (
        <Switch
            aria-label="Toggle me"
            onClick={() => setValue(!value)}
            value={value}
        />
    );
};

export const DefaultEnabled = () => {
    const [value, setValue] = useState(true);

    return (
        <Switch
            aria-label="Toggle me"
            onClick={() => setValue(!value)}
            value={value}
        />
    );
};

export const CustomClickHandler = () => {
    const [value, setValue] = useState(false);

    const handleClick = () => {
        const newValue = !value;
        setValue(newValue);
        alert(`Custom click handler: Switch ${newValue ? 'enabled' : 'disabled'}.`);
    };

    return (
        <Switch
            aria-label="I have a custom click handler"
            onClick={handleClick}
            value={value}
        />
    );
};
