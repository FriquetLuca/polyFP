import { extendPrototype } from '../../utils.js';
import { repeat } from './index.js';
export type * from './types';

extendPrototype(Function, { repeat });
