import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { Select as FabricSelect } from '../src';

const metadata = { title: 'Forms/Select' };
export default metadata;

const Select = (props) => (
    <FabricSelect
        label="Berries"
        onChange={action('change')}
        onFocus={action('focus')}
        onBlur={action('blur')}
        {...props}
    >
        <option>Strawberries</option>
        <option>Raspberries</option>
        <option>Cloudberries</option>
    </FabricSelect>
);

export const standard = () => <Select />;

export const hint = () => (
    <Select hint="We assume this is your jam preference" always />
);

export const invalid = () => (
    <div className="flex flex-col space-y-32">
        <Select invalid />
        <Select invalid hint="Wrong choice" />
    </div>
);
