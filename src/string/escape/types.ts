export {};

declare global {
  interface String {
    escape(input: string): string;
  }
}
