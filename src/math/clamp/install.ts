import { extendPrototype } from '../../utils.js';
import { clamp } from './index.js';
export type * from './types';

extendPrototype(Math, { clamp });
