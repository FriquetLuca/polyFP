export class BiMap<K, V> {
  private forward = new Map<K, V>();
  private backward = new Map<V, K>();

  set(key: K, value: V): void {
    if (this.forward.has(key)) this.backward.delete(this.forward.get(key)!);
    if (this.backward.has(value))
      this.forward.delete(this.backward.get(value)!);
    this.forward.set(key, value);
    this.backward.set(value, key);
  }

  getByKey(key: K): V | undefined {
    return this.forward.get(key);
  }

  getByValue(value: V): K | undefined {
    return this.backward.get(value);
  }

  hasKey(key: K): boolean {
    return this.forward.has(key);
  }

  hasValue(value: V): boolean {
    return this.backward.has(value);
  }

  deleteByKey(key: K): boolean {
    if (!this.forward.has(key)) return false;
    const value = this.forward.get(key)!;
    this.forward.delete(key);
    this.backward.delete(value);
    return true;
  }

  deleteByValue(value: V): boolean {
    if (!this.backward.has(value)) return false;
    const key = this.backward.get(value)!;
    this.backward.delete(value);
    this.forward.delete(key);
    return true;
  }

  get size(): number {
    return this.forward.size;
  }

  keys(): IterableIterator<K> {
    return this.forward.keys();
  }

  values(): IterableIterator<V> {
    return this.backward.keys();
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.forward[Symbol.iterator]();
  }
}
