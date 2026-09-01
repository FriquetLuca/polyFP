import { extendPrototype } from '../../utils.js';
import { pick } from './index.js';
export type * from './types';

extendPrototype(Object, { pick });
