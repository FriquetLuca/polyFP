import { extendPrototype } from '../../utils.js';
import { gcd } from './index.js';
export type * from './types';

extendPrototype(Math, { gcd });
