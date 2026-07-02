export {};

declare global {
  interface FunctionConstructor {
    parallel<T extends readonly unknown[]>(
      ...tasks: { [K in keyof T]: () => Promise<T[K]> }
    ): Promise<T>;
  }
}
