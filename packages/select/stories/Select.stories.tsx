import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { Select as TroikaSelect } from '../src';

const metadata = { title: 'Forms/Select' };
export default metadata;

const Select = (props) => (
    <TroikaSelect
        label="Berries"
        onChange={action('change')}
        onFocus={action('focus')}
        onBlur={action('blur')}
        {...props}
    >
        <option>Strawberries</option>
        <option>Raspberries</option>
        <option>Cloudberries</option>
    </TroikaSelect>
);

export const standard = () => <Select />;

export const disabled = () => <Select disabled />;

export const helpText = () => (
    <Select helpText="We assume this is your jam preference" />
);

export const invalid = () => (
    <div className="flex flex-col space-y-32">
        <Select invalid />
        <Select invalid helpText="Wrong choice" />
    </div>
);
