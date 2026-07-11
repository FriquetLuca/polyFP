import type { TextPosition } from '../../types';

export {};

declare global {
  interface String {
    textPosition(
      this: string,
      specifiedIndex?: number | undefined
    ): TextPosition;
  }
}
