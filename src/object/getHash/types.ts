export {};

declare global {
  interface ObjectConstructor {
    getHash<T>(obj: T): string;
  }
}
