import { render } from '@testing-library/react';
import * as React from 'react';
import { Tab, Tabs } from '../src';
import { runAxe } from '../../../test/test-helpers';

test('should render component with 3 tabs', () => {
    expect(
        render(
            <Tabs>
                <Tab title="Tab 1">Content 1</Tab>
                <Tab title="Tab 2">Content 2</Tab>
                <Tab title="Tab 3">Content 3</Tab>
            </Tabs>,
        ).container.firstChild,
    ).toMatchSnapshot();
});

test('centered', () => {
    expect(
        render(
            <Tabs centered>
                <Tab title="Tab 1">Content 1</Tab>
                <Tab title="Tab 2">Content 2</Tab>
                <Tab title="Tab 3">Content 3</Tab>
            </Tabs>,
        ).container.firstChild,
    ).toMatchSnapshot();
});

test('should set tab 3 as active', () => {
    expect(
        render(
            <Tabs centered defaultIndex={2}>
                <Tab title="Tab 1">Content 1</Tab>
                <Tab title="Tab 2">Content 2</Tab>
                <Tab title="Tab 3">Content 3</Tab>
            </Tabs>,
        ).container.firstChild,
    ).toMatchSnapshot();
});

test('should be accessible', async () => {
    await runAxe(
        <Tabs>
            <Tab title="Tab 1">Content 1</Tab>
            <Tab title="Tab 2">Content 2</Tab>
            <Tab title="Tab 3">Content 3</Tab>
        </Tabs>,
    );
});
