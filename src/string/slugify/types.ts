export {};

declare global {
  interface String {
    slugify(this: string): string;
  }
}
