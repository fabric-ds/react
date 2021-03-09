import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { Checkbox as FabricCheckbox } from '../src';

const metadata = { title: 'Forms/Checkbox/Checkbox' };
export default metadata;

const Checkbox = (props) => (
    <FabricCheckbox onChange={action('change')} {...props}>
        Toggle me
    </FabricCheckbox>
);

export const standard = () => <Checkbox />;

export const valueControlled = () => <Checkbox checked />;

export const valueUncontrolled = () => <Checkbox defaultChecked />;

export const helpText = () => <Checkbox helpText="Pretty please, toggle me!" />;

export const invalid = () => (
    <Checkbox error helpText="Did you forget to toggle me?" />
);

export const disabled = () => <Checkbox disabled />;
