import type { DeepMutable } from '../../types';

declare global {
  interface ObjectConstructor {
    deepUnfreeze<T extends object>(object: T): DeepMutable<T>;
  }
}
