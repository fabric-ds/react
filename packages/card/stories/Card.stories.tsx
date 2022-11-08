import React, { useState } from 'react';
import { Clickable, DeadToggle } from '../../_helpers';
import { Card } from '../src';

const metadata = { title: 'Navigation/Card' };
export default metadata;

export const SingleCard = () => {
  return (
    <div className="space-y-32 md:space-y-0 md:grid grid-cols-3 gap-32 my-20">
      <Card>
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
    </div>
  );
};

export const SelectableCard = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div className="space-y-32 md:space-y-0 md:grid grid-cols-3 gap-32 my-20">
      <Card selected={selected}>
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
            <Clickable checkbox onClick={() => setSelected(!selected)}>
              Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl.
              bl.a. vv/fyring.
            </Clickable>
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
  );
};

export const GridCards = () => {
  return (
    <div className="space-y-32 md:space-y-0 md:grid grid-cols-3 gap-32 my-20">
      <Card>
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
      <Card>
        <img
          className="h-128 w-full object-cover"
          src="https://source.unsplash.com/random/402x402"
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
      <Card>
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
  );
};

export const AnchorCard = () => {
  return (
    <Card>
      <div aria-owns="title_id"></div>
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
        <h3 className="text-16 font-normal text-gray-800" id="title_id">
          <Clickable
            href="//finn.no"
            target="_blank"
            title="Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl. bl.a. vv/fyring."
            className="text-current hover:no-underline focus:no-underline"
          >
            Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl.
            bl.a. vv/fyring.
          </Clickable>
        </h3>
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
  );
};

export const TogglesInCard = () => {
  const [checked, setChecked] = React.useState(false);
  const [selected, setSelected] = React.useState('');

  return (
    <div>
      <Card selected={checked} className="mt-32 w-max p-24 flex items-center">
        <DeadToggle checkbox checked={checked} className="-mt-8" />
        <Clickable
          checkbox
          labelClassName="ml-12"
          onClick={() => setChecked(!checked)}
        >
          Checkbox in a card
        </Clickable>
      </Card>

      <div className="flex gap-32 mt-32">
        <Card selected={selected === 'a'} className="p-24 flex items-center">
          <DeadToggle radio checked={selected === 'a'} className="-mt-8" />
          <Clickable
            radio
            name="gfhjdkh4"
            labelClassName="ml-12"
            onClick={() => setSelected('a')}
          >
            Radio in a card - A
          </Clickable>
        </Card>
        <Card selected={selected === 'b'} className="p-24 flex items-center">
          <DeadToggle radio checked={selected === 'b'} className="-mt-8" />
          <Clickable
            radio
            name="gfhjdkh4"
            labelClassName="ml-12"
            onClick={() => setSelected('b')}
          >
            Radio in a card - B
          </Clickable>
        </Card>
      </div>
    </div>
  );
};

export const DeadToggleInCard = () => {
  const [selected, setSelected] = React.useState('');

  return (
    <div className="flex">
      <Card
        flat
        className="py-12 px-16 w-max flex items-center"
        selected={selected === 'a'}
      >
        <DeadToggle radio checked={selected === 'a'} className="-mt-6" />
        <div className="ml-16">
          <h4 className="mb-0">
            <Clickable radio name="purchase" onClick={() => setSelected('a')}>
              Purchase foo
            </Clickable>
          </h4>
          <p className="mb-0 text-14">520 kr/mnd</p>
        </div>
      </Card>
      <Card
        flat
        className="py-12 px-16 w-max ml-20 flex items-center"
        selected={selected === 'b'}
      >
        <DeadToggle radio checked={selected === 'b'} className="-mt-6" />
        <div className="ml-16">
          <h4 className="mb-0">
            <Clickable radio name="purchase" onClick={() => setSelected('b')}>
              Purchase bar
            </Clickable>
          </h4>
          <p className="mb-0 text-14">124 kr/mnd</p>
        </div>
      </Card>
    </div>
  );
};
