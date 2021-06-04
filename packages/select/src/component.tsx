import * as React from 'react';
import { useId } from '@finn-no/fabric-react-utils';
import { classNames } from '@chbphone55/classnames';
import type { SelectProps } from './props';

const setup = (props) => {
    const { className, invalid, id, hint, always, label, style, ...rest } =
        props;

    const helpId = hint ? `${id}__hint` : undefined;

    return {
        attrs: {
            div: {
                style,
            },
            label: {
                htmlFor: id,
                children: label,
            },
            select: {
                ...rest,
                'aria-describedby': helpId,
                'aria-errormessage': invalid && helpId ? helpId : undefined,
                'aria-invalid': invalid,
                id,
            },
            help:
                always || invalid
                    ? {
                          children: hint,
                          id: helpId,
                      }
                    : null,
        },
        classes: classNames(
            'input mb-0',
            {
                'input--is-invalid': invalid,
            },
            className,
        ),
    };
};

function Select(props: SelectProps, ref: React.Ref<HTMLSelectElement>) {
    const id = useId(props.id);
    const { attrs, classes } = setup({ ...props, id });
    const { div, label, select, help } = attrs;

    return (
        <div className={classes} {...div}>
            {label.children && <label {...label} />}
            <div className="input--select__wrap">
                <select ref={ref} {...select} />
            </div>
            {help && <div className="input__sub-text" {...help} />}
        </div>
    );
}

const _Select = React.forwardRef(Select);
export { _Select as Select };
