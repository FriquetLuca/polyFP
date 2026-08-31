import { extendPrototype } from '../../utils.js';
import { constant } from './index.js';
export type * from './types';

extendPrototype(Function, { constant });
