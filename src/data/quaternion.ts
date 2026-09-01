import { Matrix } from './matrix.js';
import { Vector } from './vector.js';

export class Quaternion {
  readonly w: number;
  readonly x: number;
  readonly y: number;
  readonly z: number;
  constructor(w: number, x: number, y: number, z: number) {
    this.w = w;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static identity(): Quaternion {
    return new Quaternion(1, 0, 0, 0);
  }

  static fromEulerAngle(x: number, y: number, z: number) {
    const num6 = Math.sin(z * 0.5);
    const num5 = Math.cos(z * 0.5);
    const num4 = Math.sin(x * 0.5);
    const num3 = Math.cos(x * 0.5);
    const num2 = Math.sin(y * 0.5);
    const num1 = Math.cos(y * 0.5);
    const num14 = num1 * num4;
    const num13 = num1 * num3;
    const num23 = num2 * num3;
    const num24 = num2 * num4;
    return new Quaternion(
      num13 * num5 + num24 * num6,
      num14 * num5 + num23 * num6,
      num23 * num5 - num14 * num6,
      num13 * num6 - num24 * num5
    );
  }

  // axis must be a unit vector [x, y, z]; angle in radians
  static fromAxisAngle(
    axis: [number, number, number],
    angle: number
  ): Quaternion {
    const [ax, ay, az] = axis;
    const length = Math.hypot(ax, ay, az);
    if (length === 0) {
      throw new Error('Quaternion.fromAxisAngle: axis cannot be a zero vector');
    }
    const [nx, ny, nz] = [ax / length, ay / length, az / length];
    const half = angle / 2;
    const s = Math.sin(half);
    return new Quaternion(Math.cos(half), nx * s, ny * s, nz * s);
  }

  // Hamilton product — NOT commutative, order matters: this rotation
  // applied first, then `other`'s, when composing rotations as other.multiply(this)
  multiply(other: Quaternion): Quaternion {
    return new Quaternion(
      this.w * other.w - this.x * other.x - this.y * other.y - this.z * other.z,
      this.w * other.x + this.x * other.w + this.y * other.z - this.z * other.y,
      this.w * other.y - this.x * other.z + this.y * other.w + this.z * other.x,
      this.w * other.z + this.x * other.y - this.y * other.x + this.z * other.w
    );
  }

  conjugate(): Quaternion {
    return new Quaternion(this.w, -this.x, -this.y, -this.z);
  }

  norm(): number {
    return Math.hypot(this.w, this.x, this.y, this.z);
  }

  normalize(): Quaternion {
    const n = this.norm();
    if (n === 0) {
      throw new Error('Quaternion: cannot normalize a zero quaternion');
    }
    return new Quaternion(this.w / n, this.x / n, this.y / n, this.z / n);
  }

  // For unit quaternions, inverse === conjugate (cheaper); this handles
  // the general case too, in case someone calls it on a non-unit quaternion.
  inverse(): Quaternion {
    const n = this.norm();
    if (n === 0) {
      throw new Error('Quaternion: cannot invert a zero quaternion');
    }
    const nSq = n * n;
    const conj = this.conjugate();
    return new Quaternion(
      conj.w / nSq,
      conj.x / nSq,
      conj.y / nSq,
      conj.z / nSq
    );
  }

  // Rotates a 3D vector by this quaternion (assumes `this` is a unit
  // quaternion — normalize first if it might not be).
  rotateVector(v: [number, number, number]): [number, number, number] {
    const p = new Quaternion(0, v[0], v[1], v[2]);
    const result = this.multiply(p).multiply(this.conjugate());
    return [result.x, result.y, result.z];
  }

  toMatrix(): Matrix {
    const { w, x, y, z } = this.normalize();
    return Matrix.fromArray([
      [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
      [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
      [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)],
    ]);
  }

  toEulerAngle(): Vector {
    const sqrX = this.x * this.x;
    return new Vector(
      Math.asin(2 * (this.w * this.x - this.y * this.z)),
      Math.atan2(
        2 * (this.w * this.y + this.z * this.x),
        1 - 2 * (sqrX + this.y * this.y)
      ),
      Math.atan2(
        2 * (this.w * this.z + this.x * this.y),
        1 - 2 * (this.z * this.z + sqrX)
      )
    );
  }

  equals(other: Quaternion, epsilon = 1e-9): boolean {
    return (
      Math.abs(this.w - other.w) <= epsilon &&
      Math.abs(this.x - other.x) <= epsilon &&
      Math.abs(this.y - other.y) <= epsilon &&
      Math.abs(this.z - other.z) <= epsilon
    );
  }

  static angle(a: Quaternion, b: Quaternion): number {
    return Math.acos(Math.min(Math.abs(Quaternion.dot(a, b)), 1)) * 2;
  }

  // Spherical linear interpolation between two unit quaternions, t in [0, 1]
  static slerp(a: Quaternion, b: Quaternion, t: number): Quaternion {
    let { w, x, y, z } = b;
    let dot = a.w * w + a.x * x + a.y * y + a.z * z;

    // If the dot product is negative, slerp won't take the shorter path.
    // Negate one quaternion to fix (q and -q represent the same rotation).
    if (dot < 0) {
      dot = -dot;
      w = -w;
      x = -x;
      y = -y;
      z = -z;
    }

    const DOT_THRESHOLD = 0.9995;
    if (dot > DOT_THRESHOLD) {
      // Nearly identical rotations — linear interpolation avoids
      // a division-by-near-zero in the sin-based formula below.
      return new Quaternion(
        a.w + t * (w - a.w),
        a.x + t * (x - a.x),
        a.y + t * (y - a.y),
        a.z + t * (z - a.z)
      ).normalize();
    }

    const theta0 = Math.acos(dot);
    const theta = theta0 * t;
    const sinTheta0 = Math.sin(theta0);
    const s0 = Math.cos(theta) - (dot * Math.sin(theta)) / sinTheta0;
    const s1 = Math.sin(theta) / sinTheta0;

    return new Quaternion(
      s0 * a.w + s1 * w,
      s0 * a.x + s1 * x,
      s0 * a.y + s1 * y,
      s0 * a.z + s1 * z
    );
  }

  static dot(a: Quaternion, b: Quaternion): number {
    return a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
  }

  static concatenate(first: Quaternion, second: Quaternion): Quaternion {
    return second.multiply(first);
  }

  add(other: Quaternion): Quaternion {
    return new Quaternion(
      this.w + other.w,
      this.x + other.x,
      this.y + other.y,
      this.z + other.z
    );
  }

  subtract(other: Quaternion): Quaternion {
    return new Quaternion(
      this.w - other.w,
      this.x - other.x,
      this.y - other.y,
      this.z - other.z
    );
  }

  divide(other: Quaternion): Quaternion {
    return this.multiply(other.inverse());
  }

  static rotateTowards(
    from: Quaternion,
    to: Quaternion,
    maxRadians: number
  ): Quaternion {
    const angle = Quaternion.angle(from, to);
    if (angle === 0) return to;
    if (maxRadians >= angle) return to;
    return Quaternion.slerp(from, to, Math.max(0, maxRadians) / angle);
  }

  static fromMatrix(m: Matrix): Quaternion {
    if (m.rows !== 3 || m.cols !== 3) {
      throw new Error('Quaternion.fromMatrix: expected a 3x3 rotation matrix');
    }

    const m00 = m.get(0, 0),
      m01 = m.get(0, 1),
      m02 = m.get(0, 2);
    const m10 = m.get(1, 0),
      m11 = m.get(1, 1),
      m12 = m.get(1, 2);
    const m20 = m.get(2, 0),
      m21 = m.get(2, 1),
      m22 = m.get(2, 2);

    const trace = m00 + m11 + m22;

    if (trace > 0) {
      const s = Math.sqrt(trace + 1) * 2; // s = 4w
      return new Quaternion(
        0.25 * s,
        (m21 - m12) / s,
        (m02 - m20) / s,
        (m10 - m01) / s
      );
    }
    if (m00 > m11 && m00 > m22) {
      const s = Math.sqrt(1 + m00 - m11 - m22) * 2; // s = 4x
      return new Quaternion(
        (m21 - m12) / s,
        0.25 * s,
        (m01 + m10) / s,
        (m02 + m20) / s
      );
    }
    if (m11 > m22) {
      const s = Math.sqrt(1 + m11 - m00 - m22) * 2; // s = 4y
      return new Quaternion(
        (m02 - m20) / s,
        (m01 + m10) / s,
        0.25 * s,
        (m12 + m21) / s
      );
    }
    const s = Math.sqrt(1 + m22 - m00 - m11) * 2; // s = 4z
    return new Quaternion(
      (m10 - m01) / s,
      (m02 + m20) / s,
      (m12 + m21) / s,
      0.25 * s
    );
  }

  private static cross(
    a: [number, number, number],
    b: [number, number, number]
  ): [number, number, number] {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ];
  }

  private static normalize3(
    v: [number, number, number]
  ): [number, number, number] {
    const len = Math.hypot(...v);
    if (len < 1e-12) {
      throw new Error(
        'Quaternion.lookRotation: cannot normalize a zero-length vector'
      );
    }
    return [v[0] / len, v[1] / len, v[2] / len];
  }

  static lookRotation(
    forward: [number, number, number],
    up: [number, number, number] = [0, 1, 0]
  ): Quaternion {
    const f = Quaternion.normalize3(forward);

    let right = Quaternion.cross(up, f);
    if (Math.hypot(...right) < 1e-9) {
      // forward is parallel (or anti-parallel) to the up hint — pick a
      // fallback hint so we don't divide by a near-zero-length vector
      const fallbackUp: [number, number, number] =
        Math.abs(f[1]) < 0.99 ? [0, 1, 0] : [1, 0, 0];
      right = Quaternion.cross(fallbackUp, f);
    }
    right = Quaternion.normalize3(right);
    const correctedUp = Quaternion.cross(f, right);

    const m = Matrix.fromArray([
      [right[0], correctedUp[0], f[0]],
      [right[1], correctedUp[1], f[1]],
      [right[2], correctedUp[2], f[2]],
    ]);

    return Quaternion.fromMatrix(m);
  }

  static lerp(a: Quaternion, b: Quaternion, t: number): Quaternion {
    let { w, x, y, z } = b;
    const dot = a.w * w + a.x * x + a.y * y + a.z * z;

    // Same shortest-path fix as slerp: q and -q are the same rotation, so
    // negate one side if they're more than 90 degrees apart as 4-vectors,
    // otherwise lerp would blend "the long way around".
    if (dot < 0) {
      w = -w;
      x = -x;
      y = -y;
      z = -z;
    }

    return new Quaternion(
      a.w + t * (w - a.w),
      a.x + t * (x - a.x),
      a.y + t * (y - a.y),
      a.z + t * (z - a.z)
    ).normalize();
  }
}
