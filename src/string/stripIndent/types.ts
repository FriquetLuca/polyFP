export {};

declare global {
  interface String {
    stripIndent(this: string): string;
  }
}
