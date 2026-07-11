export const isPromise = (value: unknown): value is Promise<unknown> =>
  value instanceof Promise ||
  (typeof value === 'object' &&
    Object.prototype.toString.call(value) === '[object Promise]');
