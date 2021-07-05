import React, { useState } from 'react';
import { Switch } from '../src';

const metadata = { title: 'Forms/Switch' };
export default metadata;

export const DefaultDisabled = () => {
    const [value, setValue] = useState(false);

    return <Switch onClick={(value) => setValue(value)} value={value} />;
};

export const DefaultEnabled = () => {
    const [value, setValue] = useState(true);

    return <Switch onClick={(value) => setValue(value)} value={value} />;
};

export const CustomClickHandler = () => {
    const [value, setValue] = useState(false);

    const handleClick = (value) => {
        setValue(value);
        alert('Your own custom click handler');
    };

    return <Switch onClick={handleClick} value={value} />;
};
