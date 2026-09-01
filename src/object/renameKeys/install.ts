import { extendPrototype } from '../../utils.js';
import { renameKeys } from './index.js';
export type * from './types';

extendPrototype(Object, { renameKeys });
