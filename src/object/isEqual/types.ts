export {};

declare global {
  interface ObjectConstructor {
    isEqual<T, U>(a: T, b: U): boolean;
  }
}
