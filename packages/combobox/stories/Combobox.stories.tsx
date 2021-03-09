import * as React from 'react';
import { action } from '@storybook/addon-actions';

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
} from '../src';
import { TextField } from '../../textfield/src';

const metadata = { title: 'Forms/Combobox' };
export default metadata;

const ComboboxOptions = () => (
    <>
        <ComboboxOption value="Product owner" />
        <ComboboxOption value="Product manager" />
        <ComboboxOption value="Produktledelse" />
        <ComboboxOption value="Prosessoperatør" />
        <ComboboxOption value="Prosjekteier" />
    </>
);

export const Basic = () => (
    <>
        <p>Start typing to see suggestions</p>
        <Combobox onSelect={action('select')}>
            <ComboboxInput as={TextField} label="Stillingstittel" />
            <ComboboxPopover>
                <ComboboxList>
                    <ComboboxOptions />
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    </>
);

export const MatchTextSegments = () => (
    <>
        <p>Highlight text matches</p>
        <Combobox onSelect={action('select')} matchTextSegments>
            <ComboboxInput as={TextField} label="Stillingstittel" />
            <ComboboxPopover>
                <ComboboxList>
                    <ComboboxOptions />
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    </>
);

export const OpenOnFocus = () => (
    <>
        <p>The comboboxlist opens when the input has focus</p>
        <Combobox openOnFocus onSelect={action('select')}>
            <ComboboxInput as={TextField} label="Stillingstittel" />
            <ComboboxPopover>
                <ComboboxList>
                    <ComboboxOptions />
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    </>
);

export const AutocompleteFalse = () => {
    return (
        <>
            <p>
                autocomplete=false. The input's value won't change when
                navigating the items with the keyboard.
            </p>
            <Combobox openOnFocus onSelect={action('select')}>
                <ComboboxInput
                    as={TextField}
                    label="Stillingstittel"
                    autocomplete={false}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        <ComboboxOptions />
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </>
    );
};

export const SelectOnClick = () => {
    const [value, setValue] = React.useState('prod');
    return (
        <>
            <p>
                When the user clicks inside the text box the current value will
                be selected (like the URL bar in browsers).
            </p>
            <Combobox onSelect={action('select')}>
                <ComboboxInput
                    as={TextField}
                    label="Stillingstittel"
                    selectOnClick
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        <ComboboxOptions />
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </>
    );
};

export const PersistSelection = () => {
    const [value, setValue] = React.useState('');

    return (
        <>
            <p>
                When the list is opened, if an option's value matches the value
                in the input, it will automatically be highlighted and be the
                starting point for any keyboard navigation of the list.
            </p>
            <Combobox onSelect={setValue} openOnFocus>
                <ComboboxInput
                    as={TextField}
                    label="Stillingstittel"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <ComboboxPopover>
                    <ComboboxList persistSelection>
                        <ComboboxOptions />
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </>
    );
};

export const NoPortal = () => {
    return (
        <>
            <p>
                portal=false. The popover will not render inside of a portal,
                but in the same order as the React tree
            </p>
            <Combobox openOnFocus onSelect={action('select')}>
                <ComboboxInput as={TextField} label="Stillingstittel" />
                <ComboboxPopover portal={false}>
                    <ComboboxList>
                        <ComboboxOptions />
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </>
    );
};

export const OptionText = () => {
    return (
        <Combobox onSelect={action('select')}>
            <ComboboxInput as={TextField} label="Fruits" />
            <ComboboxPopover>
                <ComboboxList>
                    <ComboboxOption value="Apples">
                        <span aria-hidden>🍎</span>
                        <ComboboxOptionText />
                    </ComboboxOption>
                    <ComboboxOption value="Bananas">
                        <span aria-hidden>🍌</span>
                        <ComboboxOptionText />
                    </ComboboxOption>
                    <ComboboxOption value="Oranges">
                        <span aria-hidden>🍊</span>
                        <ComboboxOptionText />
                    </ComboboxOption>
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};

export const RenderAnything = () => {
    return (
        <>
            <p>With a button inside the popover</p>
            <Combobox onSelect={action('select')}>
                <ComboboxInput as={TextField} label="Stillingstittel" />
                <ComboboxPopover>
                    <ComboboxList>
                        <ComboboxOptions />
                    </ComboboxList>
                    <button onClick={action('click')}>Add new</button>
                </ComboboxPopover>
            </Combobox>
        </>
    );
};

export const RefForwarding = () => {
    const [value, setValue] = React.useState('');
    const ref = React.useRef<HTMLInputElement>(null);

    if (ref.current) {
        console.log(ref.current);
    }
    return (
        <>
            <p>Should log input element on change because of React ref</p>
            <Combobox onSelect={action('select')}>
                <ComboboxInput
                    ref={ref}
                    as={TextField}
                    label="Stillingstittel"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        <ComboboxOptions />
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </>
    );
};
