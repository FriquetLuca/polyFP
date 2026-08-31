import { extendPrototype } from '../../utils.js';
import { withTimeout } from './index.js';
export type * from './types';

extendPrototype(Function, { withTimeout });
