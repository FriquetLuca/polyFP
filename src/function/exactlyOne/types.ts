export {};

declare global {
  interface FunctionConstructor {
    exactlyOne<T>(...preds: ((x: T) => boolean)[]): (x: T) => boolean;
  }
}
