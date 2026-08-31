import { extendPrototype } from '../../utils.js';
import { timeout } from './index.js';
export type * from './types';

extendPrototype(Function, { timeout });
