export class IndexedPool<T> {
  private pool: (T | null)[];
  private emptyIndexes: number[];

  constructor(size: number) {
    this.pool = new Array(size).fill(null);
    this.emptyIndexes = new Array(size);
    for (let i = 0; i < size; i++) {
      this.emptyIndexes[i] = size - 1 - i;
    }
  }
  get capacity(): number {
    return this.pool.length - this.emptyIndexes.length;
  }
  get size(): number {
    return this.pool.length;
  }
  get(index: number): T | null {
    if (index >= this.pool.length || index < 0) {
      throw new Error(`Index ${index} out of bounds`);
    }
    return this.pool[index];
  }
  add(item: T): number {
    if (this.emptyIndexes.length === 0) return -1;

    const index = this.emptyIndexes.pop()!;
    this.pool[index] = item;
    return index;
  }
  remove(index: number): void {
    if (index >= this.pool.length || index < 0) {
      throw new Error(`Index ${index} out of bounds`);
    }

    this.pool[index] = null;
    this.emptyIndexes.push(index);
  }
  cleanLostIndexes(): void {
    this.emptyIndexes = [];
    for (let i = 0; i < this.pool.length; i++) {
      if (this.pool[i] === null) {
        this.emptyIndexes.push(i);
      }
    }
  }
}
