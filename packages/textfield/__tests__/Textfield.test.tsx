import * as React from 'react';
import { render } from '@testing-library/react';
import { TextField } from '../src';

describe('TextField', () => {
    test('renders with placeholder text', () => {
        const placeholder = 'placeholder';
        const tree = render(
            <TextField aria-label="label" placeholder={placeholder} />,
        );
        const input = tree.getByPlaceholderText(placeholder);
        expect(input).toBeTruthy();
        // @ts-ignore
        expect(input.placeholder).toBe(placeholder);
    });

    test('supports required prop', () => {
        const tree = render(<TextField aria-label="label" required />);

        expect(tree.queryByLabelText('label')).toBeRequired();
    });

    test('supports disabled prop', () => {
        const tree = render(<TextField aria-label="label" disabled />);

        expect(tree.queryByLabelText('label')).toBeDisabled();
        expect(tree.container.firstChild).toHaveClass('input--is-disabled');
    });

    test('supports readOnly prop', () => {
        const tree = render(<TextField aria-label="label" readOnly />);

        expect(tree.queryByLabelText('label')).toHaveAttribute('readOnly');
        expect(tree.container.firstChild).toHaveClass('input--is-read-only');
    });

    test('forwards ref to the input element', () => {
        let ref = React.createRef<HTMLInputElement>();

        const tree = render(<TextField aria-label="label" ref={ref} />);

        expect(tree.queryByRole('textbox')).toEqual(ref.current);
    });

    test('logs warning if unlabeled', () => {
        console.warn = jest.fn();
        render(<TextField />);
        expect(console.warn).toHaveBeenCalled();
    });

    test('supports labeling', () => {
        const labelText = 'labelText';
        const tree = render(<TextField label={labelText} />);

        const label = tree.getByText(labelText);
        const input = tree.getByLabelText(labelText);

        expect(label).toHaveAttribute('for', input.id);
    });

    test('supports help text', () => {
        const tree = render(<TextField label="label" helpText="help" />);

        const input = tree.getByLabelText('label');
        const helpText = tree.getByText('help');

        const helpId = helpText.id;

        expect(helpId).toBeDefined();

        expect(input).toHaveAttribute('aria-describedby', helpId);
    });

    test('supports error with help text', () => {
        const tree = render(
            <TextField label="label" error helpText="invalid" />,
        );

        const input = tree.getByLabelText('label');
        const errorText = tree.getByRole('alert');

        const errorId = errorText.id;

        expect(errorId).toBeDefined();

        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAttribute('aria-describedby', errorId);
        expect(input).toHaveAttribute('aria-errormessage', errorId);
    });

    test('supports error without help text', () => {
        const tree = render(<TextField label="label" error />);

        const input = tree.getByLabelText('label');

        expect(input).toHaveAttribute('aria-invalid', 'true');
    });
});
