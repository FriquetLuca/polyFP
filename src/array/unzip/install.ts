import { extendPrototype } from '../../utils.js';
import { unzip } from './index.js';
export type * from './types';

extendPrototype(Array, { unzip });
