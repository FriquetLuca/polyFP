import { extendPrototype } from '../../utils.js';
import { throttle } from './index.js';
export type * from './types';

extendPrototype(Function, { throttle });
