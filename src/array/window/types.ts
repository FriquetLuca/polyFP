export {};

declare global {
  interface ArrayConstructor {
    window(size: number): <T>(arr: readonly T[]) => T[][];
  }
}
