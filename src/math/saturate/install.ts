import { extendPrototype } from '../../utils.js';
import { saturate } from './index.js';
export type * from './types';

extendPrototype(Math, { saturate });
