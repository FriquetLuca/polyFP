export {};

declare global {
  interface String {
    isDateFormat(this: string): boolean;
  }
}
