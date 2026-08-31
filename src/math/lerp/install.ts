import { extendPrototype } from '../../utils.js';
import { lerp } from './index.js';
export type * from './types';

extendPrototype(Math, { lerp });
