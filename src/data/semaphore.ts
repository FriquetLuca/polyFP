export class Semaphore {
  private permits: number;
  private queue: Array<() => void>;
  constructor(max: number) {
    if (max <= 0) {
      throw new Error('Semaphore size must be greater than 0.');
    }
    this.permits = max;
    this.queue = [];
  }
  acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      this.queue.push(() => {
        this.permits--;
        resolve();
      });
    });
  }
  release() {
    this.permits++;

    if (this.queue.length > 0 && this.permits > 0) {
      const next = this.queue.shift()!;
      next();
    }
  }

  async use<T>(fn: () => Promise<T> | T): Promise<T> {
    await this.acquire();

    try {
      return await fn();
    } finally {
      this.release();
    }
  }

  get available() {
    return this.permits;
  }

  get waiting() {
    return this.queue.length;
  }
}

export const mutex = () => new Semaphore(1);
