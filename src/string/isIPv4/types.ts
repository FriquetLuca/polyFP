export {};

declare global {
  interface String {
    isIPv4(this: string): boolean;
  }
}
