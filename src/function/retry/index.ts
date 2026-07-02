export const retry =
  (attempts: number) =>
  async <T>(fn: () => Promise<T>): Promise<T> => {
    let error: unknown;

    for (let i = 0; i < attempts; i++) {
      try {
        return await fn();
      } catch (e) {
        error = e;
      }
    }

    throw error;
  };
