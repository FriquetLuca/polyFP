export {};

declare global {
  interface String {
    isDuration(this: string, useExtended?: boolean): boolean;
  }
}
