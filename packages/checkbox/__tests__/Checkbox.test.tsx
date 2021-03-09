import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Checkbox } from '../src';

describe('Checkbox', () => {
    test('supports disabled prop', () => {
        const tree = render(<Checkbox label="label" disabled />);

        const checkbox = tree.queryByRole('checkbox');
        expect(checkbox).toBeDisabled();
        expect(checkbox.parentElement).toHaveClass('input-toggle--is-disabled');
    });

    test('supports custom CSS class', () => {
        const { container } = render(
            <Checkbox label="class" className="extra-class" />,
        );
        expect(container.firstChild).toHaveClass('extra-class');
    });

    test('supports help text', () => {
        const tree = render(<Checkbox label="label" helpText="help" />);

        const helpId = tree.getByText('help').id;

        expect(helpId).toBeDefined();

        expect(tree.getByRole('checkbox')).toHaveAttribute(
            'aria-describedby',
            helpId,
        );
    });

    test('supports error with help text', () => {
        const tree = render(<Checkbox label="label" error helpText="help" />);

        const help = tree.getByRole('alert');
        const helpId = help.id;
        expect(helpId).toBeDefined();

        const checkbox = tree.getByRole('checkbox');

        expect(checkbox).toHaveAttribute('aria-invalid', 'true');
        expect(checkbox).toHaveAttribute('aria-errormessage', helpId);
        expect(checkbox).toHaveAttribute('aria-describedby');
    });

    test('fires onChange events', () => {
        const handleChange = jest.fn();

        const tree = render(<Checkbox label="label" onChange={handleChange} />);

        fireEvent.click(tree.getByRole('checkbox'));
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('forwards ref to the input element', () => {
        let ref = React.createRef<HTMLInputElement>();

        const tree = render(<Checkbox label="label" ref={ref} />);

        expect(tree.queryByRole('checkbox')).toEqual(ref.current);
    });
});
