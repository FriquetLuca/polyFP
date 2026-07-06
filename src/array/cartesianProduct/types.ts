export {};

declare global {
  interface ArrayConstructor {
    cartesianProduct<T>(...arrays: T[][]): T[][];
  }
}
