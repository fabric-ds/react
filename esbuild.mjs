import { plugin } from '@eik/esbuild-plugin';
import esbuild from 'esbuild';

esbuild
  .build({
    entryPoints: ['index.ts'],
    bundle: true,
    outdir: 'dist/eik',
    format: 'esm',
    sourcemap: true,
    plugins: [plugin()],
    target: 'es2017',
    minify: true,
  })
  .catch(() => process.exit(1));
