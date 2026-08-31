import { extendPrototype } from '../../utils.js';
import { remap } from './index.js';
export type * from './types';

extendPrototype(Math, { remap });
