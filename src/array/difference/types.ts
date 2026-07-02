export {};

declare global {
  interface ArrayConstructor {
    difference<T>(a: readonly T[], b: readonly T[]): T[];
  }
}
