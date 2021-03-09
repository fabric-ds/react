import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { Radio, RadioGroup } from '../src';

const metadata = { title: 'Forms/RadioGroup' };
export default metadata;

export const standard = () => {
    return (
        <RadioGroup onChange={action('change')} label="Color">
            <Radio value="r">Red</Radio>
            <Radio value="g">Green</Radio>
            <Radio value="b">Blue</Radio>
        </RadioGroup>
    );
};

export const valueUncontrolled = () => {
    return (
        <RadioGroup onChange={action('change')} label="Color" defaultValue="g">
            <Radio value="r">Red</Radio>
            <Radio value="g">Green</Radio>
            <Radio value="b">Blue</Radio>
        </RadioGroup>
    );
};

export const ValueControlled = () => {
    const [value, setValue] = React.useState('r');
    return (
        <RadioGroup
            onChange={(value) => {
                setValue(value);
                action('change')(value);
            }}
            label="Color"
            value={value}
        >
            <Radio value="r">Red</Radio>
            <Radio value="g">Green</Radio>
            <Radio value="b">Blue</Radio>
        </RadioGroup>
    );
};

export const disabledRadioButton = () => (
    <RadioGroup label="Color" onChange={action('change')}>
        <Radio value="r">Red</Radio>
        <Radio value="g">Green</Radio>
        <Radio disabled value="b">
            Blue
        </Radio>
    </RadioGroup>
);

export const disabledRadioGroup = () => (
    <RadioGroup label="Color" disabled onChange={action('change')}>
        <Radio value="r">Red</Radio>
        <Radio value="g">Green</Radio>
        <Radio value="b">Blue</Radio>
    </RadioGroup>
);

export const withHelpText = () => (
    <RadioGroup
        onChange={action('change')}
        label="Color"
        helpText="You need to select a color option"
    >
        <Radio value="r">Red</Radio>
        <Radio value="g">Green</Radio>
        <Radio value="b">Blue</Radio>
    </RadioGroup>
);

export const invalid = () => (
    <RadioGroup
        onChange={action('change')}
        label="Color"
        invalid
        helpText="You need to select a color option"
    >
        <Radio value="r">Red</Radio>
        <Radio value="g">Green</Radio>
        <Radio value="b">Blue</Radio>
    </RadioGroup>
);
