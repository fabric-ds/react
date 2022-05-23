import * as React from 'react';
import { Slider } from '../src';

const metadata = { title: 'Forms/Slider' };
export default metadata;

export const Regular = () => {
  const [value, setValue] = React.useState(2_500_000);

  return (
    <div>
      <output>{value}</output>
      <Slider
        onChange={(value) => setValue(value)}
        value={value}
        min={1000}
        max={10_000_000}
        step={1000}
      />
    </div>
  );
};

export const Disabled = () => {
  const [value, setValue] = React.useState(625_000);
  return (
    <div>
      <output>{value}</output>
      <Slider
        onChange={(value) => setValue(value)}
        value={value}
        disabled
        min={1000}
        max={10_000_000}
        step={1000}
      />
    </div>
  );
};
