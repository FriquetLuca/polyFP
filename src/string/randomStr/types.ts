export {};

declare global {
  interface StringConstructor {
    randomStr(length: number, chars?: string): string;
  }
}
