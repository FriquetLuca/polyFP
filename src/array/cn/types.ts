export {};

declare global {
  interface Array<T> {
    cn: T extends string | null | undefined ? (this: T[]) => string : never;
  }
  interface ReadonlyArray<T> {
    cn: T extends string | null | undefined ? (this: T[]) => string : never;
  }
}
