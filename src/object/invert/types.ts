export {};

declare global {
  interface ObjectConstructor {
    invert<T extends Record<PropertyKey, PropertyKey>>(
      object: T
    ): { [K in keyof T as T[K]]: K };
  }
}
