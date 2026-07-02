import type { DeepReadonly } from '../../types';

export {};

declare global {
  interface ObjectConstructor {
    deepFreeze<T extends object>(object: T): DeepReadonly<T>;
  }
}
