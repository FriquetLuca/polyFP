import { extendPrototype } from '../../utils.js';
import { getHash } from './index.js';
export type * from './types';

extendPrototype(Object, { getHash });
