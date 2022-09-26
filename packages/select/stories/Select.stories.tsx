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

export const noLabel = () => (
  <div className="flex flex-col space-y-32">
    <FabricSelect
      onChange={action('change')}
      onFocus={action('focus')}
      onBlur={action('blur')}
      aria-label="You're selection is berry nice!"
    >
      <option>Strawberries</option>
      <option>Raspberries</option>
      <option>Cloudberries</option>
    </FabricSelect>

    <label id="select-label" htmlFor="fabric-aria-labelledby-example">
      You're berry good at selecting!
    </label>
    <FabricSelect
      id="fabric-aria-labelledby-example"
      onChange={action('change')}
      onFocus={action('focus')}
      onBlur={action('blur')}
      aria-labelledby="select-label"
    >
      <option>Strawberries</option>
      <option>Raspberries</option>
      <option>Cloudberries</option>
    </FabricSelect>
  </div>
);

export const optional = () => <Select optional />;
