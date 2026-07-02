export {};

declare global {
  interface ObjectConstructor {
    pick<T extends object, U extends keyof T>(
      obj: T,
      ...items: U[]
    ): Pick<T, U>;
  }
}
