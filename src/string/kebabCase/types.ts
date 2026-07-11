export {};

declare global {
  interface String {
    kebabCase(this: string): string;
  }
}
