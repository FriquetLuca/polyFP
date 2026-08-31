import { extendPrototype } from '../../utils.js';
import { randomIntInclusive } from './index.js';
export type * from './types';

extendPrototype(Math, { randomIntInclusive });
