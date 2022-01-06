import Search from '@fabric-ds/icons/react/search-16';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { Affix, IconAffix } from '../../_helpers';
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

export const clearPrefix = () => (
  <TextField>
    <Affix prefix clear onClick={() => alert('clear')} />
  </TextField>
);

export const searchPrefix = () => (
  <TextField>
    <Affix prefix search onClick={() => alert('search')} />
  </TextField>
);

export const labelPrefix = () => (
  <TextField>
    <Affix prefix label="kr" />
  </TextField>
);

export const iconPrefix = () => (
  <TextField>
    <IconAffix prefix>
      <Search />
    </IconAffix>
  </TextField>
);

export const clearSuffix = () => (
  <TextField>
    <Affix suffix clear onClick={() => alert('clear')} />
  </TextField>
);

export const searchSuffix = () => (
  <TextField>
    <Affix suffix search onClick={() => alert('search')} />
  </TextField>
);

export const labelSuffix = () => (
  <TextField>
    <Affix suffix label="kr" />
  </TextField>
);

export const iconSuffix = () => (
  <TextField>
    <IconAffix suffix>
      <Search />
    </IconAffix>
  </TextField>
);

export const helpText = () => (
  <TextField helpText="Necessary because of reasons" />
);

export const invalid = () => (
  <div className="flex flex-col space-y-48">
    <TextField invalid />
    <TextField helpText="Error text" invalid />
  </div>
);
