export {};

declare global {
  interface ArrayConstructor {
    partition<T>(pred: (x: T) => boolean): (arr: readonly T[]) => [T[], T[]];
  }
}
