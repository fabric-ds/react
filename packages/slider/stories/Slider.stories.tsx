import * as React from 'react';
import { scaleQuantize } from 'd3-scale';
import { RangeSlider, RegularSlider } from '../src';

const metadata = { title: 'Forms/Slider' };
export default metadata;

export const Regular = () => {
    const [value, setValue] = React.useState(0);
    const [output, setOutput] = React.useState(value);
    return (
        <div>
            <output>{output}</output>
            <RegularSlider
                onChange={(value) => setValue(value)}
                onInput={setOutput}
                min={0}
                max={100}
                step={10}
                value={value}
            />
        </div>
    );
};

export const RegularDisabled = () => {
    return (
        <div>
            <output>50</output>
            <RegularSlider
                disabled
                onChange={() => {}}
                onInput={() => {}}
                min={0}
                max={100}
                step={10}
                value={50}
            />
        </div>
    );
};

export const RegularScaled = () => {
    const radiusScale = scaleQuantize().range([
        250,
        500,
        750,
        1000,
        1500,
        2000,
        3000,
        4000,
        5000,
        7000,
        10000,
        15000,
        20000,
        30000,
        60000,
        100000,
        150000,
        200000,
        250000,
        300000,
    ]);
    const [value, setValue] = React.useState(250);
    const [output, setOutput] = React.useState(value);
    return (
        <div>
            <output>
                {output >= 2000 ? Math.floor(output / 1000) : output}{' '}
                {output >= 2000 ? 'km' : 'm'}
            </output>
            <RegularSlider
                aria-label="Radius"
                onChange={(value) => setValue(value)}
                onInput={(value) => setOutput(value)}
                min={250}
                max={300000}
                scale={radiusScale}
                value={value}
            />
        </div>
    );
};

export const Ranged = () => {
    const [value, setValue] = React.useState<[number, number]>([
        1000000,
        10000000,
    ]);
    const [output, setOutput] = React.useState(value);
    return (
        <div>
            <output>
                {output[0]} - {output[1]} kr
            </output>
            <RangeSlider
                onChange={setValue}
                onInput={setOutput}
                min={1000000}
                max={10000000}
                step={50000}
                value={value}
            />
        </div>
    );
};

export const RangedDisabled = () => {
    return (
        <div>
            <output>
                {100000} - {1000000} kr
            </output>
            <RangeSlider
                disabled
                min={100000}
                max={1000000}
                step={50000}
                value={[350000, 550000]}
            />
        </div>
    );
};
