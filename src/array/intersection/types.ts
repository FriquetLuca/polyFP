export {};

declare global {
  interface ArrayConstructor {
    intersection<T>(a: readonly T[], b: readonly T[]): T[];
  }
}
