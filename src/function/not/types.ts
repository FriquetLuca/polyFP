export {};

declare global {
  interface FunctionConstructor {
    not<T>(p: (x: T) => boolean): (x: T) => boolean;
  }
}
