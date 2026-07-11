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
isPromise()
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



























✅ Collections

You already have or planned:

Array extensions
query DSL
aggregate engine

I'd probably still add:

groupBy
keyBy
indexBy
distinct
distinctBy
countBy
chunkWhile
zip
zipWith
intersect
difference
union
shuffle
sample
binarySearch
partitionMap
✅ Async

You mentioned most already:

parallel
race
retry
poll
sleep
delay
debounce
throttle
mapAsync
filterAsync
reduceAsync
forEachAsync
mapLimit

I'd also consider:

timeout
withTimeout
memoizeAsync
queue
semaphore
mutex
batch
pipeline
retryUntil
repeat
✅ Functional

You have:

Option
Result
Either

Missing common combinators:

map
flatMap
filter
tap
inspect
match
fold
mapErr
orElse
andThen
flatten
transpose
sequence
✅ ADTs

You now have:

createADT
schemaADT
pattern matching
Standard Schema integration

I'd add:

exhaustive matching helper
visitor API
serialization/deserialization
tagged unions from enums
nested ADTs
✅ Objects

I'd expect:

pick
omit
renameKeys
mapValues
mapKeys
invert
merge
deepMerge
deepClone
defaults
entries
fromEntries
hasOwn
paths
get
set
update
✅ Functions

Usually:

pipe
compose
identity
constant
noop
once
memoize
curry
uncurry
partial
flip
before
after
tap
guard
✅ Strings

A category I don't think we've discussed.

Things like:

capitalize
uncapitalize
camelCase
snakeCase
kebabCase
pascalCase
titleCase
truncate
padLeft
padRight
repeat
reverse
isBlank
stripIndent
✅ Numbers

Useful utilities:

clamp
between
lerp
round
roundTo
sum
average
median
mode
variance
stdDev
randomInt
✅ Records / Tables

Given your SQL-like work, I'd expand here:

groupBy
having
select
project
rename
distinct
union
intersect
except
pivot
unpivot
✅ Validation

Now that you've integrated the Standard Schema API:

schema-backed ADTs
parsing helpers
validation helpers
schema transformations
coercion helpers
✅ Data structures

This is probably the biggest category you don't have yet.

Examples include:

Queue
Deque
Stack
PriorityQueue
Heap
LinkedList
Trie
Graph
Tree
BiMap
MultiMap
OrderedMap
LRUCache
RingBuffer
✅ Events / Reactive

If you ever go that direction:

EventEmitter
Observable
Signal
Subject
✅ Types

Since you've written quite a bit of type-level code already, a dedicated types module could include:

Collapse
Prettify
DeepPartial
DeepReadonly
DeepRequired
Exact
Mutable
UnionToIntersection
TupleToUnion
ValueOf
KeysMatching
AwaitedDeep