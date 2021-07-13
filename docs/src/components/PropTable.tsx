import * as React from 'react';
import styles from './PropTable.module.css';

interface Prop {
    name: string;
    description: string;
    descriptionHtml: string;
    required: boolean;
    defaultValue?: {
        value?: string | number | boolean;
    };
    type: {
        name: string;
    };
}

type PropTableProps = {
    props: { [prop: string]: Prop };
};

export default function PropTable({ props }: PropTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(props).map((prop) => (
                        <tr key={prop.name}>
                            <td>
                                <Name prop={prop} />
                            </td>
                            <td>
                                <Type prop={prop} />
                            </td>
                            <td>
                                <DefaultValue prop={prop} />
                            </td>
                            <td
                                dangerouslySetInnerHTML={{
                                    __html: prop.descriptionHtml,
                                }}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const Name = ({ prop }: { prop: Prop }) => {
    let className = styles.name;

    if (prop.description.includes('@deprecated')) {
        className += ' line-through';
    }

    const name = <span className={className}>{prop.name}</span>;

    // Add asterix after the prop name if it is required
    if (prop.required) {
        return (
            <>
                {name}
                <span className="ml-4">*</span>
            </>
        );
    } else {
        return name;
    }
};

const DefaultValue = ({ prop }: { prop: Prop }) => {
    const defaultValue = prop.defaultValue;

    if (!defaultValue) return <span></span>;

    const value = defaultValue.value;

    if (!value) return <span>-</span>;

    // if we set the default value using tsdoc, then it comes out as a string,
    // so we check especially if the string val is 'false' or 'true'
    if (typeof value === 'string' && value !== 'false' && value !== 'true') {
        return <span className={styles.value}>"{value}"</span>;
    } else return <span className={styles.type}>{value.toString()}</span>;
};

const Type = ({ prop }: { prop: Prop }) => {
    const render = (propTypeType) => {
        const url = TYPE_URLS[propTypeType];

        let className = '';
        if (propTypeType.startsWith('"')) {
            className = styles.value;
        }

        if (url)
            return (
                <span className={className}>
                    <a href={url}>{propTypeType}</a>
                </span>
            );
        else {
            return <span className={className}>{propTypeType}</span>;
        }
    };

    const { name: propTypeType } = prop.type;

    // Check if it is a union type
    if (propTypeType.includes(' | ')) {
        const types = propTypeType.split(' | ');
        return (
            <>
                {types.map((type) => (
                    <span className="block whitespace-nowrap" key={type}>
                        <span className="mr-4">|</span>
                        {render(type)}
                    </span>
                ))}
            </>
        );
    } else {
        return render(propTypeType);
    }
};

const TYPE_URLS = {
    string: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String',
    number: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number',
    boolean:
        'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean',
    Date: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date',
    CSSProperties: 'https://reactjs.org/docs/dom-elements.html#style',
    ReactNode: 'https://reactjs.org/docs/rendering-elements.html',
    'RefObject<any>': 'https://reactjs.org/docs/refs-and-the-dom.html',
};
