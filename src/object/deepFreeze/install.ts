import { extendPrototype } from '../../utils.js';
import { deepFreeze } from './index.js';
export type * from './types';

extendPrototype(Object, { deepFreeze });
