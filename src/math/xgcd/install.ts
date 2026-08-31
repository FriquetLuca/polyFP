import { extendPrototype } from '../../utils.js';
import { xgcd } from './index.js';
export type * from './types';

extendPrototype(Math, { xgcd });
