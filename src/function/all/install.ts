import { extendPrototype } from '../../utils.js';
import { all } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  all(this, ...fns: Function[]): (arg: unknown) => unknown {
    return all(this as () => true, ...(fns as (() => true)[]));
  },
});
