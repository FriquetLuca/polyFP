export {};

declare global {
  interface String {
    isURL(this: string): boolean;
  }
}
