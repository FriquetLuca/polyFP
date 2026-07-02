export {};

declare global {
  interface ObjectConstructor {
    omit<T extends object, U extends keyof T>(
      obj: T,
      ...items: U[]
    ): Omit<T, U>;
  }
}
