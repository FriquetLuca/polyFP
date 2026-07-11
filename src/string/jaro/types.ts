export {};

declare global {
  interface String {
    jaro(this: string, b: string): number;
  }
}
