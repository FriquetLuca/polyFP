export {};

declare global {
  interface String {
    isTime(this: string): boolean;
  }
}
