import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as eik from '@eik/esbuild-plugin';
import esbuild from 'esbuild';

const __dirname = dirname(fileURLToPath(import.meta.url));

await eik.load();

const pkg = JSON.parse(fs.readFileSync(join(__dirname, 'package.json')));
const excludes = Object.keys(pkg.peerDependencies).concat(
  Object.keys(pkg.dependencies),
);

const shared = {
  entryPoints: ['packages/index.ts'],
  format: 'esm',
  sourcemap: true,
  minify: true,
  bundle: true,
};

await esbuild.build({
  ...shared,
  outdir: 'dist/eik',
  target: 'es2017',
  plugins: [eik.plugin()],
});

await esbuild.build({
  ...shared,
  outdir: 'dist/npm',
  target: 'es2021',
  external: excludes,
});
