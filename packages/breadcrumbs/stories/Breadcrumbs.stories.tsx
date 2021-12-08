import * as React from 'react';
import { Breadcrumbs } from '../src';

const metadata = { title: 'Navigation/Breadcrumbs' };
export default metadata;

export const SingleEntry = () => (
  <Breadcrumbs>
    <a href="#/url/1" aria-current="page">
      Torget
    </a>
  </Breadcrumbs>
);

export const Example = () => (
  <Breadcrumbs>
    <a href="#/url1">Item 1</a>
    <a href="#/url2">Item 2</a>
    <a href="#/url3">Item 3</a>
  </Breadcrumbs>
);

export const WithFragments = () => (
  <Breadcrumbs>
    <a href="#/url/1">Eiendom</a>
    <>
      <a href="#/url/2">Bolig til salgs</a>
      <>
        <a href="#/url/3" aria-current="page">
          Oslo
        </a>
      </>
    </>
  </Breadcrumbs>
);

export const DeepNestedFragments = () => (
  <Breadcrumbs>
    <a href="#/url/1">Something</a>
    <>
      <a href="#/url/2">Inside</a>
      <>
        <a href="#/url/3" aria-current="page">
          A deep
        </a>
        <>
          <a href="#/url/3" aria-current="page">
            Nested
          </a>
          <>
            <a href="#/url/3" aria-current="page">
              Structure
            </a>
          </>
        </>
      </>
    </>
  </Breadcrumbs>
);
