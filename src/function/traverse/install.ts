import { extendPrototype } from '../../utils.js';
import { traverse } from './index.js';
export type * from './types';

extendPrototype(Function, { traverse });
