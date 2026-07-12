import { queryBuilder } from './queryBuilder'; // Adjust path as needed
import { describe, it, expect, beforeEach } from 'vitest';

interface User {
  id: number;
  name: string;
  age: number;
}

interface Order {
  id: number;
  userId: number;
  amount: number;
}

describe('QueryBuilder', () => {
  let users: User[];
  let orders: Order[];

  beforeEach(() => {
    users = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ];

    orders = [
      { id: 101, userId: 1, amount: 50 },
      { id: 102, userId: 1, amount: 150 },
      { id: 103, userId: 2, amount: 200 },
      { id: 104, userId: 99, amount: 20 }, // Orphaned order (no matching user)
    ];
  });

  describe('where()', () => {
    it('should filter records based on a predicate condition', () => {
      const result = queryBuilder(users)
        .where((u) => u.age > 28)
        .execute();

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 },
      ]);
    });
  });

  describe('select()', () => {
    it('should pluck specific fields and apply aliases correctly', () => {
      const result = queryBuilder(users)
        .select(['name', 'username'], ['age'])
        .execute();

      expect(result[0]).toEqual({ username: 'Alice', age: 25 });
      expect(result[0]).not.toHaveProperty('id');
    });
  });

  describe('joins', () => {
    it('should perform an INNER JOIN correctly', () => {
      const result = queryBuilder(orders)
        .join((j) =>
          j.inner(users).on((order, user) => order.userId === user.id)
        )
        .execute();

      // Should only include orders 101, 102, 103 (user 99 is excluded)
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        id: 1,
        userId: 1,
        amount: 50,
        name: 'Alice',
        age: 25,
      });
    });

    it('should perform a LEFT JOIN correctly', () => {
      const result = queryBuilder(orders)
        .join((j) =>
          j.left(users).on((order, user) => order.userId === user.id)
        )
        .execute();

      // Should include all 4 orders, order 104 should have undefined user fields
      expect(result).toHaveLength(4);
      const orphaned = result.find((o) => o.id === 104);
      expect(orphaned?.name).toBeUndefined();
      expect(orphaned?.amount).toBe(20);
    });

    it('should perform a RIGHT JOIN correctly', () => {
      const result = queryBuilder(orders)
        .join((j) =>
          j.right(users).on((order, user) => order.userId === user.id)
        )
        .execute();

      // Should include Alice (2 orders), Bob (1 order), and Charlie (0 orders, but kept via right data)
      expect(result).toHaveLength(4);
      const charlieRow = result.find((r) => r.name === 'Charlie');
      expect(charlieRow).toBeDefined();
      expect(charlieRow?.amount).toBeUndefined();
    });
  });

  describe('groupBy() and Aggregations', () => {
    it('should group data and calculate sum, avg, and count correctly', () => {
      const result = queryBuilder(orders)
        .groupBy(['userId'], (agg) => ({
          totalSpent: agg.sum('amount'),
          averageSpent: agg.avg('amount'),
          orderCount: agg.count(),
          amountList: agg.custom({
            init: () => new Set<number>(),
            step: (state, item) => {
              state.add(item.amount);
              return state;
            },
            result: (state) => Array.from(state).join(', '),
          }),
        }))
        .execute();

      expect(result).toHaveLength(3); // User 1, User 2, User 99

      const user1Stats = result.find((r) => r.userId === 1);
      expect(user1Stats).toEqual({
        userId: 1,
        totalSpent: 200,
        averageSpent: 100,
        orderCount: 2,
        amountList: '50, 150',
      });
    });

    it('should calculate min and max aggregations correctly', () => {
      const result = queryBuilder(orders)
        .groupBy(['userId'], (agg) => ({
          cheapest: agg.min('amount'),
          priciest: agg.max('amount'),
        }))
        .execute();

      const user1Stats = result.find((r) => r.userId === 1);
      expect(user1Stats?.cheapest).toBe(50);
      expect(user1Stats?.priciest).toBe(150);
    });
  });

  describe('Chaining capability', () => {
    it('should smoothly execute a complex pipeline combination', () => {
      const result = queryBuilder(orders)
        .where((o) => o.amount > 30)
        .join((j) => j.inner(users).on((o, u) => o.userId === u.id))
        .select(['name', 'customer'], ['amount', 'spent'])
        .execute();

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ customer: 'Alice', spent: 50 });
    });
  });
});

interface UserItem {
  id: number;
  name: string;
  role: string;
}

describe('QueryBuilder - Union Operations', () => {
  let mainUsers: UserItem[];
  let secondaryUsers: UserItem[];

  beforeEach(() => {
    mainUsers = [
      { id: 1, name: 'Alice', role: 'Admin' },
      { id: 2, name: 'Bob', role: 'User' },
    ];

    secondaryUsers = [
      { id: 2, name: 'Bob', role: 'User' }, // Exact duplicate row
      { id: 3, name: 'Charlie', role: 'User' }, // New row
    ];
  });

  describe('union()', () => {
    it('should combine records and eliminate structural duplicates when passing another QueryBuilder', () => {
      const otherQuery = queryBuilder(secondaryUsers).where((u) => u.id > 0);

      const result = queryBuilder(mainUsers).union(otherQuery).execute();

      // Alice, Bob (deduplicated), and Charlie
      expect(result).toHaveLength(3);
      expect(result).toEqual([
        { id: 1, name: 'Alice', role: 'Admin' },
        { id: 2, name: 'Bob', role: 'User' },
        { id: 3, name: 'Charlie', role: 'User' },
      ]);
    });

    it('should combine records and eliminate structural duplicates when passing a raw array', () => {
      const result = queryBuilder(mainUsers).union(secondaryUsers).execute();

      expect(result).toHaveLength(3);
    });
  });

  describe('unionAll()', () => {
    it('should combine all records blindly without deduplication when passing another QueryBuilder', () => {
      const otherQuery = queryBuilder(secondaryUsers);

      const result = queryBuilder(mainUsers).unionAll(otherQuery).execute();

      // Alice, Bob, Bob (again), and Charlie
      expect(result).toHaveLength(4);
      expect(result.filter((u) => u.name === 'Bob')).toHaveLength(2);
    });

    it('should combine all records blindly without deduplication when passing a raw array', () => {
      const result = queryBuilder(mainUsers).unionAll(secondaryUsers).execute();

      expect(result).toHaveLength(4);
    });
  });

  describe('Lazy Evaluation Integrity', () => {
    it('should not evaluate the unioned QueryBuilder until execute() is called', () => {
      let sideEffectTriggered = false;

      // Create a query that sets a flag *only* when evaluated
      const dynamicQuery = queryBuilder(secondaryUsers).where((u) => {
        sideEffectTriggered = true;
        return u.id > 0;
      });

      // Chain the union
      const primaryQuery = queryBuilder(mainUsers).union(dynamicQuery);

      // Assert that it has NOT evaluated yet
      expect(sideEffectTriggered).toBe(false);

      // Run execution
      primaryQuery.execute();

      // Assert it has evaluated now
      expect(sideEffectTriggered).toBe(true);
    });
  });
});

interface TestItem {
  id: number;
  name: string;
  age: number;
  joinedAt: Date;
  meta: { rank: number };
}

describe('QueryBuilder - orderBy Operations', () => {
  let dataset: TestItem[];

  beforeEach(() => {
    dataset = [
      {
        id: 1,
        name: 'Charlie',
        age: 30,
        joinedAt: new Date('2026-03-01'),
        meta: { rank: 2 },
      },
      {
        id: 2,
        name: 'Alice',
        age: 25,
        joinedAt: new Date('2026-01-01'),
        meta: { rank: 3 },
      },
      {
        id: 3,
        name: 'Bob',
        age: 30,
        joinedAt: new Date('2026-02-01'),
        meta: { rank: 1 },
      },
    ];
  });

  it('should sort primitives in ascending order by default', () => {
    const result = queryBuilder<TestItem>([])
      .orderBy([{ key: 'name' }])
      .execute(dataset);

    expect(result.map((u) => u.name)).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('should sort primitives in descending order when desc is true', () => {
    const result = queryBuilder<TestItem>([])
      .orderBy([{ key: 'age', desc: true }])
      .execute(dataset);

    // Expect ages 30, 30, 25 (Charlie and Bob both have 30, Alice has 25)
    expect(result[2].name).toBe('Alice');
    expect(result[0].age).toBe(30);
    expect(result[1].age).toBe(30);
  });

  it('should correctly sort native Date objects', () => {
    const result = queryBuilder<TestItem>([])
      .orderBy([{ key: 'joinedAt' }])
      .execute(dataset);

    // Chronological sorting: Jan -> Feb -> Mar
    expect(result.map((u) => u.name)).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('should evaluate multi-key rules hierarchically to break ties', () => {
    const result = queryBuilder<TestItem>([])
      .orderBy([
        { key: 'age', desc: true }, // Main rule: highest age first
        { key: 'name', desc: false }, // Tie-breaker: alphabetical order
      ])
      .execute(dataset);

    // Charlie (30) and Bob (30) tie on age. 'Bob' comes before 'Charlie' alphabetically.
    expect(result.map((u) => u.name)).toEqual(['Bob', 'Charlie', 'Alice']);
  });

  it('should accurately apply custom comparators for non-primitive properties', () => {
    const result = queryBuilder<TestItem>([])
      .orderBy([
        { key: 'meta', compare: (a, b) => a.rank - b.rank }, // lower rank number first
      ])
      .execute(dataset);

    // Ranks are Bob (1), Charlie (2), Alice (3)
    expect(result.map((u) => u.name)).toEqual(['Bob', 'Charlie', 'Alice']);
  });

  it('should preserve immutability and avoid mutating the source dataset array', () => {
    const originalNames = dataset.map((u) => u.name); // ['Charlie', 'Alice', 'Bob']

    queryBuilder<TestItem>([])
      .orderBy([{ key: 'name' }])
      .execute(dataset);

    // Ensure JavaScript's native Array.prototype.sort() didn't scramble our original reference array
    const structuralNamesPostExecution = dataset.map((u) => u.name);
    expect(structuralNamesPostExecution).toEqual(originalNames);
  });

  it('should respect lazy evaluation rules and postpone sorting until execution', () => {
    const targetQuery = queryBuilder<TestItem>([]).orderBy([{ key: 'name' }]);

    // Mutate the reference data before calling terminal execution
    const testingData = [
      { id: 9, name: 'Zeta', age: 40, joinedAt: new Date(), meta: { rank: 1 } },
      { id: 8, name: 'Beta', age: 40, joinedAt: new Date(), meta: { rank: 2 } },
    ];

    const result = targetQuery.execute(testingData);

    // Verifies it evaluated the parameters dynamically at runtime
    expect(result.map((u) => u.name)).toEqual(['Beta', 'Zeta']);
  });
});

describe('QueryBuilder - slice Operations (Offset/Limit)', () => {
  const items = [
    { id: 1, val: 'A' },
    { id: 2, val: 'B' },
    { id: 3, val: 'C' },
    { id: 4, val: 'D' },
  ];

  it('should skip elements according to offset and restrict count according to limit', () => {
    const result = queryBuilder<(typeof items)[number]>([])
      .slice(1, 2)
      .execute(items);

    expect(result).toEqual([
      { id: 2, val: 'B' },
      { id: 3, val: 'C' },
    ]);
  });

  it('should only apply offset if limit parameter is omitted', () => {
    const result = queryBuilder<(typeof items)[number]>([])
      .slice(2)
      .execute(items);

    expect(result).toEqual([
      { id: 3, val: 'C' },
      { id: 4, val: 'D' },
    ]);
  });

  it('should safely return an empty array if the offset exceeds array bounds', () => {
    const result = queryBuilder<(typeof items)[number]>([])
      .slice(10, 2)
      .execute(items);

    expect(result).toEqual([]);
  });
});

interface Customer {
  id: number;
  name: string;
}

interface Task {
  customerId: number;
  taskName: string;
}

interface Size {
  size: string;
}

interface Color {
  color: string;
}

describe('QueryBuilder - Relational Join Extensions', () => {
  describe('Cross Join (Cartesian Product)', () => {
    it('should match every left row with every right row unconditionally', () => {
      const sizes: Size[] = [{ size: 'S' }, { size: 'M' }];
      const colors: Color[] = [{ color: 'Red' }, { color: 'Blue' }];

      const result = queryBuilder<Size>([])
        .join((j) => j.cross(colors))
        .execute(sizes);

      expect(result).toHaveLength(4);
      expect(result).toEqual([
        { size: 'S', color: 'Red' },
        { size: 'S', color: 'Blue' },
        { size: 'M', color: 'Red' },
        { size: 'M', color: 'Blue' },
      ]);
    });

    it('should return an empty array if either side of the product is empty', () => {
      const sizes: Size[] = [{ size: 'S' }, { size: 'M' }];
      const emptyColors: Color[] = [];

      const result = queryBuilder<Size>([])
        .join((j) => j.cross(emptyColors))
        .execute(sizes);

      expect(result).toEqual([]);
    });
  });

  describe('Full Outer Join', () => {
    let customers: Customer[];
    let tasks: Task[];

    beforeEach(() => {
      customers = [
        { id: 1, name: 'Alice' }, // Left-only (no matching task)
        { id: 2, name: 'Bob' }, // Match found
      ];

      tasks = [
        { customerId: 2, taskName: 'Fix Bugs' }, // Match found
        { customerId: 3, taskName: 'Write Docs' }, // Right-only (no matching customer)
      ];
    });

    it('should map paired matching properties and retain unpaired rows from both sides', () => {
      const result = queryBuilder<Customer>([])
        .join((j) => j.outer(tasks).on((c, t) => c.id === t.customerId))
        .execute(customers);

      expect(result).toHaveLength(3);

      // Verify the Left-only match (missing task properties)
      const leftOnly = result.find((r) => r.id === 1);
      expect(leftOnly).toEqual({ id: 1, name: 'Alice' });

      // Verify the Shared match (combined properties)
      const sharedMatch = result.find((r) => r.id === 2);
      expect(sharedMatch).toEqual({
        id: 2,
        name: 'Bob',
        customerId: 2,
        taskName: 'Fix Bugs',
      });

      // Verify the Right-only match (missing customer properties)
      const rightOnly = result.find((r) => r.taskName === 'Write Docs');
      expect(rightOnly).toEqual({ customerId: 3, taskName: 'Write Docs' });
    });

    it('should yield a clean left join copy if right data is completely empty', () => {
      const result = queryBuilder<Customer>([])
        .join((j) => j.outer([] as Task[]).on((c, t) => c.id === t.customerId))
        .execute(customers);

      expect(result).toEqual([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]);
    });

    it('should yield a clean right join copy if left input execution data is completely empty', () => {
      const result = queryBuilder<Customer>([])
        .join((j) => j.outer(tasks).on((c, t) => c.id === t.customerId))
        .execute([]); // Empty left input

      expect(result).toEqual([
        { customerId: 2, taskName: 'Fix Bugs' },
        { customerId: 3, taskName: 'Write Docs' },
      ]);
    });
  });

  describe('Template Reusability & Lazy Evaluation', () => {
    it('should dynamically apply deferred join predicates across variable datasets', () => {
      // 1. Compile template configuration setup without assigning initial array items
      const templateJoin = queryBuilder<Customer>([]).join((j) =>
        j
          .outer([{ customerId: 99, taskName: 'Shared Task' }])
          .on((c, t) => c.id === t.customerId)
      );

      // 2. Target runtime pass Alpha
      const passAlpha = templateJoin.execute([{ id: 99, name: 'Zeta' }]);
      expect(passAlpha[0]).toEqual({
        id: 99,
        name: 'Zeta',
        customerId: 99,
        taskName: 'Shared Task',
      });

      // 3. Target runtime pass Beta (No match scenario)
      const passBeta = templateJoin.execute([{ id: 11, name: 'Omega' }]);
      expect(passBeta).toContainEqual({ id: 11, name: 'Omega' });
      expect(passBeta).toContainEqual({
        customerId: 99,
        taskName: 'Shared Task',
      });
    });
  });
});
