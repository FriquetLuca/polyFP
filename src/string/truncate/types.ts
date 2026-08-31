export {};

declare global {
  interface String {
    truncate(this: string, maxLength: number, suffix?: string): string;
  }
}
