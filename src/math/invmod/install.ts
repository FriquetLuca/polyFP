import { extendPrototype } from '../../utils.js';
import { invmod } from './index.js';
export type * from './types';

extendPrototype(Math, { invmod });
