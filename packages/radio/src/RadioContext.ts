import * as React from 'react';

interface RadioGroupContext {
    ariaDescribedby?: string;
    defaultValue?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    required?: boolean;
    name?: string;
    value?: string;
}

export const RadioContext = React.createContext<RadioGroupContext>({});

export function useRadioProvider(): RadioGroupContext {
    return React.useContext(RadioContext);
}
