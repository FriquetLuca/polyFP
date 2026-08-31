import { extendPrototype } from '../../utils.js';
import { frac } from './index.js';
export type * from './types';

extendPrototype(Math, { frac });
