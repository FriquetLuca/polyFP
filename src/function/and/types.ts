export {};

declare global {
  interface FunctionConstructor {
    and<T>(...preds: ((x: T) => boolean)[]): (x: T) => boolean;
  }
}
