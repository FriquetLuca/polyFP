export const parallel = <T extends readonly unknown[]>(
  ...tasks: { [K in keyof T]: () => Promise<T[K]> }
) => Promise.all(tasks.map((task) => task())) as unknown as Promise<T>;
