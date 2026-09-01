import { extendPrototype } from '../../utils.js';
import { match } from './index.js';
export type * from './types';

extendPrototype(Function, { match });
