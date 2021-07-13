import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import styles from './PackageInfo.module.css';

const REPOSITORY_URL =
    'https://github.com/finn-no/fabric-react/tree/master/packages/';

// Assume that the name of the package minus common prefix is the folder name
const getRepoUrl = (packageData) => {
    const folderName = packageData.name.replace('@finn-no/fabric-react-', '');

    return REPOSITORY_URL + folderName;
};

type Props = {
    packageData: {
        version: string;
        name: string;
    };
    componentNames: Array<string>;
    defaultName?: string;
    css?: string;
};

export default function PackageInfo({
    packageData,
    componentNames,
    defaultName,
    css,
}: Props) {
    const repositoryUrl = getRepoUrl(packageData);

    return (
        <div className="overflow-x-auto my-32">
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <Th>version</Th>
                        <td>{packageData.version}</td>
                    </tr>
                    <tr>
                        <Th>install</Th>
                        <td>
                            <code className="prism-code">
                                npm install {packageData.name}
                            </code>
                        </td>
                    </tr>
                    <tr>
                        <Th>usage</Th>
                        <td>
                            <Import
                                packageData={packageData}
                                defaultName={defaultName}
                                componentNames={componentNames}
                                css={css}
                            />
                        </td>
                    </tr>
                    <tr>
                        <Th>source</Th>
                        <td>
                            <a
                                href={repositoryUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View repository
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const Th = (props) => (
    <th
        className="text-left pr-20 align-top font-normal"
        style={{ fontSize: '14px' }}
        {...props}
    />
);

const Import = ({ packageData, defaultName, componentNames, css }: Props) => {
    let code = '';
    if (componentNames && defaultName) {
        code = `import ${defaultName}, { ${componentNames.join(', ')} } from '${
            packageData.name
        }';`;
    } else if (componentNames) {
        code = `import { ${componentNames.join(', ')} } from '${
            packageData.name
        }';`;
    } else {
        code = `import ${defaultName} from '${packageData.name}';`;
    }

    if (css) {
        code += '\n';

        code += `import '${packageData.name}/${css}';`;
    }

    return (
        <Highlight
            {...defaultProps}
            code={code}
            language="javascript"
            theme={theme}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={className}
                    style={{
                        ...style,
                        backgroundColor: 'transparent',
                        margin: 0,
                    }}
                >
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span
                                    key={key}
                                    {...getTokenProps({ token, key })}
                                />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};
