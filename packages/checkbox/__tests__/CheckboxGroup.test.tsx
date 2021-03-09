import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Checkbox, CheckboxGroup } from '../src';

const CheckboxGroupTemplate = (props) => (
    <CheckboxGroup label="label" {...props}>
        <Checkbox label="Blue" />
        <Checkbox label="Red" />
        <Checkbox label="Green" />
    </CheckboxGroup>
);

describe('CheckboxGroup', () => {
    test('logs warning if unlabeled', () => {
        console.warn = jest.fn();
        render(<CheckboxGroupTemplate label={undefined} />);
        expect(console.warn).toHaveBeenCalled();
    });

    test('supports labeling (label)', () => {
        const labelText = 'labelText';
        const tree = render(<CheckboxGroupTemplate label={labelText} />);

        const group = tree.getByLabelText(labelText);
        expect(group).toHaveAttribute('role', 'group');
    });

    test('supports labeling (aria-label)', () => {
        const labelText = 'labelText';
        const tree = render(
            <CheckboxGroupTemplate label={undefined} aria-label={labelText} />,
        );

        const group = tree.getByRole('group');

        expect(group).toHaveAttribute('aria-label', labelText);
    });

    test('supports labeling (aria-labelledby)', () => {
        const labelId = 'labelId';
        const tree = render(
            <CheckboxGroupTemplate
                label={undefined}
                aria-labelledby={labelId}
            />,
        );

        const group = tree.getByRole('group');

        expect(group).toHaveAttribute('aria-labelledby', labelId);
    });

    test('will only render id if provided explicitly', () => {
        let tree = render(<CheckboxGroupTemplate />);

        expect(tree.getByRole('group')).not.toHaveAttribute('id');

        const groupId = 'group-id';
        tree.rerender(<CheckboxGroupTemplate id={groupId} />);

        expect(tree.getByRole('group')).toHaveAttribute('id', groupId);
    });

    test('supports help text', () => {
        const tree = render(<CheckboxGroupTemplate helpText="help" />);

        const helpId = tree.getByText('help').id;

        tree.getAllByRole('checkbox').forEach((checkbox) =>
            expect(checkbox).toHaveAttribute('aria-describedby', helpId),
        );

        // for the help text to be accessible it should be set on every radio item, no the radio group itself
        expect(tree.getByRole('group')).not.toHaveAttribute('aria-describedby');
    });

    test('supports error with help text', () => {
        const tree = render(<CheckboxGroupTemplate error helpText="help" />);

        const helpId = tree.getByRole('alert').id;

        const group = tree.getByRole('group');

        expect(group).toHaveAttribute('aria-invalid', 'true');
        expect(group).toHaveAttribute('aria-errormessage', helpId);
        // for the help text to be accessible it should be set on every checkbox, not the group itself
        expect(group).not.toHaveAttribute('aria-describedby');

        const checkboxes = tree.getAllByRole('checkbox');

        checkboxes.forEach((checkbox) => {
            expect(checkbox).toHaveAttribute('aria-describedby', helpId);
            expect(checkbox).not.toHaveAttribute('aria-errormessage');
            expect(checkbox).not.toHaveAttribute('aria-invalid');
        });
    });

    test('supports error without help text', () => {
        const tree = render(<CheckboxGroupTemplate error />);

        const group = tree.getByRole('group');

        expect(group).toHaveAttribute('aria-invalid', 'true');
        expect(group).not.toHaveAttribute('aria-describedby');
        expect(group).not.toHaveAttribute('aria-errormessage');

        const checkboxes = tree.getAllByRole('checkbox');

        checkboxes.forEach((checkbox) => {
            expect(checkbox).not.toHaveAttribute('aria-describedby');
            expect(checkbox).not.toHaveAttribute('aria-errormessage');
            expect(checkbox).not.toHaveAttribute('aria-invalid');
        });
    });

    test('fires onChange events', () => {
        const handleChange = jest.fn();

        const tree = render(<CheckboxGroupTemplate onChange={handleChange} />);

        fireEvent.click(tree.getAllByRole('checkbox')[0]);
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
