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

export const Default = () => {
    return (
        <Tabs onChange={(e) => console.log(e)}>
            <Tab label="Tab 1" name="one" isActive />
            <Tab label="Tab 2" name="two" />
            <Tab label="Tab 3" name="three" />
        </Tabs>
    );
};

export const DefaultWithPanel = () => {
    const [tab, setTab] = React.useState('');
    return (
        <>
            <Tabs onChange={setTab}>
                <Tab label="Tab 1" name="one" isActive />
                <Tab label="Tab 2" name="two" />
                <Tab label="Tab 3" name="three" />
            </Tabs>
            <div className="mb-16">
                {(!tab || tab === 'one') && <p>Tab one selected!</p>}
                {tab === 'two' && <p>Tab two selected!</p>}
                {tab === 'three' && <p>Tab three selected!</p>}
            </div>
        </>
    );
};

export const Contained = () => {
    return (
        <Tabs contained>
            <Tab label="Tab 1" name="one" />
            <Tab label="Tab 2" name="two" isActive />
            <Tab label="Tab 3" name="three" />
        </Tabs>
    );
};

export const ContainedWithPanel = () => {
    const [tab, setTab] = React.useState('');
    return (
        <>
            <Tabs onChange={setTab} contained>
                <Tab label="Tab 1" name="one" />
                <Tab label="Tab 2" name="two" isActive />
                <Tab label="Tab 3" name="three" onClick={(e) => console.log(e)} />
            </Tabs>
            <div className="bg-aqua-50 p-24 last-child:mb-0">
                {(!tab || tab === 'one') && <p>Tab one selected!</p>}
                {tab === 'two' && <p>Tab two selected!</p>}
                {tab === 'three' && <p>Tab three selected!</p>}
            </div>
        </>
    );
};

export const Icon = () => {
    return (
        <Tabs>
            <Tab label="Tab 1" name="one" isActive>
                {svgicon}
            </Tab>
            <Tab label="Tab 2" name="two">
                {svgicon}
            </Tab>
            <Tab label="Tab 3" name="three">
                {svgicon}
            </Tab>
            <Tab label="Tab 4" name="four">
                {svgicon}
            </Tab>
        </Tabs>
    );
};

export const IconWithPanel = () => {
    const [tab, setTab] = React.useState('');
    return (
        <>
            <Tabs onChange={setTab}>
                <Tab label="Tab 1" name="one" isActive>
                    {svgicon}
                </Tab>
                <Tab label="Tab 2" name="two">
                    {svgicon}
                </Tab>
                <Tab label="Tab 3" name="three">
                    {svgicon}
                </Tab>
                <Tab label="Tab 4" name="four">
                    {svgicon}
                </Tab>
            </Tabs>
            <div className="mb-16">
                {(!tab || tab === 'one') && <p>Tab one selected!</p>}
                {tab === 'two' && <p>Tab two selected!</p>}
                {tab === 'three' && <p>Tab three selected!</p>}
                {tab === 'four' && <p>Tab four selected!</p>}
            </div>
        </>
    );
};

export const ContainedIconWithPanel = () => {
    const [tab, setTab] = React.useState('');
    return (
        <>
            <Tabs contained onChange={setTab}>
                <Tab label="Tab 1" name="one" isActive>
                    {svgicon}
                </Tab>
                <Tab label="Tab 2" name="two">
                    {svgicon}
                </Tab>
                <Tab label="Tab 3" name="three">
                    {svgicon}
                </Tab>
                <Tab label="Tab 4" name="four">
                    {svgicon}
                </Tab>
            </Tabs>
            <div className="bg-aqua-50 p-24 last-child:mb-0">
                {(!tab || tab === 'one') && <p>Tab one selected!</p>}
                {tab === 'two' && <p>Tab two selected!</p>}
                {tab === 'three' && <p>Tab three selected!</p>}
                {tab === 'four' && <p>Tab four selected!</p>}
            </div>
        </>
    );
};
