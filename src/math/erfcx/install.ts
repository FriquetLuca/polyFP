import { extendPrototype } from '../../utils.js';
import { erfcx } from './index.js';
export type * from './types';

extendPrototype(Math, { erfcx });
