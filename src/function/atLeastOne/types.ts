export {};

declare global {
  interface FunctionConstructor {
    atLeastOne<T>(preds: ((x: T) => boolean)[]): (x: T) => boolean;
  }
}
