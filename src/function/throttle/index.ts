export function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  waitMs: number
): ((...args: Args) => void) & { cancel: () => void } {
  let lastCallTime = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pendingArgs: Args | undefined;
  let pendingThis: unknown;

  const throttled = function (this: unknown, ...args: Args): void {
    const now = Date.now();
    const remaining = waitMs - (now - lastCallTime);

    if (remaining <= 0) {
      if (timer !== undefined) {
        clearTimeout(timer);
        timer = undefined;
      }
      lastCallTime = now;
      fn.apply(this, args);
    } else {
      pendingArgs = args;
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      pendingThis = this;
      if (timer === undefined) {
        timer = setTimeout(() => {
          lastCallTime = Date.now();
          timer = undefined;
          if (pendingArgs) {
            fn.apply(pendingThis, pendingArgs);
            pendingArgs = undefined;
          }
        }, remaining);
      }
    }
  };

  throttled.cancel = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
    pendingArgs = undefined;
  };

  return throttled;
}
