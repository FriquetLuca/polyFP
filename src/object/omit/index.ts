export function omit<T extends object, U extends keyof T>(
  obj: T,
  ...items: U[]
): Omit<T, U> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = {} as any;
  for (const item in obj) {
    if (!items.includes(item as unknown as U)) {
      result[item] = obj[item];
    }
  }
  return result;
}
