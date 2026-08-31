export {};

declare global {
  interface Function {
    atLeastOne<T>(
      this: (x: T) => boolean,
      ...preds: ((x: T) => boolean)[]
    ): (x: T) => boolean;
  }
}
