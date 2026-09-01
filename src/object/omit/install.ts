import { extendPrototype } from '../../utils.js';
import { omit } from './index.js';
export type * from './types';

extendPrototype(Object, { omit });
