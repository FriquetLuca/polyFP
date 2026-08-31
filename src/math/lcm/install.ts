import { extendPrototype } from '../../utils.js';
import { lcm } from './index.js';
export type * from './types';

extendPrototype(Math, { lcm });
