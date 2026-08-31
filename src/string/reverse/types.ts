export {};

declare global {
  interface String {
    reverse(this: string): string;
  }
}
