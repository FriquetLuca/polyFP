import { extendPrototype } from '../../utils.js';
import { pascalTriangle } from './index.js';
export type * from './types';

extendPrototype(Math, { pascalTriangle });
