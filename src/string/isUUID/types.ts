export {};

declare global {
  interface String {
    isUUID(this: string, version?: number | undefined): boolean;
  }
}
