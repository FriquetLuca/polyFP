export {};

declare global {
  interface ObjectConstructor {
    clone<T>(value: T): T;
  }
}
