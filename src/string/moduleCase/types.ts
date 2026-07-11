export {};

declare global {
  interface String {
    moduleCase(this: string): string;
  }
}
