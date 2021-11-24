# Fabric React

Monorepo for Fabric React.

## Development

The project uses [Storybook](https://storybook.js.org/) for component
development. Start the storybook instance by running the following command:

```sh
yarn dev
```

## Documentation

To start a local dev server for the documentation site, run the following
command:

```sh
yarn docs:dev
```

## How to release

Run `npm version major|minor|patch`. 
Pre and post hooks will take care of Eik login, asset building and publishing to NPM and Eik.
