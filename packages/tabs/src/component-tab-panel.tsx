import React from 'react';
import { tab as c } from '@fabric-ds/component-classes';
import type { TabPanelProps } from './props';

export function TabPanel(props: TabPanelProps) {
  const { children, name, hidden, ...rest } = props;

  return (
    <div
      tabIndex={-1}
      {...rest}
      role="tabpanel"
      aria-labelledby={`fabric-tab-${name}`}
      id={`fabric-tabpanel-${name}`}
      hidden={
        hidden === undefined && typeof document === 'object'
          ? !document
              ?.getElementById(`fabric-tab-${name}`)
              ?.classList?.contains(c.tabActive)
          : hidden
      }
    >
      {children}
    </div>
  );
}
