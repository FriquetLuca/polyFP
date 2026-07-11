export {};

declare global {
  interface String {
    sentenceCase(this: string): string;
  }
}
