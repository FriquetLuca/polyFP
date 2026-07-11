export {};

declare global {
  interface String {
    lowerFirst(this: string): string;
  }
}
