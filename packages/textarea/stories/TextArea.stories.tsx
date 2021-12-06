import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { TextArea } from '../src';

const metadata = { title: 'Forms/TextArea' };
export default metadata;

export const standard = () => <TextArea helpText="Hint message" />;

export const valueUncontrolled = () => <TextArea defaultValue="Test" />;

export const ValueControlled = () => {
  const [value, setValue] = React.useState('Test');
  return (
    <TextArea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      minimumRows={4}
      maximumRows={6}
    />
  );
};

export const TextFieldWithRef = () => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    console.log(ref.current);
  });

  return <TextArea value="hey" ref={ref} />;
};

export const required = () => <TextArea required />;

export const placeholder = () => <TextArea placeholder="Lorem ipsum" />;

export const readOnly = () => <TextArea readOnly />;

export const autoFocus = () => <TextArea autoFocus />;

export const disabled = () => <TextArea disabled />;

export const invalid = () => (
  <div className="flex flex-col space-y-48">
    <TextArea invalid />
    <TextArea invalid helpText="Invalid text" />
  </div>
);

export const minimumRows3 = () => <TextArea minimumRows={3} />;

export const maximumRows3 = () => <TextArea maximumRows={3} />;
