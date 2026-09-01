import { extendPrototype } from '../../utils.js';
import { select } from './index.js';
export type * from './types';

extendPrototype(Object, { select });
