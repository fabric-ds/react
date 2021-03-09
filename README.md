# [Fabric React](https://pages.github.schibsted.io/finn/fabric-react/)

[![Build Status](https://travis.schibsted.io/finn/fabric-react.svg?token=c2i7RTPCstzjYPkxuoGG&branch=master)](https://travis.schibsted.io/finn/fabric-react)

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

1. Make sure you're on `master`
2. `git pull`
3. Make sure you have set up
   [npm publishing to local repository](https://confluence.schibsted.io/display/FINNWEB/How+to+publish+to+our+local+NPM+registry)
4. `yarn lerna publish`
