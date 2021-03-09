import * as React from 'react';
import { action } from '@storybook/addon-actions';

import { TextField as TroikaTextField } from '../src';

const metadata = { title: 'Forms/TextField' };
export default metadata;

const TextField = (args) => (
    <TroikaTextField
        label="Address"
        onChange={action('change')}
        onFocus={action('focus')}
        onBlur={action('blur')}
        {...args}
    />
);

export const standard = () => <TextField />;

export const valueUncontrolled = () => <TextField defaultValue="Test" />;

export const valueControlled = () => <TextField value="Test" />;

export const required = () => <TextField required />;

export const placeholder = () => <TextField placeholder="Sesame street" />;

export const disabled = () => <TextField disabled />;

export const readOnly = () => <TextField readOnly />;

export const autoFocus = () => <TextField autoFocus />;

export const helpText = () => (
    <TextField helpText="Necessary because of reasons" />
);

export const invalid = () => (
    <div className="flex flex-col space-y-48">
        <TextField invalid />
        <TextField helpText="Error text" invalid />
    </div>
);
