export {};

declare global {
  interface String {
    iterate(this: string): Generator<string>;
  }
}
