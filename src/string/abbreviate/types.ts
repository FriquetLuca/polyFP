export {};

declare global {
  interface String {
    abbreviate(this: string, maxLength: number, exactLength?: boolean): string;
  }
}
