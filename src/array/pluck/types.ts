export {};

declare global {
  interface ArrayConstructor {
    pluck<T, K extends keyof T>(key: K): (arr: readonly T[]) => T[K][];
  }
}
