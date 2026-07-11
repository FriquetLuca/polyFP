export {};

declare global {
  interface String {
    pascalCase(this: string): string;
  }
}
