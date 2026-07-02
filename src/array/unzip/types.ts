export {};

declare global {
  interface ArrayConstructor {
    unzip<A, B>(arr: readonly (readonly [A, B])[]): [A[], B[]];
  }
}
