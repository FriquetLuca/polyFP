import { extendPrototype } from '../../utils.js';
import { shallowClone } from './index.js';
export type * from './types';

extendPrototype(Object, { shallowClone });
