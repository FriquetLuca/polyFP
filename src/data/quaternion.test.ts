import { describe, it, expect } from 'vitest';
import { Quaternion } from './quaternion';
import { Matrix } from './matrix';

function expectClose(a: number, b: number, epsilon = 1e-9) {
  expect(Math.abs(a - b)).toBeLessThanOrEqual(epsilon);
}

function expectVectorClose(
  a: [number, number, number],
  b: [number, number, number],
  epsilon = 1e-6
) {
  expectClose(a[0], b[0], epsilon);
  expectClose(a[1], b[1], epsilon);
  expectClose(a[2], b[2], epsilon);
}

describe('Quaternion construction', () => {
  it('identity() is (1, 0, 0, 0)', () => {
    const q = Quaternion.identity();
    expect(q.w).toBe(1);
    expect(q.x).toBe(0);
    expect(q.y).toBe(0);
    expect(q.z).toBe(0);
  });

  it('fromAxisAngle produces a unit quaternion', () => {
    const q = Quaternion.fromAxisAngle([0, 1, 0], Math.PI / 2);
    expectClose(q.norm(), 1);
  });

  it('normalizes a non-unit axis before building the quaternion', () => {
    const a = Quaternion.fromAxisAngle([0, 5, 0], Math.PI / 2);
    const b = Quaternion.fromAxisAngle([0, 1, 0], Math.PI / 2);
    expect(a.equals(b)).toBe(true);
  });

  it('throws when given a zero-length axis', () => {
    expect(() => Quaternion.fromAxisAngle([0, 0, 0], Math.PI / 2)).toThrow();
  });
});

describe('Quaternion.multiply', () => {
  it('identity is a multiplicative identity', () => {
    const q = Quaternion.fromAxisAngle([1, 0, 0], 0.7);
    const id = Quaternion.identity();
    expect(q.multiply(id).equals(q)).toBe(true);
    expect(id.multiply(q).equals(q)).toBe(true);
  });

  it('is not commutative in general', () => {
    const a = Quaternion.fromAxisAngle([1, 0, 0], Math.PI / 2);
    const b = Quaternion.fromAxisAngle([0, 1, 0], Math.PI / 2);
    expect(a.multiply(b).equals(b.multiply(a))).toBe(false);
  });
});

describe('Quaternion.conjugate / norm / normalize / inverse', () => {
  it('conjugate negates the vector part only', () => {
    const q = new Quaternion(1, 2, 3, 4);
    const c = q.conjugate();
    expect(c.w).toBe(1);
    expect(c.x).toBe(-2);
    expect(c.y).toBe(-3);
    expect(c.z).toBe(-4);
  });

  it('norm is the Euclidean length of the 4-vector', () => {
    const q = new Quaternion(0, 3, 4, 0);
    expect(q.norm()).toBe(5);
  });

  it('normalize produces a unit quaternion', () => {
    const q = new Quaternion(0, 3, 4, 0).normalize();
    expectClose(q.norm(), 1);
  });

  it('throws when normalizing a zero quaternion', () => {
    expect(() => new Quaternion(0, 0, 0, 0).normalize()).toThrow();
  });

  it('q * q.inverse() is (approximately) the identity', () => {
    const q = Quaternion.fromAxisAngle([1, 2, 3], 1.2);
    const result = q.multiply(q.inverse());
    expect(result.equals(Quaternion.identity(), 1e-9)).toBe(true);
  });

  it('throws when inverting a zero quaternion', () => {
    expect(() => new Quaternion(0, 0, 0, 0).inverse()).toThrow();
  });
});

describe('Quaternion.rotateVector', () => {
  it('a 90-degree rotation about Z maps X onto Y', () => {
    const q = Quaternion.fromAxisAngle([0, 0, 1], Math.PI / 2);
    const [x, y, z] = q.rotateVector([1, 0, 0]);
    expectClose(x, 0);
    expectClose(y, 1);
    expectClose(z, 0);
  });

  it('the identity quaternion leaves vectors unchanged', () => {
    const [x, y, z] = Quaternion.identity().rotateVector([3, -2, 7]);
    expect([x, y, z]).toEqual([3, -2, 7]);
  });

  it('rotation preserves vector length', () => {
    const q = Quaternion.fromAxisAngle([1, 1, 1], 0.8);
    const original = [2, -3, 5];
    const rotated = q.rotateVector(original as [number, number, number]);
    const originalLength = Math.hypot(...original);
    const rotatedLength = Math.hypot(...rotated);
    expectClose(originalLength, rotatedLength, 1e-9);
  });
});

describe('Quaternion.toMatrix', () => {
  it('identity quaternion produces the 3x3 identity matrix', () => {
    const m = Quaternion.identity().toMatrix();
    expect(m.toArray()).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });

  it('produces a matrix that rotates vectors identically to rotateVector', () => {
    const q = Quaternion.fromAxisAngle([0, 1, 0], Math.PI / 3);
    const m = q.toMatrix();

    const v: [number, number, number] = [1, 2, 3];
    const viaQuaternion = q.rotateVector(v);
    const viaMatrix = m.multiply(Matrix.fromArray([[v[0]], [v[1]], [v[2]]]));

    expectClose(viaMatrix.get(0, 0), viaQuaternion[0], 1e-9);
    expectClose(viaMatrix.get(1, 0), viaQuaternion[1], 1e-9);
    expectClose(viaMatrix.get(2, 0), viaQuaternion[2], 1e-9);
  });
});

describe('Quaternion.slerp', () => {
  it('returns the start quaternion at t=0', () => {
    const a = Quaternion.fromAxisAngle([1, 0, 0], 0);
    const b = Quaternion.fromAxisAngle([1, 0, 0], Math.PI / 2);
    expect(Quaternion.slerp(a, b, 0).equals(a, 1e-6)).toBe(true);
  });

  it('returns the end quaternion at t=1', () => {
    const a = Quaternion.fromAxisAngle([1, 0, 0], 0);
    const b = Quaternion.fromAxisAngle([1, 0, 0], Math.PI / 2);
    expect(Quaternion.slerp(a, b, 1).equals(b, 1e-6)).toBe(true);
  });

  it('interpolates halfway to a known midpoint rotation', () => {
    const a = Quaternion.identity();
    const b = Quaternion.fromAxisAngle([0, 0, 1], Math.PI);
    const mid = Quaternion.slerp(a, b, 0.5);
    const expected = Quaternion.fromAxisAngle([0, 0, 1], Math.PI / 2);
    expect(mid.equals(expected, 1e-6)).toBe(true);
  });

  it('always returns a unit quaternion', () => {
    const a = Quaternion.fromAxisAngle([1, 0, 0], 0.1);
    const b = Quaternion.fromAxisAngle([0, 1, 0], 2.5);
    const mid = Quaternion.slerp(a, b, 0.37);
    expectClose(mid.norm(), 1, 1e-6);
  });

  it('takes the shorter path when the dot product is negative', () => {
    const a = Quaternion.fromAxisAngle([0, 0, 1], 0.1);
    const b = new Quaternion(-a.w, -a.x, -a.y, -a.z); // same rotation, negated (q and -q are equivalent)
    const mid = Quaternion.slerp(a, b, 0.5);
    // should stay close to `a`'s rotation, not swing the "long way around"
    expect(mid.equals(a, 1e-6)).toBe(true);
  });
});

describe('Quaternion.fromEulerAngle / toEulerAngle', () => {
  it('round-trips a simple rotation about a single axis (yaw only)', () => {
    const q = Quaternion.fromEulerAngle(0, 0.4, 0);
    const euler = q.toEulerAngle();
    expectClose(euler.get(1), 0.4, 1e-5);
    expectClose(euler.get(0), 0, 1e-5);
    expectClose(euler.get(2), 0, 1e-5);
  });

  it('round-trips a rotation about the X axis (pitch only)', () => {
    const q = Quaternion.fromEulerAngle(0.3, 0, 0);
    const euler = q.toEulerAngle();
    expectClose(euler.get(0), 0.3, 1e-5);
  });

  it('round-trips a rotation about the Z axis (roll only)', () => {
    const q = Quaternion.fromEulerAngle(0, 0, 0.6);
    const euler = q.toEulerAngle();
    expectClose(euler.get(2), 0.6, 1e-5);
  });

  it('fromEulerAngle(0,0,0) is the identity quaternion', () => {
    const q = Quaternion.fromEulerAngle(0, 0, 0);
    expect(q.equals(Quaternion.identity())).toBe(true);
  });

  it('produces a unit quaternion for arbitrary angles', () => {
    const q = Quaternion.fromEulerAngle(0.5, -1.2, 2.1);
    expectClose(q.norm(), 1, 1e-9);
  });

  it('round-trips combined pitch/yaw/roll away from the gimbal-lock singularity', () => {
    // Kept well clear of pitch = +-PI/2, where yaw/roll become coupled
    // and toEulerAngle can legitimately return a different (but
    // equivalent) angle decomposition.
    const [x, y, z] = [0.2, 0.3, 0.15];
    const q = Quaternion.fromEulerAngle(x, y, z);
    const euler = q.toEulerAngle();
    expectClose(euler.get(0), x, 1e-5);
    expectClose(euler.get(1), y, 1e-5);
    expectClose(euler.get(2), z, 1e-5);
  });
});

describe('Quaternion.dot', () => {
  it('is 1 for a quaternion dotted with itself (unit quaternion)', () => {
    const q = Quaternion.fromAxisAngle([0, 1, 0], 0.7);
    expectClose(Quaternion.dot(q, q), 1, 1e-9);
  });

  it('is 1 for two identical unit quaternions', () => {
    const q = Quaternion.identity();
    expectClose(Quaternion.dot(q, q), 1, 1e-9);
  });

  it('is 0 for two orthogonal unit quaternions (as 4-vectors)', () => {
    const a = new Quaternion(1, 0, 0, 0);
    const b = new Quaternion(0, 1, 0, 0);
    expectClose(Quaternion.dot(a, b), 0, 1e-9);
  });

  it('is symmetric: dot(a, b) === dot(b, a)', () => {
    const a = Quaternion.fromAxisAngle([1, 0, 0], 0.4);
    const b = Quaternion.fromAxisAngle([0, 0, 1], 1.1);
    expectClose(Quaternion.dot(a, b), Quaternion.dot(b, a), 1e-12);
  });
});

describe('Quaternion.angle (now built on dot)', () => {
  it('is 0 between a quaternion and itself', () => {
    const q = Quaternion.fromAxisAngle([0, 1, 0], 0.9);
    expectClose(Quaternion.angle(q, q), 0, 1e-6);
  });

  it('matches the original rotation angle for two rotations about the same axis', () => {
    const a = Quaternion.fromAxisAngle([0, 1, 0], 0.2);
    const b = Quaternion.fromAxisAngle([0, 1, 0], 0.9);
    expectClose(Quaternion.angle(a, b), 0.7, 1e-6);
  });

  it('treats q and -q as the same rotation (angle 0)', () => {
    const q = Quaternion.fromAxisAngle([1, 0, 0], 0.5);
    const negated = new Quaternion(-q.w, -q.x, -q.y, -q.z);
    expectClose(Quaternion.angle(q, negated), 0, 1e-6);
  });
});

describe('Quaternion.concatenate', () => {
  it('applying first then second matches manual multiply(second, first) order', () => {
    const first = Quaternion.fromAxisAngle([0, 1, 0], Math.PI / 2);
    const second = Quaternion.fromAxisAngle([1, 0, 0], Math.PI / 4);
    const combined = Quaternion.concatenate(first, second);
    expect(combined.equals(second.multiply(first))).toBe(true);
  });

  it('rotating a vector through concatenate matches rotating through each step separately', () => {
    const first = Quaternion.fromAxisAngle([0, 0, 1], Math.PI / 2);
    const second = Quaternion.fromAxisAngle([1, 0, 0], Math.PI / 2);
    const combined = Quaternion.concatenate(first, second);

    const v: [number, number, number] = [1, 0, 0];
    const stepwise = second.rotateVector(first.rotateVector(v));
    const direct = combined.rotateVector(v);

    expectVectorClose(stepwise, direct);
  });

  it('concatenating with identity on either side is a no-op', () => {
    const q = Quaternion.fromAxisAngle([0, 1, 0], 0.6);
    const id = Quaternion.identity();
    expect(Quaternion.concatenate(id, q).equals(q)).toBe(true);
    expect(Quaternion.concatenate(q, id).equals(q)).toBe(true);
  });

  it('is order-sensitive (not commutative in general)', () => {
    const a = Quaternion.fromAxisAngle([1, 0, 0], Math.PI / 2);
    const b = Quaternion.fromAxisAngle([0, 1, 0], Math.PI / 2);
    expect(
      Quaternion.concatenate(a, b).equals(Quaternion.concatenate(b, a))
    ).toBe(false);
  });
});

describe('Quaternion.add / subtract', () => {
  it('adds componentwise', () => {
    const a = new Quaternion(1, 2, 3, 4);
    const b = new Quaternion(5, 6, 7, 8);
    const result = a.add(b);
    expect(result.w).toBe(6);
    expect(result.x).toBe(8);
    expect(result.y).toBe(10);
    expect(result.z).toBe(12);
  });

  it('subtracts componentwise', () => {
    const a = new Quaternion(5, 6, 7, 8);
    const b = new Quaternion(1, 2, 3, 4);
    const result = a.subtract(b);
    expect(result.w).toBe(4);
    expect(result.x).toBe(4);
    expect(result.y).toBe(4);
    expect(result.z).toBe(4);
  });

  it('subtract is the inverse of add', () => {
    const a = new Quaternion(1, 2, 3, 4);
    const b = new Quaternion(0.5, -1, 2, 0.25);
    const result = a.add(b).subtract(b);
    expect(result.equals(a, 1e-12)).toBe(true);
  });

  it('a - a is the zero quaternion', () => {
    const a = new Quaternion(3, -1, 2, 5);
    const result = a.subtract(a);
    expect(result.w).toBe(0);
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
    expect(result.z).toBe(0);
  });

  it('the sum of two unit quaternions is generally not itself a unit quaternion', () => {
    const a = Quaternion.identity();
    const b = Quaternion.fromAxisAngle([0, 1, 0], Math.PI / 2);
    const sum = a.add(b);
    expect(Math.abs(sum.norm() - 1)).toBeGreaterThan(1e-6);
  });
});

describe('Quaternion.divide', () => {
  it('a.divide(b).multiply(b) recovers a', () => {
    const a = Quaternion.fromAxisAngle([0, 1, 0], 0.8);
    const b = Quaternion.fromAxisAngle([1, 0, 0], 1.3);
    const result = a.divide(b).multiply(b);
    expect(result.equals(a, 1e-9)).toBe(true);
  });

  it('a.divide(a) is the identity', () => {
    const a = Quaternion.fromAxisAngle([1, 1, 0], 0.5);
    const result = a.divide(a);
    expect(result.equals(Quaternion.identity(), 1e-9)).toBe(true);
  });

  it('dividing by the identity is a no-op', () => {
    const a = Quaternion.fromAxisAngle([0, 0, 1], 0.4);
    const result = a.divide(Quaternion.identity());
    expect(result.equals(a, 1e-9)).toBe(true);
  });

  it('matches the reference C#-style implementation term-for-term on arbitrary quaternions', () => {
    // Direct port of the XNA/Unity `operator /` formula, kept independent
    // of divide()'s own multiply()/inverse() implementation, so this
    // test can't pass merely because both paths share a bug.
    function referenceDivide(q1: Quaternion, q2: Quaternion): Quaternion {
      const num5 = 1 / (q2.x * q2.x + q2.y * q2.y + q2.z * q2.z + q2.w * q2.w);
      const num4 = -q2.x * num5;
      const num3 = -q2.y * num5;
      const num2 = -q2.z * num5;
      const num = q2.w * num5;
      const num13 = q1.y * num2 - q1.z * num3;
      const num12 = q1.z * num4 - q1.x * num2;
      const num11 = q1.x * num3 - q1.y * num4;
      const num10 = q1.x * num4 + q1.y * num3 + q1.z * num2;
      return new Quaternion(
        q1.w * num - num10,
        q1.x * num + num4 * q1.w + num13,
        q1.y * num + num3 * q1.w + num12,
        q1.z * num + num2 * q1.w + num11
      );
    }

    const a = new Quaternion(0.5, 1.2, -0.7, 2.1);
    const b = new Quaternion(1.1, -0.3, 0.9, 0.4);

    const expected = referenceDivide(a, b);
    const actual = a.divide(b);

    expect(actual.equals(expected, 1e-9)).toBe(true);
  });

  it('throws when dividing by a zero quaternion (inverse is undefined)', () => {
    const a = Quaternion.identity();
    const zero = new Quaternion(0, 0, 0, 0);
    expect(() => a.divide(zero)).toThrow();
  });
});

describe('Quaternion.rotateTowards', () => {
  const from = Quaternion.fromAxisAngle([0, 1, 0], 0.2);
  const to = Quaternion.fromAxisAngle([0, 1, 0], 1.2); // 1.0 rad apart

  it('returns `from` unchanged when maxRadians is 0', () => {
    const result = Quaternion.rotateTowards(from, to, 0);
    expect(result.equals(from, 1e-9)).toBe(true);
  });

  it('returns `to` exactly when maxRadians exceeds the angle between them', () => {
    const result = Quaternion.rotateTowards(from, to, 10);
    expect(result.equals(to, 1e-6)).toBe(true);
  });

  it('returns `to` exactly when maxRadians equals the angle between them', () => {
    const result = Quaternion.rotateTowards(from, to, 1.0);
    expect(result.equals(to, 1e-5)).toBe(true);
  });

  it('moves partway, by exactly maxRadians, when the step is smaller than the total angle', () => {
    const result = Quaternion.rotateTowards(from, to, 0.3);
    const stepped = Quaternion.angle(from, result);
    const remaining = Quaternion.angle(result, to);
    expectClose(stepped, 0.3, 1e-4);
    expectClose(stepped + remaining, 1.0, 1e-4);
  });

  it('returns `to` unchanged when from and to are already identical', () => {
    const result = Quaternion.rotateTowards(from, from, 0.5);
    expect(result.equals(from, 1e-9)).toBe(true);
  });

  it('clamps a negative maxRadians to 0 rather than stepping backwards', () => {
    const result = Quaternion.rotateTowards(from, to, -0.5);
    expect(result.equals(from, 1e-9)).toBe(true);
  });
});

describe('Quaternion.fromMatrix', () => {
  it('recovers the identity quaternion from the identity matrix', () => {
    const q = Quaternion.fromMatrix(Matrix.identity(3));
    expect(q.equals(Quaternion.identity(), 1e-9)).toBe(true);
  });

  it('round-trips through toMatrix() for a variety of axis-angle rotations', () => {
    const cases: Array<[[number, number, number], number]> = [
      [[0, 1, 0], Math.PI / 2],
      [[1, 0, 0], Math.PI / 3],
      [[0, 0, 1], 2.5],
      [[1, 1, 1], 1.1],
    ];

    for (const [axis, angle] of cases) {
      const original = Quaternion.fromAxisAngle(axis, angle);
      const recovered = Quaternion.fromMatrix(original.toMatrix());

      // q and -q represent the same rotation, so allow either sign
      const matches =
        recovered.equals(original, 1e-6) ||
        recovered.equals(
          new Quaternion(-original.w, -original.x, -original.y, -original.z),
          1e-6
        );
      expect(matches).toBe(true);
    }
  });

  it('throws on a non-3x3 matrix', () => {
    expect(() => Quaternion.fromMatrix(Matrix.identity(4))).toThrow();
    expect(() => Quaternion.fromMatrix(Matrix.zeros(2, 3))).toThrow();
  });

  it('produces the same rotation on a vector as the original quaternion (via the recovered quaternion)', () => {
    const original = Quaternion.fromAxisAngle([0, 1, 0], 1.4);
    const recovered = Quaternion.fromMatrix(original.toMatrix());

    const v: [number, number, number] = [1, 2, 3];
    expectVectorClose(
      original.rotateVector(v),
      recovered.rotateVector(v),
      1e-5
    );
  });
});

describe('Quaternion.lookRotation', () => {
  it('is the identity when forward is +Z and up is the default +Y', () => {
    const q = Quaternion.lookRotation([0, 0, 1]);
    expect(q.equals(Quaternion.identity(), 1e-6)).toBe(true);
  });

  it('rotates world +Z onto the given forward direction', () => {
    const forward: [number, number, number] = [1, 0, 0];
    const q = Quaternion.lookRotation(forward);
    const rotatedZ = q.rotateVector([0, 0, 1]);
    expectVectorClose(rotatedZ, forward, 1e-5);
  });

  it('matches a known closed-form 90-degree rotation about Y', () => {
    // Rotating +Z to +X is exactly a +90 degree rotation about Y
    const q = Quaternion.lookRotation([1, 0, 0]);
    const expected = Quaternion.fromAxisAngle([0, 1, 0], Math.PI / 2);
    const matches =
      q.equals(expected, 1e-5) ||
      q.equals(
        new Quaternion(-expected.w, -expected.x, -expected.y, -expected.z),
        1e-5
      );
    expect(matches).toBe(true);
  });

  it('keeps the up direction close to world up when forward is horizontal', () => {
    const q = Quaternion.lookRotation([1, 0, 0], [0, 1, 0]);
    const rotatedUp = q.rotateVector([0, 1, 0]);
    expectVectorClose(rotatedUp, [0, 1, 0], 1e-5);
  });

  it('produces a valid unit quaternion even when forward is anti-parallel to up', () => {
    // forward straight up, with the default up hint — degenerate case
    // that must fall back to an alternate hint internally rather than
    // dividing by a near-zero-length cross product
    const q = Quaternion.lookRotation([0, 1, 0], [0, 1, 0]);
    expectClose(q.norm(), 1, 1e-6);
  });

  it('produces an orthonormal basis (rotated forward/right/up stay mutually perpendicular)', () => {
    const q = Quaternion.lookRotation([0.6, 0.2, 0.77]);
    const f = q.rotateVector([0, 0, 1]);
    const r = q.rotateVector([1, 0, 0]);
    const u = q.rotateVector([0, 1, 0]);

    const dot = (a: [number, number, number], b: [number, number, number]) =>
      a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

    expectClose(dot(f, r), 0, 1e-5);
    expectClose(dot(f, u), 0, 1e-5);
    expectClose(dot(r, u), 0, 1e-5);
  });

  it('throws when forward is a zero vector', () => {
    expect(() => Quaternion.lookRotation([0, 0, 0])).toThrow();
  });
});

describe('Quaternion.lerp', () => {
  it('returns (a normalized copy of) the start quaternion at t=0', () => {
    const a = Quaternion.fromAxisAngle([1, 0, 0], 0.3);
    const b = Quaternion.fromAxisAngle([0, 1, 0], 1.5);
    const result = Quaternion.lerp(a, b, 0);
    expect(result.equals(a, 1e-9)).toBe(true);
  });

  it('returns (a normalized copy of) the end quaternion at t=1', () => {
    const a = Quaternion.fromAxisAngle([1, 0, 0], 0.3);
    const b = Quaternion.fromAxisAngle([0, 1, 0], 1.5);
    const result = Quaternion.lerp(a, b, 1);
    expect(result.equals(b, 1e-9)).toBe(true);
  });

  it('always returns a unit quaternion', () => {
    const a = Quaternion.fromAxisAngle([1, 0, 0], 0.2);
    const b = Quaternion.fromAxisAngle([0, 0, 1], 2.4);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expectClose(Quaternion.lerp(a, b, t).norm(), 1, 1e-9);
    }
  });

  it('interpolates halfway to the same known midpoint rotation as slerp, for a simple case', () => {
    // For this specific symmetric case (identity -> 180deg about Z),
    // nlerp and slerp actually agree exactly at t=0.5 — a useful
    // cross-check between the two, even though they diverge at other t
    // values in general.
    const a = Quaternion.identity();
    const b = Quaternion.fromAxisAngle([0, 0, 1], Math.PI);
    const lerped = Quaternion.lerp(a, b, 0.5);
    const slerped = Quaternion.slerp(a, b, 0.5);
    expect(lerped.equals(slerped, 1e-6)).toBe(true);
  });

  it('takes the shorter path when the dot product is negative', () => {
    const a = Quaternion.fromAxisAngle([0, 0, 1], 0.1);
    const b = new Quaternion(-a.w, -a.x, -a.y, -a.z); // same rotation, negated
    const mid = Quaternion.lerp(a, b, 0.5);
    // should stay close to `a`, not blend toward the "long way around" b
    expect(mid.equals(a, 1e-6)).toBe(true);
  });

  it('moves monotonically closer to b as t increases (angle to b shrinks)', () => {
    const a = Quaternion.fromAxisAngle([0, 1, 0], 0);
    const b = Quaternion.fromAxisAngle([0, 1, 0], 1.4);

    const angleAt = (t: number) =>
      Quaternion.angle(Quaternion.lerp(a, b, t), b);
    const angles = [0, 0.25, 0.5, 0.75, 1].map(angleAt);

    for (let i = 1; i < angles.length; i++) {
      expect(angles[i]).toBeLessThanOrEqual(angles[i - 1] + 1e-9);
    }
  });

  it('differs from slerp partway through a large-angle interpolation (nlerp is only an approximation)', () => {
    const a = Quaternion.identity();
    const b = Quaternion.fromAxisAngle([1, 0, 0], Math.PI / 2);
    const lerped = Quaternion.lerp(a, b, 0.25);
    const slerped = Quaternion.slerp(a, b, 0.25);
    expect(lerped.equals(slerped, 1e-6)).toBe(false);
  });

  it('agrees with slerp exactly at t=0.5, for any rotation (a general property, not specific to this example)', () => {
    // nlerp and slerp always coincide at the midpoint (t=0.5): normalizing
    // the midpoint of the chord between two unit quaternions always lands
    // on the same point as the arc's midpoint, by symmetry — true for
    // ANY pair of unit quaternions, not just this one.
    const a = Quaternion.identity();
    const b = Quaternion.fromAxisAngle([0, 0, 1], Math.PI);
    const lerped = Quaternion.lerp(a, b, 0.5);
    const slerped = Quaternion.slerp(a, b, 0.5);
    expect(lerped.equals(slerped, 1e-6)).toBe(true);
  });
});
