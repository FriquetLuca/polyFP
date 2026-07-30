# Polyfp

![Publish Status](https://github.com/FriquetLuca/polyFP/actions/workflows/publish.yml/badge.svg)
![Test Status](https://github.com/FriquetLuca/polyFP/actions/workflows/test.yml/badge.svg)

> A high-performance, fully typed functional utility belt, LINQ-like query engine, and data structure toolkit for TypeScript & JavaScript.

Designed with **type safety**, **tree-shakability**, and **developer experience** at its core. It brings powerful functional programming (FP) patterns, stream aggregation, and relational query building to your codebase—with **zero runtime bloat**.

## 🔑 Key Features

- 🎯 **100% Type-Safe**: Deep TypeScript inference across all projections, transformations, aggregations, and joins.
- ⚡ **Dual Consumption Models**: Use as standalone pure functions or extend native prototypes via granular polyfills.
- 🌳 **Tree-Shakeable Subpath Exports**: Import only the specific function or polyfill you need without pulling in unused code.
- 📊 **Query & Aggregation Engines**: Perform SQL/LINQ-style lazy evaluation, multi-key grouping, relational joins, and customized stream reductions.
- 📦 **Data Structure Extensions**: Includes specialized data structures exported cleanly under `./data`.

## 📦 Installation

```bash
# npm
npm install @your-scope/toolkit
```

## 🚀 Usage Paradigms

Choose the workflow that best fits your project architecture:

1. **Pure Functional (Standalone)**

    Ideal for functional pipelines, strict immutability, and optimal bundler tree-shaking.

    ```ts
    import { aggregate } from '@your-scope/toolkit/array/aggregate';

    const data = [
      { category: 'tech', price: 100 },
      { category: 'tech', price: 200 },
    ];

    const result = aggregate(data)
      .select('total', 0, (sum, item) => sum + item.price)
      .select('count', 0, (count) => count + 1)
      .take();

    // { total: 300, count: 2 }
    ```
2. **Granular Polyfill (Fluent Method Chaining)**

    Extend standard prototypes on a per-method basis without dirtying global space with unused polyfills.
    The library uses modern subpath exports to give you full control over bundle size and global prototype augmentation.

    ```ts
    // Import the polyfill once to augment Array.prototype and global TypeScript types
    import '@your-scope/toolkit/polyfill/array/aggregate';

    const data = [
      { category: 'tech', price: 100 },
      { category: 'tech', price: 200 },
    ];

    // Call directly on the array instance
    const result = data
      .aggregate()
      .select('total', 0, (sum, item) => sum + item.price)
      .take();
    ```

## ⚙️ TypeScript Global Augmentation

When using any `./polyfill/*` import path, TypeScript automatically augments standard global interfaces (e.g., `Array<T>`, `ReadonlyArray<T>`) to provide full autocompletion and type checking for added prototype methods.

```ts
// types.ts auto-loads upon importing the polyfill file
import '@your-scope/toolkit/polyfill/array/aggregate';

const numbers = [1, 2, 3, 4, 5];

// Intellisense automatically recognizes .aggregate()
numbers.aggregate();
```

## 🛠️ Data Structure

Data structures can't be polyfilled, they are given as is for the developers. You can find `adt`, `stack`, `queue`, `deque` to name a few that you can use for your project.
You can only import it like any normal packages:

```ts
import { Vector } '@your-scope';
// Or specify data directly
// import { Vector } '@your-scope/data';

console.log(new Vector(2, 3).x);
```
