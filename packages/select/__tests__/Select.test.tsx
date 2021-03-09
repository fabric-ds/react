import * as React from 'react';
import { render } from '@testing-library/react';
import { Select } from '../src';

describe('Select', () => {
    test('supports required prop', () => {
        const tree = render(<Select aria-label="label" required />);

        expect(tree.queryByLabelText('label')).toBeRequired();
    });

    test('supports disabled prop', () => {
        const tree = render(<Select aria-label="label" disabled />);

        expect(tree.queryByLabelText('label')).toBeDisabled();
        expect(tree.container.firstChild).toHaveClass('input--is-disabled');
    });

    test('forwards ref to the select element', () => {
        let ref = React.createRef<HTMLSelectElement>();

        const tree = render(<Select aria-label="label" ref={ref} />);

        expect(tree.queryByRole('combobox')).toEqual(ref.current);
    });

    test('logs warning if unlabeled', () => {
        console.warn = jest.fn();
        render(<Select />);
        expect(console.warn).toHaveBeenCalled();
    });

    test('supports labeling', () => {
        const labelText = 'labelText';
        const tree = render(<Select label={labelText} />);

        const label = tree.getByText(labelText);
        const input = tree.getByLabelText(labelText);

        expect(label).toHaveAttribute('for', input.id);
    });

    test('supports help text', () => {
        const tree = render(<Select label="label" helpText="help" />);

        const input = tree.getByLabelText('label');
        const helpText = tree.getByText('help');

        const helpId = helpText.id;

        expect(helpId).toBeDefined();

        expect(input).toHaveAttribute('aria-describedby', helpId);
    });

    test('supports error with help text', () => {
        const tree = render(
            <Select label="label" invalid helpText="invalid" />,
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
        const tree = render(<Select label="label" invalid />);

        const input = tree.getByLabelText('label');

        expect(input).toHaveAttribute('aria-invalid', 'true');
    });
});
