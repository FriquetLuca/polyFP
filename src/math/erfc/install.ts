import { extendPrototype } from '../../utils.js';
import { erfc } from './index.js';
export type * from './types';

extendPrototype(Math, { erfc });
