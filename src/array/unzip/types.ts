export {};

declare global {
  interface ArrayConstructor {
    unzip<A, B>(arr: [A, B][]): [A[], B[]];
  }
}
