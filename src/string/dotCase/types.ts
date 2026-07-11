export {};

declare global {
  interface String {
    dotCase(this: string): string;
  }
}
