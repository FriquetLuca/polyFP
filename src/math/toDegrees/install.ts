import { extendPrototype } from '../../utils.js';
import { toDegrees } from './index.js';
export type * from './types';

extendPrototype(Math, { toDegrees });
