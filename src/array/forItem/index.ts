export function forItems<T>(
  items: T[],
  cb: (item: T, index: number, array: T[]) => 'break' | void
) {
  for (let i = 0; i < items.length; i++) {
    if (cb(items[i], i, items) === 'break') {
      break;
    }
  }
}
