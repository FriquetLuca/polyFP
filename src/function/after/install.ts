import { extendPrototype } from '../../utils.js';
import { after } from './index.js';
export type * from './types';

extendPrototype(Function.prototype, {
  after(this, n: number): (arg: unknown) => unknown {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    return after(this as () => {}, n);
  },
});
