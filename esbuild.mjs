import { ok } from 'node:assert';
import * as eik from '@eik/esbuild-plugin';
import esbuild from 'esbuild';

// maps React versions to import map file versions.
// Add more mappings here when new versions of React become available.
const versions = new Map([
  ['17', 'v2'],
  ['18', 'v3'],
]);

const version = process.argv[2];
const reactVersions = Array.from(versions.keys());
ok(
  reactVersions.includes(version),
  `Version argument is required. Must be one of: ${reactVersions.join(
    ',',
  )}. Eg. 'node esbuild.mjs 18'`,
);

await eik.load({
  urls: [`https://assets.finn.no/map/react/${versions.get(version)}`],
});

// legacy support for older filenames
if (version === '17') {
  await esbuild.build({
    plugins: [eik.plugin()],
    entryPoints: ['packages/index.ts'],
    bundle: true,
    outfile: `dist/eik/index.js`,
    format: 'esm',
    sourcemap: true,
    target: 'es2017',
    minify: true,
  });
}

await esbuild.build({
  plugins: [eik.plugin()],
  entryPoints: ['packages/index.ts'],
  bundle: true,
  outfile: `dist/eik/fabric-react-${version}.js`,
  format: 'esm',
  sourcemap: true,
  target: 'es2017',
  minify: true,
});
