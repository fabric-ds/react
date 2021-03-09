import * as React from 'react';
import { action } from '@storybook/addon-actions';
import {
    Checkbox as FabricCheckbox,
    CheckboxGroup as FabricCheckboxGroup,
} from '../src';

const metadata = { title: 'Forms/Checkbox/CheckboxGroup' };
export default metadata;

const CheckboxGroup = (props) => {
    const [values, setValues] = React.useState<string[]>(props.value || []);
    return (
        <FabricCheckboxGroup
            value={values}
            label="Favorite colours"
            onChange={(values) => {
                setValues(values);
                action('change')(values);
            }}
            {...props}
        >
            <FabricCheckbox value="r">Red</FabricCheckbox>
            <FabricCheckbox value="b">Blue</FabricCheckbox>
            <FabricCheckbox value="g">Green</FabricCheckbox>
        </FabricCheckboxGroup>
    );
};

export const standard = () => <CheckboxGroup />;

export const valueControlled = () => <CheckboxGroup value={['b', 'g']} />;

export const valueUncontrolled = () => (
    <CheckboxGroup defaultValue={['b', 'g']} value={undefined} />
);

export const helpText = () => (
    <CheckboxGroup helpText="Skip this if you're color blind" />
);

export const invalid = () => (
    <CheckboxGroup invalid helpText="You must select at least one" />
);

export const disabled = () => <CheckboxGroup disabled />;
