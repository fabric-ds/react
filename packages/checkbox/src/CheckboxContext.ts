import * as React from 'react';

interface CheckboxGroupContext {
    ariaDescribedby?: string;
    defaultValue?: string[];
    disabled?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    value?: string[];
}

export const CheckboxContext = React.createContext<CheckboxGroupContext>({});

export function useCheckboxProvider(): CheckboxGroupContext {
    return React.useContext(CheckboxContext);
}
