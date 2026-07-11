export {};

declare global {
  interface String {
    hamming(this: string, b: string): number;
  }
}
