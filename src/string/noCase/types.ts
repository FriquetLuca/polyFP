export {};

declare global {
  interface String {
    noCase(this: string): string;
  }
}
