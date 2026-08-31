import { extendPrototype } from '../../utils.js';
import { roundToPointFive } from './index.js';
export type * from './types';

extendPrototype(Math, { roundToPointFive });
