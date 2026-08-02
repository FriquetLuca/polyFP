// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const newInstance = <T extends new (...args: any) => unknown>(
  TheClass: T,
  ...args: [...ConstructorParameters<T>]
) => new TheClass(...args) as InstanceType<T>;
