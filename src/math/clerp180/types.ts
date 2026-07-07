export {};

declare global {
  interface Math {
    clerp180(a: number, b: number, t: number): number;
  }
}
