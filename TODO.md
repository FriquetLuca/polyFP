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
pairwise()
scan()
interleave()
flatten()
takeWhile()
dropWhile()

Random:
choice()
sample()
sampleSize()
weightedChoice()
seededRandom()
normal()
gaussian()
poisson()
bernoulli()

validation:
isIterable()

String algorithms:
levenshtein()
soundex()
metaphone()

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

Numeric methods:
newton()
bisection()
secant()
integrate()
differentiate()
interpolate()

DataFrame-like:
distinctBy
rank
denseRank
rolling



























binarySearch
partitionMap

I'd expect:

mapValues
mapKeys
invert
defaults
entries
fromEntries
hasOwn
paths
get
set
update

select
distinct
intersect









MATRIX

Important caveats — please read before relying on this for anything precision-sensitive
The shift strategy is simplified single-shift Wilkinson, not the full Francis double-shift algorithm that production libraries (LAPACK, etc.) use. The double-shift algorithm exists specifically to guarantee convergence in real arithmetic even when a matrix has genuine complex-conjugate eigenvalue pairs — my single-shift version can, in principle, converge slowly or stall on matrices where the "generic" real matrices in a test suite happen not to expose it, but an adversarial or ill-conditioned input could. I did not implement the full double-shift machinery (implicit bulge-chasing, the "implicit Q theorem") — that's a substantially larger undertaking, and I'd rather flag the gap honestly than claim robustness I haven't verified.
Eigenvectors are only computed for real eigenvalues, via inverse iteration on the original matrix (not the Hessenberg/Schur form). Complex eigenvalues get null in the eigenvectors array — computing complex eigenvectors correctly needs complex arithmetic throughout, which this class doesn't support anywhere else either.
Inverse iteration can be unreliable for defective matrices (repeated eigenvalues without a full set of independent eigenvectors — e.g. a Jordan block) — there's no detection or special-casing for that here; it'll just produce some vector, not necessarily meaningful, without warning you.
eigen()'s eigenvalue ordering isn't guaranteed to match eigenSymmetric()'s for a symmetric input, even though the values should agree (up to numerical error) — worth normalizing/sorting before comparing the two in tests.