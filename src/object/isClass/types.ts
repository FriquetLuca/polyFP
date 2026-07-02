export {};

declare global {
  interface ObjectConstructor {
    isClass<T>(obj: T): boolean;
  }
}
