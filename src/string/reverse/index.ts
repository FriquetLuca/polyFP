import { toChars } from '../toChars/index.js';

export const reverse = (str: string): string => toChars(str).reverse().join('');
