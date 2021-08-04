import React from 'react';
import { Combobox } from '../src';
import { action } from '@storybook/addon-actions';

const metadata = { title: 'Forms/Combobox' };
export default metadata;

export const Basic = () => (
    <>
        <p>Start typing to see suggestions</p>
        <Combobox
            label="Stillingstittel"
            onSelect={action('select')}
            options={[
                { value: 'Product manager' },
                { value: 'Produktledelse' },
                { value: 'Prosessoperatør' },
                { value: 'Prosjekteier' },
            ]}
        />
    </>
);

export const MatchTextSegments = () => (
    <>
        <p>Highlight text matches</p>
        <Combobox
            onSelect={action('select')}
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

export const OpenOnFocus = () => (
    <>
        <p>The comboboxlist opens when the input has focus</p>
        <Combobox
            openOnFocus
            onSelect={action('select')}
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

export const SelectOnClick = () => {
    return (
        <>
            <p>
                When the user clicks inside the text box the current value will
                be selected (like the URL bar in browsers).
            </p>
            <Combobox
                onSelect={action('select')}
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

export const PersistSelection = () => {
    const [_, setValue] = React.useState('');

    return (
        <>
            <p>
                When the list is opened, if an option's value matches the value
                in the input, it will automatically be highlighted and be the
                starting point for any keyboard navigation of the list.
            </p>
            <Combobox
                onSelect={setValue}
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

export const OptionText = () => {
    return (
        <Combobox
            label="Favorite fruit"
            placeholder="What's your favorite fruit?"
            onSelect={action('select')}
            options={[
                { value: 'Apple', label: '🍎 Apple' },
                { value: 'Banana', label: '🍌 Banana' },
                { value: 'Orange', label: '🍊 Orange' },
                { value: 'Pineapple', label: '🍍 Pineapple' },
            ]}
        />
    );
};

export const RefForwarding = () => {
    const ref = React.useRef<HTMLInputElement>(null);

    if (ref.current) {
        console.log(ref.current);
    }

    return (
        <>
            <p>Should log input element on change because of React ref</p>
            <Combobox
                ref={ref}
                onSelect={action('select')}
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
