export {};

declare global {
  interface FunctionConstructor {
    repeat<T>(
      fn: (iteration: number) => Promise<T>,
      times: number,
      intervalMs?: number
    ): () => Promise<T[]>;
  }
}
