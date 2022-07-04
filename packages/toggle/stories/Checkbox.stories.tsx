import { useState } from 'react';
import { Toggle, ToggleItem } from '../src';

const metadata = { title: 'Forms/Toggle/Checkbox' };
export default metadata;

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Microsoft', value: 'microsoft' },
  { label: 'Amazon', value: 'amazon' },
];

export const ToggleItemExample = () => {
  const [value, setValue] = useState(false);

  return (
    <ToggleItem
      onChange={() => setValue(!value)}
      checked={value}
      type="checkbox"
      name="privacy-enabled"
      label="Toggle X"
      noVisibleLabel={true}
      controlled={true}
    />
  );
};

export const SingleOption = () => {
  return (
    <Toggle
      type="checkbox"
      label="Apple"
      onChange={(checked) => console.log(checked)}
    />
  );
};

export const SingleOptionCheckedControlledDefault = () => {
  return (
    <Toggle
      type="checkbox"
      label="Apple"
      checked
      onChange={(checked) => console.log(checked)}
    />
  );
};

export const SingleOptionCheckedUncontrolledDefault = () => {
  return (
    <Toggle
      type="checkbox"
      label="Apple"
      defaultChecked
      onChange={(checked) => console.log(checked)}
    />
  );
};

export const SingleOptionHelpText = () => {
  return (
    <Toggle
      type="checkbox"
      label="Apple"
      helpText="This is helper text"
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const MultipleOptions = () => {
  return (
    <Toggle
      type="checkbox"
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const WithTitle = () => {
  return (
    <Toggle
      type="checkbox"
      title="Companies"
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const Optional = () => {
  return (
    <Toggle
      optional
      type="checkbox"
      title="Companies"
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const HelpText = () => {
  return (
    <Toggle
      type="checkbox"
      title="Companies"
      helpText="Select a random company"
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const Invalid = () => {
  return (
    <Toggle
      type="checkbox"
      title="Companies"
      helpText="Please don't select Microsoft"
      invalid
      selected={[options[1]]}
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};

export const SelectedDefault = () => {
  return (
    <Toggle
      type="checkbox"
      title="Companies"
      helpText="Everything but first is selected by default"
      selected={[...options].splice(1)}
      options={options}
      onChange={(selected) => console.log(selected)}
    />
  );
};
