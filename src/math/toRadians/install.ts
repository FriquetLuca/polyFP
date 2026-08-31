import { extendPrototype } from '../../utils.js';
import { toRadians } from './index.js';
export type * from './types';

extendPrototype(Math, { toRadians });
