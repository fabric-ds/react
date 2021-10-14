import React from 'react';
import { Button, TextArea, Card, Toggle, Combobox } from '@fabric-ds/react';

function useSWMatch(term) {
  const [characters, setCharacters] = React.useState([]);

  // @ts-ignore
  React.useEffect(() => {
    if (!term.trim()) return;
    let isFresh = true;

    fetch('https://swapi.dev/api/people/?search=' + term.trim())
      .then((res) => res.json())
      .then((res) => {
        if (!isFresh) return;
        setCharacters(res.results.map((c) => ({ value: c.name })));
      });

    return () => (isFresh = false);
  }, [term]);

  return characters;
}

export default function App() {
  const [selected, setSelected] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const characters = useSWMatch(searchTerm);

  return (
    <div className="m-10">
      <Toggle
        onChange={() => console.log('hi')}
        type="radio"
        options={[{ label: 'hi', value: 'test' }]}
        helpText="hi"
        invalid
      />
      <Combobox
        matchTextSegments
        label="Star Wars character"
        onChange={(val) => setSearchTerm(val)}
        onSelect={(val) => alert(val)}
        options={characters}
      />
      <Button
        className="mb-10"
        onClick={() => {
          console.log('click handler called');
        }}
      >
        Hi there
      </Button>
      <TextArea
        name="my-text"
        defaultValue="Stuff here"
        className="mb-10"
      ></TextArea>
      <div className="space-y-32 md:space-y-0 md:grid grid-cols-3 gap-32">
        <Card
          onClick={() => {
            setSelected(!selected);
            console.log('hello world');
          }}
          selected={selected}
        >
          <img
            className="h-128 w-full object-cover"
            src="https://source.unsplash.com/random/400x400"
            alt="Description"
          />
          <p className="absolute top-12 left-12 bg-aqua-200 text-aqua-900 p-4 rounded-4 text-12">
            Ukens bolig
          </p>
          <div className="p-16">
            <p className="text-12 text-gray-300">DNB Eiendom</p>
            <p>
              Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl.
              bl.a. vv/fyring.
            </p>
            <p className="text-14 text-gray-400 mb-4">Bøgata 25C, 0655 Oslo</p>
            <p className="font-bold my-8">
              52 m
              <span
                style={{
                  fontSize: 10,
                  verticalAlign: 'super',
                  marginRight: 5,
                }}
              >
                2
              </span>
              Totalpris: 4 869 039 kr
            </p>
            <p className="text-14 text-gray-400 mb-0">
              Eier (Selveier) <span className="text-gray-200">•</span> Leilighet
              <span className="text-gray-200">•</span> 2 soverom
            </p>
          </div>
        </Card>
        <Card onClick={() => setSelected(!selected)} selected={selected}>
          <img
            className="h-128 w-full object-cover"
            src="https://source.unsplash.com/random/403x403"
            alt="Description"
          />
          <div className="p-16">
            <p className="text-12 text-gray-300">DNB Eiendom</p>
            <p>
              Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl.
              bl.a. vv/fyring.
            </p>
            <p className="text-14 text-gray-400 mb-4">Bøgata 25C, 0655 Oslo</p>
            <p className="font-bold my-8">
              52 m
              <span
                style={{
                  fontSize: 10,
                  verticalAlign: 'super',
                  marginRight: 5,
                }}
              >
                2
              </span>
              Totalpris: 4 869 039 kr
            </p>
            <p className="text-14 text-gray-400 mb-0">
              Eier (Selveier) <span className="text-gray-200">•</span> Leilighet
              <span className="text-gray-200">•</span> 2 soverom
            </p>
          </div>
        </Card>
        <Card onClick={() => setSelected(!selected)} selected={selected}>
          <img
            className="h-128 w-full object-cover"
            src="https://source.unsplash.com/random/404x404"
            alt="Description"
          />
          <div className="p-16">
            <p className="text-12 text-gray-300">DNB Eiendom</p>
            <p>
              Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl.
              bl.a. vv/fyring.
            </p>
            <p className="text-14 text-gray-400 mb-4">Bøgata 25C, 0655 Oslo</p>
            <p className="font-bold my-8">
              52 m
              <span
                style={{
                  fontSize: 10,
                  verticalAlign: 'super',
                  marginRight: 5,
                }}
              >
                2
              </span>
              Totalpris: 4 869 039 kr
            </p>
            <p className="text-14 text-gray-400 mb-0">
              Eier (Selveier) <span className="text-gray-200">•</span> Leilighet
              <span className="text-gray-200">•</span> 2 soverom
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
