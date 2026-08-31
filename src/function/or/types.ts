export {};

declare global {
  interface Function {
    or<T>(
      this: (x: T) => boolean,
      ...preds: ((x: T) => boolean)[]
    ): (x: T) => boolean;
  }
}
