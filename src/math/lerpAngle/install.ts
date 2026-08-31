import { extendPrototype } from '../../utils.js';
import { lerpAngle } from './index.js';
export type * from './types';

extendPrototype(Math, { lerpAngle });
