export {};

declare global {
  interface String {
    titleCase(this: string): string;
  }
}
