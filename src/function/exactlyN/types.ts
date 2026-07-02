export {};

declare global {
  interface FunctionConstructor {
    exactlyN<T>(n: number, ...preds: ((x: T) => boolean)[]): (x: T) => boolean;
  }
}
