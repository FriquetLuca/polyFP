export {};

declare global {
  interface String {
    isEmail(this: string): boolean;
  }
}
