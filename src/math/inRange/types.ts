export {};

declare global {
  interface Math {
    inRange(n: number, end: number): boolean;
    inRange(n: number, start: number, end?: number): boolean;
  }
}
