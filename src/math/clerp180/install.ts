import { extendPrototype } from '../../utils.js';
import { clerp180 } from './index.js';
export type * from './types';

extendPrototype(Math, { clerp180 });
