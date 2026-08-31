export const retry =
  <T, Args extends unknown[]>(
    fn: (...args: Args) => Promise<T>,
    attempts: number
  ) =>
  async (...args: Args): Promise<T> => {
    let error: unknown;

    for (let i = 0; i < attempts; i++) {
      try {
        return await fn(...args);
      } catch (e) {
        error = e;
      }
    }

    throw error;
  };
