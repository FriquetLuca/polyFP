import type { Pool } from '../../types';

export function pool<T>(resources: T[]): Pool<T> {
  if (resources.length === 0) {
    throw new Error('pool: requires at least one resource');
  }

  const available = [...resources];
  const inUseSet = new Set<T>();
  const waiters: ((resource: T) => void)[] = [];

  return {
    acquire(): Promise<T> {
      if (available.length > 0) {
        const resource = available.pop()!;
        inUseSet.add(resource);
        return Promise.resolve(resource);
      }
      return new Promise<T>((resolve) => waiters.push(resolve));
    },

    release(resource: T): void {
      if (!inUseSet.has(resource)) {
        throw new Error(
          'pool: released a resource that was not acquired from this pool'
        );
      }
      inUseSet.delete(resource);

      const waiter = waiters.shift();
      if (waiter) {
        inUseSet.add(resource);
        waiter(resource);
      } else {
        available.push(resource);
      }
    },

    get available() {
      return available.length;
    },
    get inUse() {
      return inUseSet.size;
    },
  };
}
