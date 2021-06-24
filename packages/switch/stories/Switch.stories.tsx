import * as React from 'react';
import { Switch } from '../src';

const metadata = { title: 'Forms/Switch' };
export default metadata;

export const Default = () => {
    const [value, setValue] = React.useState(false);

    return (
        <div>
            <Switch onChange={(value) => setValue(value)} value={value} />
        </div>
    );
};

export const Disabled = () => {
    const [value, setValue] = React.useState(false);

    return (
        <div>
            <Switch
                onChange={(value) => setValue(value)}
                value={value}
                disabled
            />
        </div>
    );
};
