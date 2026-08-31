import { extendPrototype } from '../../utils.js';
import { noop } from './index.js';
export type * from './types';

extendPrototype(Function, { noop });
