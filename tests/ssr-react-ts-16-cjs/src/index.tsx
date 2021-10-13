import React from 'react';
import { Button, TextArea, Card } from '@fabric-ds/react';

export default function App() {
  const [selected, setSelected] = React.useState(false);

  return (
    <div className="m-10">
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
