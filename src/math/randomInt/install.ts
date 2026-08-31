import { extendPrototype } from '../../utils.js';
import { randomInt } from './index.js';
export type * from './types';

extendPrototype(Math, { randomInt });
