import * as esbuild from 'esbuild';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'neutral',
  target: 'es2023',
  external,
};

await Promise.all([
  // ESM build
  esbuild.build({
    ...shared,
    format: 'esm',
    outfile: 'dist/index.esm.js',
  }),

  // CJS build
  esbuild.build({
    ...shared,
    format: 'cjs',
    outfile: 'dist/index.cjs.js',
    platform: 'node',
  }),

  // IIFE build (for browser use)
  esbuild.build({
    ...shared,
    format: 'iife',
    globalName: 'polyFP', // change this to the global name you want exposed
    outfile: 'dist/index.iife.js',
    platform: 'browser',
    external: [],
  }),
]);
