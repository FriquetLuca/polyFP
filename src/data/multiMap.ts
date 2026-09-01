export class MultiMap<K, V> {
  private map = new Map<K, V[]>();

  add(key: K, value: V): void {
    const list = this.map.get(key);
    if (list) list.push(value);
    else this.map.set(key, [value]);
  }

  get(key: K): V[] {
    return this.map.get(key) ?? [];
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  hasValue(key: K, value: V): boolean {
    return this.map.get(key)?.includes(value) ?? false;
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  deleteValue(key: K, value: V): boolean {
    const list = this.map.get(key);
    if (!list) return false;
    const idx = list.indexOf(value);
    if (idx === -1) return false;
    list.splice(idx, 1);
    if (list.length === 0) this.map.delete(key);
    return true;
  }

  get size(): number {
    return this.map.size;
  }

  get totalSize(): number {
    let count = 0;
    for (const list of this.map.values()) count += list.length;
    return count;
  }

  keys(): IterableIterator<K> {
    return this.map.keys();
  }

  *entries(): Generator<[K, V]> {
    for (const [key, values] of this.map) {
      for (const value of values) yield [key, value];
    }
  }

  [Symbol.iterator](): Generator<[K, V]> {
    return this.entries();
  }
}
