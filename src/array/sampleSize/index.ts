import { shuffle } from '../shuffle';

export function sampleSize<T>(array: T[], size: number): T[] {
  const length = array.length;
  if (size <= 0 || length === 0) return [];
  if (size >= length) return shuffle(array);
  const result = array.slice();
  for (let i = 0; i < size; i++) {
    const j = i + ((Math.random() * (length - i)) | 0);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.slice(0, size);
}
