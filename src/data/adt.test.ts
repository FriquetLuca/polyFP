import { describe, it, expect } from 'vitest';
import { createADT, schemaADT } from './adt';
import { z } from 'zod';

const Shape = createADT('kind')({
  circle: { radius: 0 },
  square: { size: 0 },
});

describe('ADT.new', () => {
  it('should create a circle with correct tag and use the default value', () => {
    const Shape = createADT('kind')({
      circle: { radius: 0 },
      square: { size: 0 },
    });

    const c = Shape.new.circle({});

    expect(c).toEqual({
      kind: 'circle',
      radius: 0,
    });
  });

  it('should create a circle with correct tag and merged values', () => {
    const c = Shape.new.circle({ radius: 10 });

    expect(c).toEqual({
      kind: 'circle',
      radius: 10,
    });
  });

  it('should create a square with correct tag and merged values', () => {
    const s = Shape.new.square({ size: 5 });

    expect(s).toEqual({
      kind: 'square',
      size: 5,
    });
  });

  it('should use constructor key as tag value', () => {
    const c = Shape.new.circle({ radius: 1 });
    const s = Shape.new.square({ size: 1 });

    expect(c.kind).toBe('circle');
    expect(s.kind).toBe('square');
  });

  it('should merge default shape with provided value', () => {
    const s = Shape.new.square({ size: 10 });

    expect(s).toEqual({
      kind: 'square',
      size: 10,
    });
  });
});

describe('ADT.is', () => {
  it('returns true for matching kind (circle)', () => {
    const c = Shape.new.circle({ radius: 10 });

    expect(Shape.is(c, 'circle')).toBe(true);
    expect(Shape.is(c, 'square')).toBe(false);
  });
  it('returns true for matching kind (square)', () => {
    const s = Shape.new.square({ size: 5 });

    expect(Shape.is(s, 'square')).toBe(true);
    expect(Shape.is(s, 'circle')).toBe(false);
  });
});

describe('ADT.match', () => {
  it('should match circle variant correctly', () => {
    const circle = Shape.new.circle({ radius: 10 });

    const result = Shape.match(circle, {
      circle: (c) => c.radius * 2,
      square: (s) => s.size * 4,
    });

    expect(result).toBe(20);
  });
  it('should match square variant correctly', () => {
    const square = Shape.new.square({ size: 5 });

    const result = Shape.match(square, {
      circle: (c) => c.radius * 2,
      square: (s) => s.size * 4,
    });

    expect(result).toBe(20);
  });
});

describe('ADT consistency', () => {
  it('is and match should agree on variant', () => {
    const value = Shape.new.circle({ radius: 7 });

    expect(Shape.is(value, 'circle')).toBe(true);

    const result = Shape.match(value, {
      circle: (c) => c.radius,
      square: () => 0,
    });

    expect(result).toBe(7);
  });
});

describe('ADT safety', () => {
  it('should handle unknown runtime tag safely', () => {
    const fake = {
      kind: 'triangle',
      side: 10,
    } as unknown as { kind: 'circle'; radius: number };

    expect(() =>
      Shape.match(fake, {
        circle: () => 1,
        square: () => 2,
      })
    ).toThrow();
  });
});

const SchemaShape = schemaADT('kind')({
  circle: z.object({
    radius: z.number().default(10),
  }),

  square: z.object({
    size: z.number(),
  }),
});

describe('schemaADT', () => {
  it('builds a valid circle', () => {
    const c = SchemaShape.new.circle({});

    expect(c.unwrap()).toEqual({
      kind: 'circle',
      radius: 10,
    });
  });

  it('builds a valid square', () => {
    const s = SchemaShape.new.square({ size: 5 });

    expect(s.unwrap()).toEqual({
      kind: 'square',
      size: 5,
    });
  });

  it('match works for square', () => {
    const res = SchemaShape.new.square({ size: 5 });

    if (!res.isOk()) throw new Error('invalid test setup');

    const out = Shape.match(res.unwrap(), {
      circle: (c) => c.radius * 2,
      square: (s) => s.size * 4,
    });

    expect(out).toBe(20);
  });

  it('fails validation for invalid square', () => {
    const res = SchemaShape.new.square({ size: null as unknown as undefined });

    expect(res.isOk()).toBe(false);
  });

  it('is detects square', () => {
    const res = SchemaShape.new.square({ size: 10 });

    if (!res.isOk()) throw new Error('invalid test setup');

    expect(Shape.is(res.unwrap(), 'square')).toBe(true);
    expect(Shape.is(res.unwrap(), 'circle')).toBe(false);
  });
});
