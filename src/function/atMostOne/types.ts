export {};

declare global {
  interface Function {
    atMostOne<T>(
      this: (x: T) => boolean,
      ...preds: ((x: T) => boolean)[]
    ): (x: T) => boolean;
  }
}
