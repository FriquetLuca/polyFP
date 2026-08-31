import { extendPrototype } from '../../utils.js';
import { exactlyN } from './index.js';
export type * from './types';

extendPrototype(Function, { exactlyN });
