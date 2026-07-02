export {};

declare global {
  interface FunctionConstructor {
    atMostOne<T>(...preds: ((x: T) => boolean)[]): (x: T) => boolean;
  }
}
