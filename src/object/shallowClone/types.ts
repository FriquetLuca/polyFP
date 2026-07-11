export {};

declare global {
  interface ObjectConstructor {
    shallowClone<T>(o: T): T;
  }
}
