import type { TextPosition } from '../../types';

export function textPosition(
  content: string,
  specifiedIndex?: number
): TextPosition {
  const result = {
    line: 0,
    char: 0,
  };
  const lastIndex = specifiedIndex ?? content.length - 1;
  for (let i = 0; i <= lastIndex; i++) {
    result.char++;
    if (content[i] === '\n') {
      result.line++;
      result.char = 0;
    }
  }
  return result;
}
