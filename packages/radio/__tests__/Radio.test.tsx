import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { Radio, RadioGroup } from '../src';

const RadioGroupTemplate = (props) => (
    <RadioGroup label="Color" {...props}>
        <Radio value="g" label="Green" />
        <Radio value="b" label="Blue" />
        <Radio value="r" label="Red" />
    </RadioGroup>
);

describe('Radio', () => {
    test('logs warning if unlabeled', () => {
        console.warn = jest.fn();
        render(<RadioGroupTemplate label={undefined} />);
        expect(console.warn).toHaveBeenCalled();
    });

    test('supports custom name', () => {
        const name = 'test-name';
        const tree = render(<RadioGroupTemplate name={name} />);

        tree.getAllByRole('radio').forEach((radio) =>
            expect(radio).toHaveAttribute('name', name),
        );
        expect(tree.getByRole('radiogroup')).not.toHaveAttribute('name');
    });

    test('supports labeling (label)', () => {
        const labelText = 'labelText';
        const tree = render(<RadioGroupTemplate label={labelText} />);

        const radioGroup = tree.getByLabelText(labelText);
        expect(radioGroup).toHaveAttribute('role', 'radiogroup');
    });

    test('supports labeling (aria-label)', () => {
        const labelText = 'labelText';
        const tree = render(
            <RadioGroupTemplate label={undefined} aria-label={labelText} />,
        );

        const radioGroup = tree.getByRole('radiogroup');

        expect(radioGroup).toHaveAttribute('aria-label', labelText);
    });

    test('supports labeling (aria-labelledby)', () => {
        const labelId = 'labelId';
        const tree = render(
            <RadioGroupTemplate label={undefined} aria-labelledby={labelId} />,
        );

        const radioGroup = tree.getByRole('radiogroup');

        expect(radioGroup).toHaveAttribute('aria-labelledby', labelId);
    });

    test('will only render id if provided explicitly', () => {
        let tree = render(<RadioGroupTemplate />);

        expect(tree.getByRole('radiogroup')).not.toHaveAttribute('id');

        const groupId = 'group-id';
        tree.rerender(<RadioGroupTemplate id={groupId} />);

        expect(tree.getByRole('radiogroup')).toHaveAttribute('id', groupId);
    });

    test('supports help text', () => {
        const tree = render(<RadioGroupTemplate helpText="help" />);

        const helpId = tree.getByText('help').id;

        tree.getAllByRole('radio').forEach((radio) =>
            expect(radio).toHaveAttribute('aria-describedby', helpId),
        );

        // for the help text to be accessible it should be set on every radio item, no the radio group itself
        expect(tree.getByRole('radiogroup')).not.toHaveAttribute(
            'aria-describedby',
        );
    });

    test('supports error with help text', () => {
        const tree = render(<RadioGroupTemplate error helpText="help" />);

        const helpId = tree.getByRole('alert').id;

        const radioGroup = tree.getByRole('radiogroup');

        expect(radioGroup).toHaveAttribute('aria-invalid', 'true');
        expect(radioGroup).toHaveAttribute('aria-errormessage', helpId);
        // for the help text to be accessible it should be set on every radio item, no the radio group itself
        expect(radioGroup).not.toHaveAttribute('aria-describedby');

        const radios = tree.getAllByRole('radio');

        radios.forEach((radio) => {
            expect(radio).toHaveAttribute('aria-describedby', helpId);
            expect(radio).not.toHaveAttribute('aria-errormessage');
            expect(radio).not.toHaveAttribute('aria-invalid');
        });
    });

    test('supports error without help text', () => {
        const tree = render(<RadioGroupTemplate error />);

        const radioGroup = tree.getByRole('radiogroup');

        expect(radioGroup).toHaveAttribute('aria-invalid', 'true');
        expect(radioGroup).not.toHaveAttribute('aria-describedby');
        expect(radioGroup).not.toHaveAttribute('aria-errormessage');

        const radios = tree.getAllByRole('radio');

        radios.forEach((radio) => {
            expect(radio).not.toHaveAttribute('aria-describedby');
            expect(radio).not.toHaveAttribute('aria-errormessage');
            expect(radio).not.toHaveAttribute('aria-invalid');
        });
    });

    test('supports disabling radio items', () => {
        const tree = render(
            <RadioGroup>
                <Radio value="e" label="Enabled" />
                <Radio disabled value="d" label="Disabled" />
            </RadioGroup>,
        );

        expect(tree.getByLabelText('Disabled')).toBeDisabled();
        expect(tree.getByLabelText('Enabled')).not.toBeDisabled();
    });

    test('supports disabling radio group', () => {
        const tree = render(<RadioGroupTemplate disabled />);

        const radios = tree.getAllByRole('radio');

        radios.forEach((radio) => expect(radio).toBeDisabled());
    });

    test('fires onChange events', () => {
        const handleChange = jest.fn();

        const tree = render(<RadioGroupTemplate onChange={handleChange} />);

        fireEvent.click(tree.getAllByRole('radio')[0]);
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('forwards ref to the input element', () => {
        let ref = React.createRef<HTMLInputElement>();

        const tree = render(
            <RadioGroup aria-label="label">
                <Radio value="r" label="label" ref={ref} />
            </RadioGroup>,
        );

        expect(tree.queryByRole('radio')).toEqual(ref.current);
    });
});
