export {};

declare global {
  interface String {
    constantCase(this: string): string;
  }
}
