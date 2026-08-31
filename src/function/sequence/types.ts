import type { Thunks } from '.';

export {};

declare global {
  interface FunctionConstructor {
    sequence<T extends unknown[]>(...thunks: Thunks<T>): Promise<T>;
  }
}
