import { extendPrototype } from '../../utils.js';
import { inRange } from './index.js';
export type * from './types';

extendPrototype(Math, { inRange });
