import { extendPrototype } from '../../utils.js';
import { parallel } from './index.js';
export type * from './types';

extendPrototype(Function, { parallel });
