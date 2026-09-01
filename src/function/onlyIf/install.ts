import { extendPrototype } from '../../utils.js';
import { onlyIf } from './index.js';
export type * from './types';

extendPrototype(Function, { onlyIf });
