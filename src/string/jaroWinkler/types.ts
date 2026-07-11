export {};

declare global {
  interface String {
    jaroWinkler(this: string, b: string): number;
  }
}
