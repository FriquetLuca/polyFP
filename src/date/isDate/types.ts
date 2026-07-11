export {};

declare global {
  interface DateConstructor {
    isDate(value: unknown): value is Date;
  }
}
