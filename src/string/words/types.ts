export {};

declare global {
  interface String {
    words(this: string): string[];
  }
}
