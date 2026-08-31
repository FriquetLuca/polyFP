export {};

declare global {
  interface Function {
    exactlyOne<T>(
      this: (x: T) => boolean,
      ...preds: ((x: T) => boolean)[]
    ): (x: T) => boolean;
  }
}
