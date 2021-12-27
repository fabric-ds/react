import React from 'react';
import { Combobox } from '../src';
import { Affix } from '../../_helpers';
import { action } from '@storybook/addon-actions';

const metadata = { title: 'Forms/Combobox' };
export default metadata;

export const Basic = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <p>Start typing to see suggestions</p>
      <Combobox
        label="Stillingstittel"
        value={value}
        onChange={(val) => setValue(val)}
        onSelect={(val) => {
          setValue(val);
          action('select')(val);
        }}
        options={[
          { value: 'Product manager' },
          { value: 'Produktledelse' },
          { value: 'Prosessoperatør' },
          { value: 'Prosjekteier' },
        ]}
      />
    </>
  );
};

export const BubbleEventOnEnter = () => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    console.log('Bubbled value', value);
  }, [value]);

  return (
    <>
      <p>Start typing to see suggestions</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(value);
        }}
      >
        <Combobox
          label="Stillingstittel"
          value={value}
          onChange={(val) => setValue(val)}
          onSelect={(val) => {
            setValue(val);
            action('select')(val);
          }}
          options={[
            { value: 'Product manager' },
            { value: 'Produktledelse' },
            { value: 'Prosessoperatør' },
            { value: 'Prosjekteier' },
          ]}
        />
      </form>
    </>
  );
};

export const MatchTextSegments = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <p>Highlight text matches</p>
      <Combobox
        value={value}
        onChange={(val) => setValue(val)}
        onSelect={(val) => {
          setValue(val);
          action('select')(val);
        }}
        matchTextSegments
        label="Stillingstittel"
        options={[
          { value: 'Product manager' },
          { value: 'Produktledelse' },
          { value: 'Prosessoperatør' },
          { value: 'Prosjekteier' },
        ]}
      />
    </>
  );
};

export const OpenOnFocus = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <p>The comboboxlist opens when the input has focus</p>
      <Combobox
        value={value}
        onChange={(val) => setValue(val)}
        onSelect={(val) => {
          setValue(val);
          action('select')(val);
        }}
        openOnFocus
        label="Stillingstittel"
        options={[
          { value: 'Product manager' },
          { value: 'Produktledelse' },
          { value: 'Prosessoperatør' },
          { value: 'Prosjekteier' },
        ]}
      />
    </>
  );
};

export const SelectOnClick = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <p>
        When the user clicks inside the text box the current value will be
        selected (like the URL bar in browsers).
      </p>
      <Combobox
        value={value}
        onChange={(val) => setValue(val)}
        onSelect={(val) => {
          setValue(val);
          action('select')(val);
        }}
        label="Stillingstittel"
        options={[
          { value: 'Product manager' },
          { value: 'Produktledelse' },
          { value: 'Prosessoperatør' },
          { value: 'Prosjekteier' },
        ]}
      />
    </>
  );
};

export const OptionText = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <Combobox
        value={value}
        onChange={(val) => setValue(val)}
        onSelect={(val) => {
          setValue(val);
          action('select')(val);
        }}
        label="Favorite fruit"
        placeholder="What's your favorite fruit?"
        options={[
          { value: 'Apple', label: '🍎 Apple' },
          { value: 'Banana', label: '🍌 Banana' },
          { value: 'Orange', label: '🍊 Orange' },
          { value: 'Pineapple', label: '🍍 Pineapple' },
        ]}
      />
    </>
  );
};

export const WithAffix = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <Combobox
        value={value}
        onChange={(val) => setValue(val)}
        onSelect={(val) => {
          setValue(val);
          action('select')(val);
        }}
        label="Favorite fruit"
        placeholder="What's your favorite fruit?"
        options={[
          { value: 'Apple', label: '🍎 Apple' },
          { value: 'Banana', label: '🍌 Banana' },
          { value: 'Orange', label: '🍊 Orange' },
          { value: 'Pineapple', label: '🍍 Pineapple' },
        ]}
      >
        <Affix suffix clear onClick={() => setValue('')} />
      </Combobox>
    </>
  );
};
