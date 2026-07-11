export {};

declare global {
  interface String {
    snakeCase(this: string): string;
  }
}
