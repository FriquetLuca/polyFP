import * as esbuild from 'esbuild';
import { readFileSync } from 'node:fs';
import fg from 'fast-glob';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

async function build(entryPoints, bundle) {
  const shared = {
    entryPoints,
    bundle,
    minify: true,
    sourcemap: true,
    target: 'es2023',
    external,
    logLevel: 'info',
  };
  await Promise.all([
    // ESM
    esbuild.build({
      ...shared,
      format: 'esm',
      platform: 'neutral',
      outdir: 'dist/esm',
    }),
    // CommonJS
    esbuild.build({
      ...shared,
      format: 'cjs',
      platform: 'node',
      outdir: 'dist/cjs',
    }),
  ]);
}

const sources = await fg('src/**/*.ts', {
  ignore: ['src/**/*/types.ts', 'src/types.ts', 'src/**/*.test.ts'],
});
await build(sources, false);
