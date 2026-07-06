import { none, some, type Option } from '../../data/option';

export const sample = <T>(array: T[]): Option<T> =>
  array.length === 0 ? none() : some(array[(Math.random() * array.length) | 0]);
