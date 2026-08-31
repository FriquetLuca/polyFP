import { extendPrototype } from '../../utils.js';
import { between } from './index.js';
export type * from './types';

extendPrototype(Math, { between });
