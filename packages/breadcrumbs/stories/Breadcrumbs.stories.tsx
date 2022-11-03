import * as React from 'react';
import { Breadcrumbs } from '../src';

const metadata = { title: 'Navigation/Breadcrumbs' };
export default metadata;

export const BasicExample = () => (
  <Breadcrumbs>
    <a href="#/url1">Item 1</a>
    <a href="#/url2">Item 2</a>
    <a href="#/url3">Item 3</a>
  </Breadcrumbs>
);

export const ExampleWithArray = () => {
  const breadcrumbs = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
  ];

  return (
    <Breadcrumbs>
      {breadcrumbs.slice(0, -1).map((collection) => (
        <a href={`?id=${collection.id}`} key={`?id=${collection.id}`}>
          {collection.name}
        </a>
      ))}
      <span aria-current="page">{breadcrumbs.at(-1)!.name}</span>
    </Breadcrumbs>
  );
};
