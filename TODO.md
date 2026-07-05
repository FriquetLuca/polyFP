function match<
  T extends { type: string },
  TResult
>(
  value: T,
  handlers: {
    [K in T["type"]]:
      (value: Extract<T, { type: K }>) => TResult
  }
): TResult {
  return handlers[value.type](
    value as Extract<T, { type: typeof value.type }>
  )
}

function match<
  T extends PropertyKey,
  TResult
>(
  value: T,
  cases: Record<T, () => TResult>
): TResult {
  return cases[value]()
}

function sequence<T, E>(
  results: Result<T, E>[]
): Result<T[], E> {
  const values: T[] = []

  for (const result of results) {
    if (!result.ok) {
      return result
    }

    values.push(result.value)
  }

  return {
    ok: true,
    value: values
  }
}

export type ProxyData = { [key: string]: any }

export type OnChangeCallback<
  T extends ProxyData,
  K extends Extract<keyof T, string>
> = (
  property: K,
  value: T[K]
) => void

export function createProxy<T extends ProxyData>(
  data: T,
  onChange?: OnChangeCallback<T, Extract<keyof T, string>>,
  onRemove?: (property: Extract<keyof T, string>) => void
) {
  return new Proxy(data, {
    set(target, property, value) {
      target[property as keyof typeof target] = value
      onChange && onChange(property as Extract<keyof T, string>, value)
      return true
    },
    deleteProperty(target, property){
      delete target[property as keyof typeof target]
      onRemove && onRemove(property as Extract<keyof T, string>)
      return true;
    }
  })
}

import type { ProxyData, OnChangeCallback } from "./createProxy";

export function createNestedProxy<T extends ProxyData>(
  data: T,
  onChange: OnChangeCallback<T, Extract<keyof T, string>>
): T {
  if (typeof data !== 'object' || data === null) {
    return data
  }
  return new Proxy(data, {
    set(target, property, value) {
      target[property as keyof typeof target] = value
      onChange(property as Extract<keyof T, string>, value)
      return true
    },
    get(target, property) {
      if (property == 'isProxy') return true;
      const value = target[property as Extract<keyof T, string>]
      if (typeof value === 'object' && value !== null) {
        return createNestedProxy(value, onChange)
      }
      return value
    },
  })
}

export function addProperty<O extends object, T extends string|number|symbol, V>(obj: O, propertyName: T, value: V) {
  return { ...obj, [propertyName]: value } as Collapse<O & Record<T, V>>;
}

export function getUnexpectedProperties<T extends object, U extends keyof T>(item: T, keys: U[]) {
  const result: any[] = []
  for(const key in item) {
    if(!keys.includes(key as unknown as U)) {
      result.push(key as unknown as U)
    }
  }
  return result as Collapse<(keyof Omit<T, U>)[]>
}

export function removeProperty<O extends object, T extends keyof O>(obj: O, propertyName: T) {
  const { [propertyName]: _, ...newObj } = obj;
  return newObj as Collapse<Omit<O, T>>;
}
export type Listener<T> = (data: T) => void
export type Observer<T> = {
  subscribe: (listener: Listener<T>) => void
  unsubscribe: (listener: Listener<T>) => void
  notify: (data: T) => void
}
/**
 * Create an observer from which you can subscribe listener and notify them later
 * @returns An observer waiting for a notification
 */
export function createObserver<T>() {
  const listeners: Listener<T>[] = []
  return {
    subscribe: (listener: Listener<T>) => {
      listeners.push(listener);
    },
    unsubscribe: (listener: Listener<T>) => {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    },
    notify: (data: T) => {
      for (const listener of listeners) {
        listener(data);
      }
    }
  } as Observer<T>
}
