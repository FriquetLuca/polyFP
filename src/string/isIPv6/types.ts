export {};

declare global {
  interface String {
    isIPv6(this: string, strict?: boolean): boolean;
  }
}
