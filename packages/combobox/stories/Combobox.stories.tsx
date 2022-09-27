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

export const DisableStaticListFiltering = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <p>Start typing to see suggestions</p>
      <Combobox
        label="Stillingstittel"
        disableStaticFiltering
        matchTextSegments
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

export const CustomMatchAlgorithm = () => {
  const [value, setValue] = React.useState('');

  function highlightValueMatch(optionValue: string) {
    return [...optionValue].map((letter, i) => {
      if ([...value.toLowerCase()].includes(letter.toLowerCase())) {
        return (
          <span
            data-combobox-text-match
            key={`${optionValue}-bold-letter-${letter}-${i}`}
            className="font-bold bg-blue-100 text-blue-800"
          >
            {letter}
          </span>
        );
      } else {
        return (
          <span key={`${optionValue}-letter-${letter}-${i}`}>{letter}</span>
        );
      }
    });
  }

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
        highlightValueMatch={highlightValueMatch}
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

export const AsyncFetch = () => {
  const [value, setValue] = React.useState('');
  const characters = useDebouncedSearch(value, 300);

  // Generic debouncer
  function useDebouncedSearch(query, delay) {
    const [characters, setCharacters] = React.useState([]);

    React.useEffect(() => {
      if (!query.length) setCharacters([]);

      const handler = setTimeout(() => {
        fetch('https://swapi.dev/api/people/?search=' + query.trim())
          .then((res) => res.json())
          .then((res) => {
            console.log('Results from API', query);
            setCharacters(res.results.map((c) => ({ value: c.name })));
          });
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [delay, query]);

    return characters;
  }

  return (
    <Combobox
      label="Star Wars character"
      disableStaticFiltering
      matchTextSegments
      openOnFocus
      value={value}
      onChange={(val) => {
        setValue(val);
      }}
      onSelect={(val) => {
        setValue(val);
        action('select')(val);
      }}
      options={characters}
    >
      <Affix
        suffix
        clear
        aria-label="Clear text"
        onClick={() => {
          setValue('');
        }}
      />
    </Combobox>
  );
};

export const Optional = () => {
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
        optional
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

export const Feedback = () => {
  return (
    <Combobox
      label="Star Wars character"
      disableStaticFiltering
      matchTextSegments
      openOnFocus
      value="asd"
      feedback="Søker..."
      onChange={(val) => console.log('change')}
      options={[
        { value: 'Product manager' },
        { value: 'Produktledelse' },
        { value: 'Prosessoperatør' },
        { value: 'Prosjekteier' },
      ]}
    />
  );
};

export const AsyncFetchWithFeedback = () => {
  const [query, setQuery] = React.useState('');
  const [value, setValue] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const characters = useDebouncedSearch(query, 300);

  // Generic debouncer
  function useDebouncedSearch(query, delay) {
    const [characters, setCharacters] = React.useState([]);

    React.useEffect(() => {
      if (!query.length) { 
        setCharacters([]);
        return;
      }

      const handler = setTimeout(async () => {
        setFeedback('Søker...');
        try {
          const res = await fetch('https://swapi.dev/api/people/?search=' + query.trim())
          const { results } = await res.json();
          console.log('Results from API', query);
          setCharacters(results.map((c) => ({ value: c.name })));
          if (results.length) {
            setFeedback('');
          } else {
            setFeedback('Ingen treff');
          }
        } catch(err) {
          setFeedback('API Fail');
        }
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [delay, query]);

    return characters;
  }

  return (
    <Combobox
      label="Star Wars character"
      disableStaticFiltering
      matchTextSegments
      openOnFocus
      value={value}
      onChange={(val) => {
        setValue(val);
        setQuery(val);
      }}
      onSelect={(val) => {
        setValue(val);
        action('select')(val);
      }}
      onBlur={() => setFeedback('')}
      options={characters}
      feedback={feedback}
    >
      <Affix
        suffix
        clear
        aria-label="Clear text"
        onClick={() => {
          setValue('');
          setQuery('');
        }}
      />
    </Combobox>
  );
};
