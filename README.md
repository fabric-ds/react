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

1. `npm run build` - Builds files in ./dist directory
1. `npm run publish` - Releases to npm
1. `npm run eik:publish` - publishes to the Eik server
1. `npm run eik:alias` - Update the Eik alias
