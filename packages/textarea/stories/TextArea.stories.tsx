import * as React from 'react';
import { TextArea } from '../src';

const metadata = { title: 'Forms/TextArea' };
export default metadata;

export const standard = () => (
  <TextArea label="Description" helpText="Hint message" />
);

export const valueUncontrolled = () => (
  <TextArea label="Description" defaultValue="Test" />
);

export const ValueControlled = () => {
  const [value, setValue] = React.useState('Test');
  return (
    <TextArea
      label="Description"
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

  return <TextArea label="Description" value="hey" ref={ref} />;
};

export const required = () => <TextArea label="Description" required />;

export const placeholder = () => (
  <TextArea label="Description" placeholder="Lorem ipsum" />
);

export const readOnly = () => <TextArea label="Description" readOnly />;

export const autoFocus = () => <TextArea label="Description" autoFocus />;

export const disabled = () => <TextArea label="Description" disabled />;

export const invalid = () => (
  <div className="flex flex-col space-y-48">
    <TextArea label="Description" invalid />
    <TextArea label="Description" invalid helpText="Invalid text" />
  </div>
);

export const minimumRows3 = () => (
  <TextArea label="Description" minimumRows={3} />
);

export const maximumRows3 = () => (
  <TextArea label="Description" maximumRows={3} />
);

export const optional = () => <TextArea label="Description" optional />;
