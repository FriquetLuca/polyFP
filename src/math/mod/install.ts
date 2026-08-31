import { extendPrototype } from '../../utils.js';
import { mod } from './index.js';
export type * from './types';

extendPrototype(Math, { mod });
