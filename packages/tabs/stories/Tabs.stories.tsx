import * as React from 'react';
import { Tab, Tabs } from '../src';

const metadata = { title: 'Navigation/Tabs' };
export default metadata;

const svgicon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 32 32"
        style={{ verticalAlign: 'sub' }}
    >
        <g fill="none" fillRule="evenodd">
            <path d="M0 0h32v32H0z" />
            <path
                fill="currentColor"
                fillRule="nonzero"
                d="M17 15V4h-2v11H4v2h11v11h2V17h11v-2z"
            />
        </g>
    </svg>
);

const longText = () =>
    'some text are very long and some are not, angry, very much so some text are very long and some are not, angry, very much so some text are very long and some are not, angry, very much so some text are very long and some are not, angry, very much so';

export const Plain = () => {
    return (
        <Tabs>
            <Tab title="Tab 1">Content 1</Tab>
            <Tab title="Tab 2">Content 2</Tab>
            <Tab title="Tab 3">Content 3</Tab>
        </Tabs>
    );
};

export const LongTitles = () => {
    return (
        <Tabs>
            <Tab title="Very Long Tab 1">Content 1</Tab>
            <Tab title="Tab 2 with another long">Content 2</Tab>
            <Tab title="Tab 3">Content 3</Tab>
            <Tab title="Tab 3">Content 3</Tab>
        </Tabs>
    );
};

export const Rich = () => {
    return (
        <Tabs>
            <Tab title="Tab 1">
                <h1>Title 1</h1>
                <p>Content 1</p>
                <p>{longText()}</p>
            </Tab>
            <Tab title="Tab 2">
                <h1>Title 2</h1>
                <p>Content 2</p>
                <p>{longText()}</p>
            </Tab>
            <Tab title="Tab 3">
                <h1>Title 3</h1>
                <p>Content 3</p>
            </Tab>
            <Tab title="Tab 4">
                <h1>Title 4</h1>
                <p>Content 4</p>
                <p>{longText()}</p>
            </Tab>
            <Tab title="Tab 5">
                <h1>Title 5</h1>
                <p>Content 5</p>
            </Tab>
            <Tab title="Tab 6">
                <h1>Title 6</h1>
                <p>Content 6</p>
                <p>{longText()}</p>
            </Tab>
        </Tabs>
    );
};

export const Links = () => {
    return (
        <Tabs>
            <Tab title="Tab 1">Panel 1</Tab>
            <Tab
                title={
                    <a href="/external" target="_blank">
                        Tab 2 with link
                    </a>
                }
            >
                Panel 2
            </Tab>
        </Tabs>
    );
};

export const LinkAsFirstTab = () => {
    return (
        <Tabs>
            <Tab
                title={
                    <a href="/external" target="_blank">
                        Tab 1 with link
                    </a>
                }
            >
                Panel 1
            </Tab>
            <Tab title="Tab 2">
                <h1>Title 2</h1>
            </Tab>
        </Tabs>
    );
};

export const Centered = () => {
    return (
        <Tabs centered>
            <Tab title="Tab 1">
                <p>{longText()}</p>
            </Tab>
            <Tab title="Tab 2">
                <p>{longText()}</p>
            </Tab>
            <Tab title="Tab 3">
                <p>{longText()}</p>
            </Tab>
        </Tabs>
    );
};

export const Justified = () => {
    return (
        <Tabs justified>
            <Tab title="Tab 1">
                <p>{longText()}</p>
            </Tab>
            <Tab title="Tab 2">
                <p>{longText()}</p>
            </Tab>
            <Tab title="Tab 3">
                <p>{longText()}</p>
            </Tab>
        </Tabs>
    );
};
export const WithIcon = () => {
    return (
        <Tabs>
            <Tab title={<span>{svgicon} Tab 1</span>}>
                <h1>Title 1</h1>
                <p>Content 1</p>
            </Tab>
            <Tab title={<span>{svgicon} Tab 1</span>}>
                <h1>Title 2</h1>
                <p>Content 2</p>
            </Tab>
            <Tab title={<span>{svgicon} Tab 1</span>}>
                <h1>Title 3</h1>
                <p>Content 3</p>
            </Tab>
        </Tabs>
    );
};

export const WithIconAndCentered = () => {
    return (
        <Tabs centered>
            <Tab title={<span>{svgicon} Tab 1</span>}>
                <h1>Title 1</h1>
                <p>Content 1</p>
            </Tab>
            <Tab title={<span>{svgicon} Tab 1</span>}>
                <h1>Title 2</h1>
                <p>Content 2</p>
            </Tab>
            <Tab title={<span>{svgicon} Tab 1</span>}>
                <h1>Title 3</h1>
                <p>Content 3</p>
            </Tab>
        </Tabs>
    );
};
