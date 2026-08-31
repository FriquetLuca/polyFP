import { extendPrototype } from '../../utils.js';
import { atLeastOne } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  atLeastOne(this, ...fns: Function[]): (arg: unknown) => unknown {
    return atLeastOne(this as () => true, ...(fns as (() => true)[]));
  },
});
