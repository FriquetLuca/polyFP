export {};

declare global {
  interface ArrayConstructor {
    chunk(size: number): <T>(arr: readonly T[]) => T[][];
  }
}
