import { extendPrototype } from '../../utils.js';
import { deepMerge } from './index.js';
export type * from './types';

extendPrototype(Object, { deepMerge });
