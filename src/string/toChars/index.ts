import { iterate } from '../iterate/index.js';

export const toChars = (str: string): string[] => Array.from(iterate(str));
