import { extendPrototype } from '../../utils.js';
import { ifElse } from './index.js';
export type * from './types';

extendPrototype(Function, { ifElse });
