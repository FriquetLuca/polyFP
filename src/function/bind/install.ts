import { extendPrototype } from '../../utils.js';
import { bind } from './index.js';
export type * from './types';

extendPrototype(Function, { bind });
