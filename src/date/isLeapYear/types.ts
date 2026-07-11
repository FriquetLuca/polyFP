export {};

declare global {
  interface Date {
    isLeapYear(this: Date): boolean;
  }
}
