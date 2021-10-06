import React from 'react';
import { Toggle } from '../src';

const metadata = { title: 'Forms/Toggle/RadioButtons' };
export default metadata;

const options = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
];

export const MultipleOptions = () => {
  return (
    <Toggle
      type="radio-button"
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const EqualWidth = () => {
  return (
    <Toggle
      type="radio-button"
      equalWidth
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const Small = () => {
  return (
    <Toggle
      type="radio-button"
      small
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const WithTitle = () => {
  return (
    <Toggle
      type="radio-button"
      title="Favorite color"
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const Optional = () => {
  return (
    <Toggle
      optional
      type="radio-button"
      title="Favorite color"
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const HelpText = () => {
  return (
    <Toggle
      type="radio-button"
      title="Favorite color"
      helpText="Choose your absolute favorite color"
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const Invalid = () => {
  return (
    <Toggle
      type="radio-button"
      title="Favorite color"
      helpText="No way you like blue"
      invalid
      selected={[options[1]]}
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const SelectedDefaultControlled = () => {
  return (
    <Toggle
      type="radio-button"
      title="Favorite color"
      helpText="Last selected by default"
      selected={[options[options.length - 1]]}
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const SelectedDefaultUncontrolled = () => {
  return (
    <Toggle
      type="radio-button"
      title="Favorite color"
      helpText="Last selected by default"
      defaultSelected={[options[options.length - 1]]}
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};
