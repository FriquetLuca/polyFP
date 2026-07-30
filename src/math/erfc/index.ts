import { calerf } from '../utils.js';

export const erfc = (x: number): number => calerf(x, 1);
