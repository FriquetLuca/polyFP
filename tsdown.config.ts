import { defineConfig } from 'tsdown';
type ExportValue =
  | string
  | {
      types?: string | Record<string, string>;
      import?: string | Record<string, string>;
      require?: string | Record<string, string>;
      default?: string;
      [condition: string]: unknown;
    };

function injectTypes(
  exports: Record<string, ExportValue>
): Record<string, ExportValue> {
  return Object.fromEntries(
    Object.entries(exports).map(([key, value]) => {
      if (typeof value === 'string') {
        return [key, value];
      }
      const { import: esm, require: cjs, ...rest } = value;
      if (typeof esm !== 'string' || typeof cjs !== 'string') {
        return [key, value];
      }
      const esmTypes = esm.replace(/\.(?:mjs|js)$/, '.d.ts');
      const cjsTypes = cjs.replace(/\.(?:cjs|js)$/, '.d.cts');
      return [
        key,
        {
          ...rest,
          import: {
            types: esmTypes,
            default: esm,
          },
          require: {
            types: cjsTypes,
            default: cjs,
          },
        },
      ];
    })
  );
}
export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      data: 'src/data/index.ts',
      'array/*': 'src/array/**/*/index.ts',
      'date/*': 'src/date/**/*/index.ts',
      'function/*': 'src/function/**/*/index.ts',
      'math/*': 'src/math/**/*/index.ts',
      'object/*': 'src/object/**/*/index.ts',
      'string/*': 'src/string/**/*/index.ts',
      'polyfill/*': 'src/**/*/install.ts',
    },
    root: 'src',
    outDir: 'dist',
    platform: 'neutral',
    format: {
      esm: {
        target: ['es2023'],
      },
      cjs: {
        target: ['node20'],
      },
    },
    dts: {
      generator: 'tsc',
    },
    exports: {
      customExports(exports) {
        return injectTypes(exports);
      },
    },
    minify: true,
    unbundle: true,
  },
]);
