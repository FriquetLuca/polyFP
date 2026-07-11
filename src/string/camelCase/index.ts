import { words } from '../words/index';

export function camelCase(value: string): string {
  const w = words(value);
  if (w.length === 0) return '';
  return (
    w[0].toLowerCase() +
    w
      .slice(1)
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join('')
  );
}
