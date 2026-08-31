export {};

declare global {
  interface Function {
    all<T>(
      this: (x: T) => boolean,
      ...preds: ((x: T) => boolean)[]
    ): (x: T) => boolean;
  }
}
