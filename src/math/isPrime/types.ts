export {};

declare global {
  interface Math {
    isPrime(x: number): boolean;
  }
}
