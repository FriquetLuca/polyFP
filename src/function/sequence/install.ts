import { extendPrototype } from '../../utils.js';
import { sequence } from './index.js';
export type * from './types';

extendPrototype(Function, { sequence });
