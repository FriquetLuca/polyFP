export {};

declare global {
  interface FunctionConstructor {
    retry(attempts: number): <T>(fn: () => Promise<T>) => Promise<T>;
  }
}
