import { extendPrototype } from '../../utils.js';
import { atMostOne } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  atMostOne(this, ...fns: Function[]): (arg: unknown) => unknown {
    return atMostOne(this as () => true, ...(fns as (() => true)[]));
  },
});
