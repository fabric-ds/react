import * as React from 'react';
import { Tab, TabPanel, Tabs } from '../src';

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
            <Tab label="Tab 1" name="one" />
            <Tab label="Tab 2" name="two" />
            <Tab label="Tab 3" name="three" isActive />
        </Tabs>
    );
};

export const DefaultWithPanel = () => {
    return (
        <>
            <Tabs>
                <Tab label="Tab 1" name="one" />
                <Tab label="Tab 2" name="two" />
                <Tab label="Tab 3" name="three" />
            </Tabs>
            <div className="mb-16">
                <TabPanel name="one">Tab one selected!</TabPanel>
                <TabPanel name="two">Tab two selected!</TabPanel>
                <TabPanel name="three">Tab three selected!</TabPanel>
            </div>
        </>
    );
};

export const DefaultWithExternalLinks = () => {
    return (
        <>
            <Tabs>
                <Tab label="Tab 1" name="one" />
                <Tab
                    label="Tab 2 (www.finn.no)"
                    name="two"
                    onClick={(e) => window.open('https://www.finn.no/', '_blank')}
                />
                <Tab
                    label="Tab 3 (www.schibsted.com without panel)"
                    name="three"
                    onClick={(e) => window.open('https://www.schibsted.com/', '_blank')}
                />
            </Tabs>
            <div className="mb-16">
                <TabPanel name="one">Tab one selected!</TabPanel>
                <TabPanel name="two">Tab two selected!</TabPanel>
            </div>
        </>
    );
};

export const Contained = () => {
    return (
        <Tabs contained active="two">
            <Tab label="Tab 1" name="one" />
            <Tab label="Tab 2" name="two" />
            <Tab label="Tab 3" name="three" />
        </Tabs>
    );
};

export const ContainedWithPanel = () => {
    return (
        <>
            <Tabs contained>
                <Tab label="Tab 1" name="one" />
                <Tab label="Tab 2" name="two" isActive />
                <Tab
                    label="Tab 3"
                    name="three"
                    onClick={(e) => console.log(e)}
                />
            </Tabs>
            <div className="bg-aqua-50 p-24 last-child:mb-0">
                <TabPanel name="one">Tab one selected!</TabPanel>
                <TabPanel name="two">Tab two selected!</TabPanel>
                <TabPanel name="three">Tab three selected!</TabPanel>
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

export const IconOvertop = () => {
    return (
        <Tabs>
            <Tab label="Tab 1" name="one" over isActive>
                {svgicon}
            </Tab>
            <Tab label="Tab 2" name="two" over>
                {svgicon}
            </Tab>
            <Tab label="Tab 3" name="three" over>
                {svgicon}
            </Tab>
            <Tab label="Tab 4" name="four" over>
                {svgicon}
            </Tab>
        </Tabs>
    );
};

export const IconWithPanel = () => {
    return (
        <>
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
            <div className="mb-16">
                <TabPanel name="one">Tab one selected!</TabPanel>
                <TabPanel name="two">Tab two selected!</TabPanel>
                <TabPanel name="three">Tab three selected!</TabPanel>
                <TabPanel name="four">Tab four selected!</TabPanel>
            </div>
        </>
    );
};

export const ContainedIconWithPanel = () => {
    return (
        <>
            <Tabs contained>
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
                <TabPanel name="one">Tab one selected!</TabPanel>
                <TabPanel name="two">Tab two selected!</TabPanel>
                <TabPanel name="three">Tab three selected!</TabPanel>
                <TabPanel name="four">Tab four selected!</TabPanel>
            </div>
        </>
    );
};
