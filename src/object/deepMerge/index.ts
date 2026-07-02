import type { Collapse, DeepMerge } from '../../types';

const isMergebleObject = <T>(item: T) =>
  item !== null && typeof item === 'object' && !Array.isArray(item);

export function deepMerge<T extends object, U extends object[]>(
  target: T,
  ...sources: U
): Collapse<DeepMerge<[T, ...U]>> {
  if (!sources.length) return target as Collapse<DeepMerge<[T, ...U]>>;
  const source = sources.shift();
  if (source === undefined) return target as Collapse<DeepMerge<[T, ...U]>>;
  if (isMergebleObject(target) && isMergebleObject(source)) {
    Object.keys(source).forEach(function (key: string) {
      if (isMergebleObject(source[key as keyof typeof source])) {
        if (!target[key as keyof typeof target]) {
          (target[key as keyof typeof target] as object) = {};
        }
        deepMerge(
          target[key as keyof typeof target] as object,
          source[key as keyof typeof source]
        );
      } else {
        target[key as keyof typeof target] = source[key as keyof typeof source];
      }
    });
  }
  return deepMerge(target, ...sources);
}
