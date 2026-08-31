export {};

declare global {
  interface String {
    toChars(this: string): string[];
  }
}
