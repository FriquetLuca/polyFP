export {};

declare global {
  interface ArrayConstructor {
    unique<T>(arr: readonly T[]): T[];
  }
}
