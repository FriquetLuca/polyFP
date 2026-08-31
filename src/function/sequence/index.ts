import type { Thunks } from '../../types';

export async function sequence<T extends unknown[]>(
  ...thunks: Thunks<T>
): Promise<T> {
  const results: unknown[] = [];
  for (const thunk of thunks) {
    results.push(await thunk());
  }
  return results as T;
}
