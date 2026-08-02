export {};

declare global {
  interface String {
    unescape(input: string): string;
  }
}
