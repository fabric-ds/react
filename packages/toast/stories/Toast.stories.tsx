import * as React from 'react';
import { ToastContainer, Toast, useToast } from '../src';
import { Button } from '../../button/src';
import { Toggle } from '../../toggle/src';

const metadata = { title: 'Overlays/Toast' };
export default metadata;

export const Success = () => <Toast type="success" text="Hello" />;

export const Warning = () => <Toast type="warning" text="Oopsie" />;

export const Error = () => <Toast type="error" text="Bad!" />;

export const Info = () => <Toast type="info" text="Eh" />;

const App = () => {
    const { toast } = useToast();

    const [type, setType] = React.useState('success');
    const [canClose, setCanClose] = React.useState(true);

    const createToast = () => {
        toast("Hi! I'm an example default toast!", {
            type,
            canClose,
        });
    };

    return (
        <>
            <Toggle
                title="Toast type"
                type="radio"
                onChange={(v) => setType(v.value)}
                defaultSelected={[{ label: 'Success', value: 'success' }]}
                options={[
                    { label: 'Success', value: 'success' },
                    { label: 'Error', value: 'error' },
                    { label: 'Warning', value: 'warning' },
                    { label: 'Info', value: 'info' },
                ]}
            />
            <Toggle
                className="mt-8"
                type="checkbox"
                onChange={(v) => setCanClose(v)}
                checked={canClose}
                label="Can be dismissed?"
            />
            <Button className="mt-10" onClick={createToast}>
                Create toast
            </Button>
        </>
    );
};

export const ProgrammaticToasting = ({ children }) => {
    return (
        <ToastContainer>
            <App />
        </ToastContainer>
    );
};
