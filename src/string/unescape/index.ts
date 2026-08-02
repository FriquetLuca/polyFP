import { createEscaper, unescapeMap } from '../utils.js';

export const unescape = createEscaper(unescapeMap);
