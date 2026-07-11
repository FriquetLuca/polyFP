export const isPromiseLike = (value: unknown): value is PromiseLike<unknown> =>
  !!value &&
  (typeof value === 'object' || typeof value === 'function') &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeof (value as any).then === 'function';
