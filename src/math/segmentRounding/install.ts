import { extendPrototype } from '../../utils.js';
import { segmentRounding } from './index.js';
export type * from './types';

extendPrototype(Math, { segmentRounding });
