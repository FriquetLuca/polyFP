import { extendPrototype } from '../../utils.js';
import { deltaAngle } from './index.js';
export type * from './types';

extendPrototype(Math, { deltaAngle });
