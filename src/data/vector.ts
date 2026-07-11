import { clamp } from '../math';

export class Vector {
  private items: Float32Array;
  constructor(...args: number[]) {
    this.items = new Float32Array(args);
  }
  get x(): number {
    return this.element(0);
  }
  get y(): number {
    return this.element(1);
  }
  get z(): number {
    return this.element(2);
  }
  get w(): number {
    return this.element(3);
  }
  static get zero() {
    return new Vector(0, 0, 0);
  }
  static get one() {
    return new Vector(1, 1, 1);
  }
  static get forward() {
    return new Vector(0, 0, 1);
  }
  static get back() {
    return new Vector(0, 0, -1);
  }
  static get up() {
    return new Vector(0, 1, 0);
  }
  static get down() {
    return new Vector(0, -1, 0);
  }
  static get left() {
    return new Vector(-1, 0, 0);
  }
  static get right() {
    return new Vector(1, 0, 0);
  }
  static full(value: number, dimensions: number) {
    return new Vector(...new Array(dimensions).fill(value));
  }
  element(index: number) {
    return index < this.items.length ? this.items[index] : 0;
  }
  dimensions() {
    return this.items.length;
  }
  resize(dimensions: number) {
    if (dimensions === this.items.length) return this;
    const items = [...this.items];
    while (this.items.length < dimensions) {
      items.push(0);
    }
    while (this.items.length > dimensions) {
      items.pop();
    }
    return new Vector(...items);
  }
  resizeThis(dimensions: number) {
    if (dimensions === this.items.length) return;
    const items = [...this.items];
    while (this.items.length < dimensions) {
      items.push(0);
    }
    while (this.items.length > dimensions) {
      items.pop();
    }
    this.items = new Float32Array(items);
  }
  add(amount: Vector | number) {
    if (typeof amount === 'number') {
      return new Vector(...this.items.map((i) => i + amount));
    }
    return this.mapWith(amount, (a, b) => a + b);
  }
  addThis(amount: Vector | number) {
    if (typeof amount === 'number') {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i] += amount;
      }
    } else {
      const length = Math.max(this.items.length, amount.items.length);
      this.resizeThis(length);
      for (let i = 0; i < length; i++) {
        this.items[i] += amount.element(i);
      }
    }
  }
  sub(amount: Vector | number) {
    if (typeof amount === 'number') {
      return new Vector(...this.items.map((i) => i - amount));
    }
    return this.mapWith(amount, (a, b) => a - b);
  }
  subThis(amount: Vector | number) {
    if (typeof amount === 'number') {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i] -= amount;
      }
    } else {
      const length = Math.max(this.items.length, amount.items.length);
      this.resizeThis(length);
      for (let i = 0; i < length; i++) {
        this.items[i] -= amount.element(i);
      }
    }
  }
  scale(value: number) {
    return new Vector(...this.items.map((i) => i * value));
  }
  scaleThis(value: number) {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] *= value;
    }
  }
  sqrLength() {
    return this.items.reduce((p, c) => p + c * c, 0);
  }
  length() {
    return Math.sqrt(this.sqrLength());
  }
  normalize() {
    const length = this.length();
    if (length <= Number.EPSILON) {
      return Vector.full(0, this.items.length);
    }
    const oneOverL = 1 / length;
    return new Vector(...this.items.map((i) => i * oneOverL));
  }
  normalizeThis() {
    const length = this.length();
    if (length <= Number.EPSILON) {
      return Vector.full(0, this.items.length);
    }
    const oneOverL = 1 / length;
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] *= oneOverL;
    }
  }
  dot(vec: Vector) {
    return this.reduceWith(vec, (prev, a, b) => prev + a * b, 0);
  }
  sqrDistance(vec: Vector) {
    return this.reduceWith(
      vec,
      (prev, a, b) => {
        const ab = a - b;
        return prev + ab * ab;
      },
      0
    );
  }
  distance(vec: Vector) {
    return Math.sqrt(this.sqrDistance(vec));
  }
  isInRange(vec: Vector, distance: number) {
    return this.sqrDistance(vec) <= distance * distance;
  }
  angle(vec: Vector) {
    const denominator = Math.sqrt(this.sqrLength() * vec.sqrLength());
    if (denominator <= Number.EPSILON) {
      return 0;
    }
    const theta = clamp(this.dot(vec) / denominator, -1, 1);
    return Math.acos(theta);
  }
  project(normal: Vector) {
    const newNormal =
      this.items.length > normal.items.length
        ? normal.resize(this.items.length)
        : this.resize(normal.items.length);
    const sqrNormalLength = newNormal.sqrLength();
    if (sqrNormalLength <= Number.EPSILON)
      return Vector.full(0, newNormal.items.length);
    const d = this.dot(newNormal);
    return newNormal.scale(d / sqrNormalLength);
  }
  projectOnPlane(normal: Vector) {
    const project = this.project(normal);
    return this.sub(project);
  }
  reflect(normal: Vector) {
    const dotNorm = this.dot(normal);
    return this.add(normal.scale(-2 * dotNorm));
  }
  cross(vec: Vector) {
    if (this.items.length === vec.items.length) {
      switch (this.items.length) {
        case 2:
          return new Vector(
            this.items[0] * vec.items[1],
            this.items[1] * vec.items[0]
          );
        case 3:
          return new Vector(
            this.y * vec.z - this.z * vec.y,
            this.z * vec.x - this.x * vec.z,
            this.x * vec.y - this.y * vec.x
          );
      }
    }
    throw new Error(
      'Cross product can only be computed for vector of the same length in 2D and 3D.'
    );
  }
  direction(target: Vector) {
    return target.sub(this).normalize();
  }
  moveTowards(target: Vector, maxDistanceDelta: number) {
    const toVector = target.sub(this);
    const dist = toVector.length();
    if (dist <= maxDistanceDelta || dist <= Number.EPSILON) {
      return target;
    }
    return this.add(toVector.scale(maxDistanceDelta / dist));
  }
  lerp(to: Vector, t: number) {
    return this.add(to.sub(this).scale(t));
  }
  unlerp(to: Vector, t: number) {
    const maxDim = Math.max(to.items.length, this.items.length);
    const a = this.resize(maxDim);
    const b = to.resize(maxDim);
    const top = a.items.map((v) => t - v);
    const bottom = b.items.map((v, i) => v - a.element(i));
    return new Vector(...top.map((v, i) => v / bottom[i]));
  }
  nlerp(to: Vector, t: number) {
    return this.add(to.sub(this).scale(t)).normalize();
  }
  slerp(target: Vector, t: number) {
    const thisLength = this.length();
    const actualVector =
      thisLength > Number.EPSILON
        ? this.scale(1 / thisLength)
        : Vector.full(0, this.items.length);
    const targetLength = target.length();
    const targetVector =
      targetLength > Number.EPSILON
        ? target.scale(1 / targetLength)
        : Vector.full(0, target.items.length);
    const magnitude = thisLength + (targetLength - thisLength) * t;
    const dot = actualVector.dot(targetVector);
    const theta = Math.acos(dot) * t;
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    const newTargetVector = targetVector
      .sub(actualVector.scale(dot))
      .normalize();
    return actualVector.scale(c).add(newTargetVector.scale(s)).scale(magnitude);
  }
  exteriorProduct(vec: Vector) {
    const maxDim = Math.max(vec.items.length, this.items.length);
    const u = this.resize(maxDim);
    const v = vec.resize(maxDim);
    const n = u.items.length;
    const bivector: number[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const component = u.items[i] * v.items[j] - u.items[j] * v.items[i];
        bivector.push(component);
      }
    }
    return new Vector(...bivector);
  }
  clampMagnitude(max: number): Vector {
    const sqrMag = this.sqrLength();
    if (sqrMag > max * max) {
      return this.normalize().scale(max);
    }
    return this;
  }
  map(fn: (val: number, index: number) => number) {
    return new Vector(...this.items.map(fn));
  }
  perpendicular(): Vector {
    const len = this.items.length;
    if (len === 2) {
      return new Vector(-this.y, this.x);
    }
    if (len === 3) {
      const absX = Math.abs(this.x);
      const absY = Math.abs(this.y);
      const absZ = Math.abs(this.z);
      if (absX < absY && absX < absZ) {
        return new Vector(0, -this.z, this.y).normalize();
      } else if (absY < absZ) {
        return new Vector(-this.z, 0, this.x).normalize();
      } else {
        return new Vector(-this.y, this.x, 0).normalize();
      }
    }
    let minIndex = 0;
    let minVal = Math.abs(this.items[0]);
    for (let i = 1; i < len; i++) {
      const val = Math.abs(this.items[i]);
      if (val < minVal) {
        minVal = val;
        minIndex = i;
      }
    }
    const basis = Vector.full(0, len);
    basis.items[minIndex] = 1;
    return basis.sub(basis.project(this)).normalize();
  }
  toString() {
    return `Vector(${this.items.join(', ')})`;
  }
  same(vec: Vector, epsilon: number = Number.EPSILON): boolean {
    const length = Math.max(this.items.length, vec.items.length);
    for (let i = 0; i < length; i++) {
      if (Math.abs(this.element(i) - vec.element(i)) > epsilon) {
        return false;
      }
    }
    return true;
  }
  equals(vec: Vector, epsilon: number = Number.EPSILON): boolean {
    return this.sqrDistance(vec) < epsilon * epsilon;
  }
  mapWith(vec: Vector, fn: (a: number, b: number) => number): Vector {
    const length = Math.max(this.items.length, vec.items.length);
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = fn(this.element(i), vec.element(i));
    }
    return new Vector(...result);
  }
  reduceWith<T>(
    vec: Vector,
    fn: (prev: T, a: number, b: number) => T,
    defaultValue: T
  ): T {
    const length = Math.max(this.items.length, vec.items.length);
    let result = defaultValue;
    for (let i = 0; i < length; i++) {
      result = fn(result, this.element(i), vec.element(i));
    }
    return result;
  }
  hadamard(vec: Vector) {
    return this.mapWith(vec, (a, b) => a * b);
  }
  hadamardThis(vec: Vector) {
    const length = Math.max(this.items.length, vec.items.length);
    this.resizeThis(length);
    for (let i = 0; i < length; i++) {
      this.items[i] *= vec.element(i);
    }
  }
  divideElements(vec: Vector) {
    return this.mapWith(vec, (a, b) => (b === 0 ? 0 : a / b));
  }
  divideElementsThis(vec: Vector) {
    const length = Math.max(this.items.length, vec.items.length);
    this.resizeThis(length);
    for (let i = 0; i < length; i++) {
      const e = vec.element(i);
      this.items[i] = e === 0 ? 0 : this.items[i] / e;
    }
  }
  min(vec: Vector) {
    return this.mapWith(vec, (a, b) => Math.min(a, b));
  }
  max(vec: Vector) {
    return this.mapWith(vec, (a, b) => Math.max(a, b));
  }
  pow(vec: Vector) {
    return this.mapWith(vec, (a, b) => Math.pow(a, b));
  }
  manhattanDistance(target: Vector) {
    return this.reduceWith(target, (prev, a, b) => prev + Math.abs(a - b), 0);
  }
}
