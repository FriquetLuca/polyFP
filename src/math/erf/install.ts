import { extendPrototype } from '../../utils.js';
import { erf } from './index.js';
export type * from './types';

extendPrototype(Math, { erf });
