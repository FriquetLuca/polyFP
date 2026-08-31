export {};

declare global {
  interface String {
    isBlank(this: string): boolean;
  }
}
