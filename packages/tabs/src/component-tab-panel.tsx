import React from 'react';
import { tab as c } from '@finn-no/fabric-component-classes';
import type { TabPanelProps } from './props';

export function TabPanel(props: TabPanelProps) {
    const {
        children,
        name,
        ...attrs
    } = props;

    return (
        <div
            tabIndex={-1}
            {...attrs}
            role="tabpanel"
            aria-labelledby={`fabric-tab-${name}`}
            id={`fabric-tabpanel-${name}`}
            hidden={!document.getElementById(`fabric-tab-${name}`)?.classList?.contains(c.tabActive)}
        >
            {children}
        </div>
    );
}
