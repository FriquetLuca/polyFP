import { extendPrototype } from '../../utils.js';
import { isEqual } from './index.js';
export type * from './types';

extendPrototype(Object, { isEqual });
