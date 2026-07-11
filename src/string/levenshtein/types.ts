export {};

declare global {
  interface String {
    levenshtein(this: string, b: string): number;
  }
}
