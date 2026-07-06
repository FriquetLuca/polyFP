export {};

declare global {
  interface ArrayConstructor {
    batch<T, R>(
      values: T[],
      concurrency: number,
      mapper: (value: T, index: number) => R | Promise<R>
    ): Promise<R[]>;
  }
}
