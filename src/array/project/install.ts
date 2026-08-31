import { extendPrototype } from '../../utils.js';
import { project } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project(this: any[], specOrFields: any) {
    return project(this, specOrFields);
  },
});
