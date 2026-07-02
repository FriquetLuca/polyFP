export {};

declare global {
  interface ObjectConstructor {
    isPlainObject<T>(obj: T): boolean;
  }
}
