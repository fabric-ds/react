import * as eik from '@eik/esbuild-plugin';
import esbuild from 'esbuild';

await eik.load();

await esbuild.build({
  plugins: [eik.plugin()],
  entryPoints: ['index.ts'],
  bundle: true,
  outdir: 'dist/eik',
  format: 'esm',
  sourcemap: true,
  target: 'es2017',
  minify: true,
});
