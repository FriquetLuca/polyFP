export type Listener<T> = (data: T) => void;

export class Observer<T> {
  private listeners: Listener<T>[];
  constructor(listeners: Listener<T>[]) {
    this.listeners = listeners;
  }
  subscribe(listener: Listener<T>) {
    this.listeners.push(listener);
  }
  unsubscribe(listener: Listener<T>) {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }
  notify(data: T) {
    for (const listener of this.listeners) {
      listener(data);
    }
  }
  subscriberCount() {
    return this.listeners.length;
  }
  clear() {
    this.listeners = [];
  }
}

export const observer = <T>(...listeners: Listener<T>[]) =>
  new Observer<T>(listeners);
