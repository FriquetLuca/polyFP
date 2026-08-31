import { extendPrototype } from '../../utils.js';
import { randomStr } from './index.js';
export type * from './types';

extendPrototype(String, { randomStr });
