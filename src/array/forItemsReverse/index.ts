export function forItemsReverse<T>(
  items: T[],
  cb: (item: T, index: number, array: T[]) => 'break' | void
) {
  for (let i = items.length - 1; i >= 0; i--) {
    if (cb(items[i], i, items) === 'break') {
      break;
    }
  }
}
