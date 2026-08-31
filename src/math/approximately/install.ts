import { extendPrototype } from '../../utils.js';
import { approximately } from './index.js';
export type * from './types';

extendPrototype(Math, { approximately });
