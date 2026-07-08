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

Proxy:
readonly(obj)
deepReadonly(obj)
observable(obj)
watch(obj, "name", ...)
- Should handle signal

Memoization:
memoizeWeak(fn)
memoizeLRU(fn)
cached(fn)

Statistics:
covariance
correlation
Pearson
Spearman
percentile
quartiles
quantiles
skewness
kurtosis
entropy
z-score
normalization
min-max scaling

Iterator:
range()
repeat()
cycle()
window()
pairwise()
scan()
interleave()
flatten()
cartesian()
takeWhile()
dropWhile()

Async:
debounce()
throttle()
delay()
sleep()
race()
timeout()
queue()
channel()
barrier()
pool()

Random:
randomInt()
randomFloat()
choice()
sample()
sampleSize()
shuffle()
weightedChoice()
uuid()
seededRandom()
normal()
gaussian()
poisson()
bernoulli()

validation:
STRING:
isEmail()
isUuid()
isUrl()
DATE:
isDate()
isPromise()
isIterable()

String algorithms:
levenshtein()
jaro()
jaroWinkler()
hamming()
soundex()
metaphone()
slugify()
camelCase()
snakeCase()

Binary / Bit:
popcount()
clz()
rotl()
rotr()
grayCode()
crc32()
murmurHash()
fnv1a()

graph:
dfs()
bfs()
dijkstra()
astar()
topologicalSort()
unionFind()

Numeric methods:
newton()
bisection()
secant()
integrate()
differentiate()
interpolate()

DataFrame-like:
aggregate
pivot
unpivot
distinctBy
rank
denseRank
rolling
window
