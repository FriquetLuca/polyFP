export {};

declare global {
  interface String {
    swapCase(this: string): string;
  }
}
