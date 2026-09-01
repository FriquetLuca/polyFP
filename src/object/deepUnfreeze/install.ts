import { extendPrototype } from '../../utils.js';
import { deepUnfreeze } from './index.js';
export type * from './types';

extendPrototype(Object, { deepUnfreeze });
