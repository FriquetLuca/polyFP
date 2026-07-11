export {};

declare global {
  interface String {
    camelCase(this: string): string;
  }
}
