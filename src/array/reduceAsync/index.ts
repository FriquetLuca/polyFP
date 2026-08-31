export async function reduceAsync<T, Acc>(
  items: T[],
  fn: (acc: Acc, item: T, index: number) => Promise<Acc>,
  initial: Acc
): Promise<Acc> {
  let acc = initial;
  for (let i = 0; i < items.length; i++) {
    acc = await fn(acc, items[i], i);
  }
  return acc;
}
