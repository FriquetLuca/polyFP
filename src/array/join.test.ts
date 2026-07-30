import { describe, it, expect } from 'vitest';
import { leftJoin } from './leftJoin/index.js';
import { rightJoin } from './rightJoin/index.js';
import { innerJoin } from './innerJoin/index.js';
import { fullJoin } from './fullJoin/index.js';
import { crossJoin } from './crossJoin/index.js';

const left: {
  id: number;
  name: string;
}[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const right: {
  id: number;
  city: string;
}[] = [
  { id: 1, city: 'Paris' },
  { id: 2, city: 'London' },
  { id: 4, city: 'Tokyo' },
];

describe('joins', () => {
  it('leftJoin', () => {
    const res = leftJoin(left, right, 'id');

    expect(res).toEqual([
      { id: 1, name: 'Alice', city: 'Paris' },
      { id: 2, name: 'Bob', city: 'London' },
      { id: 3, name: 'Charlie' },
    ]);
  });

  it('rightJoin', () => {
    const res = rightJoin(left, right, 'id');

    expect(res).toEqual([
      { id: 1, name: 'Alice', city: 'Paris' },
      { id: 2, name: 'Bob', city: 'London' },
      { id: 4, city: 'Tokyo' },
    ]);
  });

  it('innerJoin', () => {
    const res = innerJoin(left, right, 'id');

    expect(res).toEqual([
      { id: 1, name: 'Alice', city: 'Paris' },
      { id: 2, name: 'Bob', city: 'London' },
    ]);
  });

  it('fullJoin', () => {
    const res = fullJoin(left, right, 'id');

    expect(res).toEqual([
      { id: 1, name: 'Alice', city: 'Paris' },
      { id: 2, name: 'Bob', city: 'London' },
      { id: 3, name: 'Charlie' },
      { id: 4, city: 'Tokyo' },
    ]);
  });

  it('crossJoin', () => {
    const res = crossJoin(left, right);

    expect(res).toEqual([
      { id: 1, name: 'Alice', city: 'Paris' },
      { id: 2, name: 'Alice', city: 'London' },
      { id: 4, name: 'Alice', city: 'Tokyo' },

      { id: 1, name: 'Bob', city: 'Paris' },
      { id: 2, name: 'Bob', city: 'London' },
      { id: 4, name: 'Bob', city: 'Tokyo' },

      { id: 1, name: 'Charlie', city: 'Paris' },
      { id: 2, name: 'Charlie', city: 'London' },
      { id: 4, name: 'Charlie', city: 'Tokyo' },
    ]);
  });

  it('handles no matches correctly', () => {
    const res = leftJoin(
      [{ id: 10, name: 'X' }],
      [{ id: 20, city: 'Y' }],
      'id'
    );

    expect(res).toEqual([{ id: 10, name: 'X' }]);
  });

  it('handles empty inputs', () => {
    expect(leftJoin([], right, 'id')).toEqual([]);
    expect(rightJoin(left, [], 'id')).toEqual([]);
    expect(innerJoin([], right, 'id')).toEqual([]);
    expect(fullJoin([], [], 'id')).toEqual([]);
    expect(crossJoin([], [])).toEqual([]);
  });

  it('supports multi-key joins', () => {
    const a = [
      { id: 1, type: 'A', value: 10 },
      { id: 2, type: 'B', value: 20 },
    ];

    const b = [
      { id: 1, type: 'A', city: 'Paris' },
      { id: 2, type: 'X', city: 'London' },
    ];

    const res = leftJoin(a, b, 'id', 'type');

    expect(res).toEqual([
      { id: 1, type: 'A', value: 10, city: 'Paris' },
      { id: 2, type: 'B', value: 20 },
    ]);
  });
});

const leftMK: {
  id: number;
  type: string;
  name: string;
}[] = [
  { id: 1, type: 'A', name: 'Alice' },
  { id: 1, type: 'B', name: 'WrongTypeMatch' },
  { id: 2, type: 'A', name: 'Bob' },
];

const rightMK: {
  id: number;
  type: string;
  city: string;
}[] = [
  { id: 1, type: 'A', city: 'Paris' }, // match
  { id: 1, type: 'B', city: 'London' }, // match different row
  { id: 2, type: 'X', city: 'Tokyo' }, // no match (type mismatch)
];

describe('multi-key joins', () => {
  it('leftJoin matches on composite keys', () => {
    const res = leftJoin(leftMK, rightMK, 'id', 'type');

    expect(res).toEqual([
      { id: 1, type: 'A', name: 'Alice', city: 'Paris' },
      { id: 1, type: 'B', name: 'WrongTypeMatch', city: 'London' },
      { id: 2, type: 'A', name: 'Bob' },
    ]);
  });

  it('innerJoin respects full key match only', () => {
    const res = innerJoin(leftMK, rightMK, 'id', 'type');

    expect(res).toEqual([
      { id: 1, type: 'A', name: 'Alice', city: 'Paris' },
      { id: 1, type: 'B', name: 'WrongTypeMatch', city: 'London' },
    ]);
  });

  it('rightJoin works with composite keys', () => {
    const res = rightJoin(leftMK, rightMK, 'id', 'type');

    expect(res).toEqual([
      { id: 1, type: 'A', name: 'Alice', city: 'Paris' },
      { id: 1, type: 'B', name: 'WrongTypeMatch', city: 'London' },
      { id: 2, type: 'X', city: 'Tokyo' },
    ]);
  });

  it('fullJoin includes unmatched rows from both sides', () => {
    const res = fullJoin(leftMK, rightMK, 'id', 'type');

    expect(res).toEqual([
      { id: 1, type: 'A', name: 'Alice', city: 'Paris' },
      { id: 1, type: 'B', name: 'WrongTypeMatch', city: 'London' },
      { id: 2, type: 'A', name: 'Bob' },
      { id: 2, type: 'X', city: 'Tokyo' },
    ]);
  });

  it('does NOT match when only one key matches', () => {
    const res = innerJoin(leftMK, rightMK, 'id', 'type');

    const badMatch = res.find((r) => r.name === 'Bob' && 'city' in r);

    expect(badMatch).toBeUndefined();
  });
});
