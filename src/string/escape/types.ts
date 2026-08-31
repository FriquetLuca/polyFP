export {};

declare global {
  interface String {
    escape(this: string): string;
  }
}
