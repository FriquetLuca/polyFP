export {};

declare global {
  interface Function {
    debounce<Args extends unknown[]>(
      this: (...args: Args) => void,
      waitMs: number
    ): ((...args: Args) => void) & { cancel: () => void };
  }
}
