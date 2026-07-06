export function shuffle<T>(array: T[]): T[] {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
