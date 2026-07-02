export {};

declare global {
  interface FunctionConstructor {
    all<T>(preds: ((x: T) => boolean)[]): (x: T) => boolean;
  }
}
