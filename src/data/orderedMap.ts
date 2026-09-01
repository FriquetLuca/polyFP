export class OrderedMap<K, V> {
  private map = new Map<K, V>();
  private sortedKeys: K[] = [];
  private compare: (a: K, b: K) => number;

  constructor(compare: (a: K, b: K) => number) {
    this.compare = compare;
  }

  set(key: K, value: V): this {
    if (!this.map.has(key)) {
      this.sortedKeys.splice(this.findInsertIndex(key), 0, key);
    }
    this.map.set(key, value);
    return this;
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K): boolean {
    if (!this.map.has(key)) return false;
    this.map.delete(key);
    const idx = this.binarySearch(key);
    if (idx >= 0) this.sortedKeys.splice(idx, 1);
    return true;
  }

  get size(): number {
    return this.map.size;
  }

  keys(): K[] {
    return [...this.sortedKeys];
  }

  values(): V[] {
    return this.sortedKeys.map((k) => this.map.get(k)!);
  }

  entries(): [K, V][] {
    return this.sortedKeys.map((k) => [k, this.map.get(k)!]);
  }

  first(): [K, V] | undefined {
    const k = this.sortedKeys[0];
    return k === undefined ? undefined : [k, this.map.get(k)!];
  }

  last(): [K, V] | undefined {
    const k = this.sortedKeys[this.sortedKeys.length - 1];
    return k === undefined ? undefined : [k, this.map.get(k)!];
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries()[Symbol.iterator]();
  }

  private findInsertIndex(key: K): number {
    let lo = 0;
    let hi = this.sortedKeys.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.compare(this.sortedKeys[mid], key) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  private binarySearch(key: K): number {
    let lo = 0;
    let hi = this.sortedKeys.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      const cmp = this.compare(this.sortedKeys[mid], key);
      if (cmp === 0) return mid;
      if (cmp < 0) lo = mid + 1;
      else hi = mid - 1;
    }
    return -1;
  }
}
