export {};

declare global {
  interface ArrayConstructor {
    zip<A, B>(as: readonly A[], bs: readonly B[]): [A, B][];
  }
}
