export {};

declare global {
  interface FunctionConstructor {
    timeout(ms: number): Promise<void>;
  }
}
