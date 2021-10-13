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

await esbuild.build({
  plugins: [eik.plugin()],
  entryPoints: ['packages/index.ts'],
  bundle: true,
  outdir: 'dist/eik',
  format: 'esm',
  sourcemap: true,
  target: 'es2017',
  minify: true,
});

await esbuild.build({
  entryPoints: ['packages/index.ts'],
  bundle: true,
  outdir: 'dist/npm',
  format: 'esm',
  sourcemap: true,
  target: 'es2021',
  minify: true,
  external: excludes,
});
