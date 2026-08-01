export const cn = <T extends string | null | undefined>(...args: T[]) =>
  args
    .filter((a) => a != null)
    .join(' ')
    .trim();
