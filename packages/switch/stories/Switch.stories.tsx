import React, { useState } from 'react';
import { Switch } from '../src';

const metadata = { title: 'Forms/Switch' };
export default metadata;

export const Default = () => {
    const [value, setValue] = useState(false);

    return (
        <div>
            <Switch onClick={(value) => setValue(value)} value={value} />
        </div>
    );
};

export const Disabled = () => {
    const [value, setValue] = useState(true);

    return (
        <div>
            <Switch
                onClick={(value) => setValue(value)}
                value={value}
                disabled
            />
        </div>
    );
};

export const CustomOnClick = () => {
    const [value, setValue] = useState(false);

    const handleClick = (value) => {
        setValue(value);
        alert('Your own custom click handler');
    };

    return (
        <div>
            <Switch onClick={handleClick} value={value} />
        </div>
    );
};
