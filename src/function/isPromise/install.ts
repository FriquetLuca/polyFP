import { extendPrototype } from '../../utils.js';
import { isPromise } from './index.js';
export type * from './types';

extendPrototype(Function, { isPromise });
