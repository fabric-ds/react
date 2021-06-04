import * as React from 'react';
import { Breadcrumbs } from '../src';

const metadata = { title: 'Navigation/Breadcrumbs' };
export default metadata;

export const Example = () => (
    <Breadcrumbs>
        <a href="#/url1">Item 1</a>
        <a href="#/url2">Item 2</a>
        <a href="#/url3">Item 3</a>
    </Breadcrumbs>
);
