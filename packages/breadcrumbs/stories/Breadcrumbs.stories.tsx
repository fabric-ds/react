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

type BreadcrumbsLink = { id: number; name: string };

export const ExampleWithNestedArrays = () => {
  const breadcrumbs = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    [
      { id: 5, name: 'Item 5' },
      { id: 6, name: 'Item 6' },
      [
        { id: 7, name: 'Item 7' },
        { id: 8, name: 'Item 8' },
      ],
    ],
    { id: 0, name: 'Item 9' },
  ];

  const lastItem = breadcrumbs.at(-1) as BreadcrumbsLink;

  return (
    <Breadcrumbs>
      {breadcrumbs
        .slice(0, -1)
        .map(
          (
            collection:
              | BreadcrumbsLink
              | Array<BreadcrumbsLink | BreadcrumbsLink[]>,
          ) => {
            if ('name' in collection) {
              return (
                <a href={`?id=${collection.id}`} key={`?id=${collection.id}`}>
                  {collection.name}
                </a>
              );
            }

            return collection.map((coll) => {
              if ('name' in coll) {
                return (
                  <a href={`?id=${coll.id}`} key={`?id=${coll.id}`}>
                    {coll.name}
                  </a>
                );
              }

              return coll.map((c) => (
                <a href={`?id=${c.id}`} key={`?id=${c.id}`}>
                  {c.name}
                </a>
              ));
            });
          },
        )}
      <span aria-current="page">{lastItem.name}</span>
    </Breadcrumbs>
  );
};
