export {};

declare global {
  interface FunctionConstructor {
    or<T>(...preds: ((x: T) => boolean)[]): (x: T) => boolean;
  }
}
