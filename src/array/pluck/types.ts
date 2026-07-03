export {};

declare global {
  interface Array<T> {
    pluck<K extends keyof T>(this: T[], key: K): T[K][];
  }
  interface ReadonlyArray<T> {
    pluck<K extends keyof T>(this: T[], key: K): T[K][];
  }
}
