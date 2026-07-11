export {};

declare global {
  interface String {
    trainCase(this: string): string;
  }
}
