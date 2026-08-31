import { extendPrototype } from '../../utils.js';
import { moveTowardsAngle } from './index.js';
export type * from './types';

extendPrototype(Math, { moveTowardsAngle });
