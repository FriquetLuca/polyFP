export {};

declare global {
  interface Function {
    not<T>(this: (x: T) => boolean): (x: T) => boolean;
  }
}
