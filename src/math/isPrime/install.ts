import { extendPrototype } from '../../utils.js';
import { isPrime } from './index.js';
export type * from './types';

extendPrototype(Math, { isPrime });
