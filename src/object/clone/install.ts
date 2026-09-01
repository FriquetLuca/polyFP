import { extendPrototype } from '../../utils.js';
import { clone } from './index.js';
export type * from './types';

extendPrototype(Object, { clone });
