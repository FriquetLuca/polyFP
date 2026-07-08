export {};

declare global {
  interface ObjectConstructor {
    renameKeys<
      T extends Record<PropertyKey, unknown>,
      M extends Partial<Record<keyof T, PropertyKey>>,
    >(
      object: T,
      mapping: M
    ): {
      [
        K in keyof T as K extends keyof M
          ? M[K] extends PropertyKey
            ? M[K]
            : K
          : K
      ]: T[K];
    };
  }
}
