export {};

declare global {
  interface String {
    upperFirst(this: string): string;
  }
}
