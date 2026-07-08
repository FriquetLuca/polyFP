type EmitterRecord<T> = { [K in keyof T]: ((value: T[K]) => void)[] };

export class Emitter<T extends Record<PropertyKey, unknown>> {
  onEmitter: EmitterRecord<T>;
  onOnceEmitter: EmitterRecord<T>;
  constructor() {
    this.onEmitter = {} as EmitterRecord<T>;
    this.onOnceEmitter = {} as EmitterRecord<T>;
  }
  on<K extends keyof T>(event: K, callback: (value: T[K]) => void) {
    this.onEmitter[event] ??= [];
    this.onEmitter[event].push(callback);
  }
  once<K extends keyof T>(event: K, callback: (value: T[K]) => void) {
    this.onOnceEmitter[event] ??= [];
    this.onOnceEmitter[event].push(callback);
  }
  remove<K extends keyof T>(event: K, callback: (value: T[K]) => void) {
    if (this.onEmitter[event]) {
      this.onEmitter[event] = this.onEmitter[event].filter(
        (v) => v !== callback
      );
      if (this.onEmitter[event].length === 0) {
        Reflect.deleteProperty(this.onEmitter, event);
      }
    }
    if (this.onOnceEmitter[event]) {
      this.onOnceEmitter[event] = this.onOnceEmitter[event].filter(
        (v) => v !== callback
      );
      if (this.onOnceEmitter[event].length === 0) {
        Reflect.deleteProperty(this.onOnceEmitter, event);
      }
    }
  }
  emit<K extends keyof T>(event: K, value: T[K]) {
    const cb = (v: (value: T[K]) => void) => v(value);
    if (this.onEmitter[event]) {
      this.onEmitter[event].forEach(cb);
    }
    if (this.onOnceEmitter[event]) {
      this.onOnceEmitter[event].forEach(cb);
      Reflect.deleteProperty(this.onOnceEmitter, event);
    }
  }
  clear() {
    this.onEmitter = {} as EmitterRecord<T>;
    this.onOnceEmitter = {} as EmitterRecord<T>;
  }
}

export const emitter = <T extends Record<PropertyKey, unknown>>() =>
  new Emitter<T>();
