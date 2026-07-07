export const saturate = (a: number) => (a > 1 ? 1 : a < 0 ? 0 : a);
