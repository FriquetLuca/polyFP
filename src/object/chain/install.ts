import { extendPrototype } from '../../utils.js';
import { chain } from './index.js';
export type * from './types';

extendPrototype(Object, { chain });
