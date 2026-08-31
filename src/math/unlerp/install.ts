import { extendPrototype } from '../../utils.js';
import { unlerp } from './index.js';
export type * from './types';

extendPrototype(Math, { unlerp });
