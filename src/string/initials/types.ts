export {};

declare global {
  interface String {
    initials(this: string): string;
  }
}
