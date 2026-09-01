import { Vector } from './vector.js';

export interface ComplexNumber {
  re: number;
  im: number;
}

export interface EigenResult {
  eigenvalues: ComplexNumber[];
  // undefined for a complex eigenvalue — see the caveats below
  eigenvectors: (Vector | null)[];
}

export class Matrix {
  readonly rows: number;
  readonly cols: number;
  private data: number[][];

  constructor(rows: number, cols: number, data?: number[][]) {
    if (rows <= 0 || cols <= 0) {
      throw new Error('Matrix: rows and cols must be positive integers');
    }
    this.rows = rows;
    this.cols = cols;
    this.data =
      data ?? Array.from({ length: rows }, () => new Array(cols).fill(0));

    if (
      this.data.length !== rows ||
      this.data.some((row) => row.length !== cols)
    ) {
      throw new Error(
        'Matrix: provided data does not match the given dimensions'
      );
    }
  }

  static zeros(rows: number, cols: number): Matrix {
    return new Matrix(rows, cols);
  }

  static identity(size: number): Matrix {
    const data = Array.from({ length: size }, (_, r) =>
      Array.from({ length: size }, (_, c) => (r === c ? 1 : 0))
    );
    return new Matrix(size, size, data);
  }

  static fromArray(data: number[][]): Matrix {
    return new Matrix(data.length, data[0]?.length ?? 0, data);
  }

  get(row: number, col: number): number {
    this.assertInBounds(row, col);
    return this.data[row][col];
  }

  set(row: number, col: number, value: number): void {
    this.assertInBounds(row, col);
    this.data[row][col] = value;
  }

  private assertInBounds(row: number, col: number): void {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      throw new Error(
        `Matrix: index (${row}, ${col}) out of bounds for ${this.rows}x${this.cols} matrix`
      );
    }
  }

  toArray(): number[][] {
    return this.data.map((row) => [...row]);
  }

  equals(other: Matrix, epsilon = 1e-9): boolean {
    if (this.rows !== other.rows || this.cols !== other.cols) return false;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (Math.abs(this.data[r][c] - other.data[r][c]) > epsilon)
          return false;
      }
    }
    return true;
  }

  add(other: Matrix): Matrix {
    this.assertSameShape(other, 'add');
    return Matrix.fromArray(
      this.data.map((row, r) => row.map((v, c) => v + other.data[r][c]))
    );
  }

  subtract(other: Matrix): Matrix {
    this.assertSameShape(other, 'subtract');
    return Matrix.fromArray(
      this.data.map((row, r) => row.map((v, c) => v - other.data[r][c]))
    );
  }

  scale(scalar: number): Matrix {
    return Matrix.fromArray(this.data.map((row) => row.map((v) => v * scalar)));
  }

  multiply(other: Matrix): Matrix {
    if (this.cols !== other.rows) {
      throw new Error(
        `Matrix: cannot multiply ${this.rows}x${this.cols} by ${other.rows}x${other.cols} — inner dimensions must match`
      );
    }
    const result = Array.from({ length: this.rows }, () =>
      new Array(other.cols).fill(0)
    );
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < other.cols; c++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.data[r][k] * other.data[k][c];
        }
        result[r][c] = sum;
      }
    }
    return Matrix.fromArray(result);
  }

  transpose(): Matrix {
    const result: number[][] = Array.from(
      { length: this.cols },
      () => new Array(this.rows)
    );

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        result[c][r] = this.data[r][c];
      }
    }

    return Matrix.fromArray(result);
  }

  trace(): number {
    this.assertSquare('trace');
    let sum = 0;
    for (let i = 0; i < this.rows; i++) {
      sum += this.data[i][i];
    }
    return sum;
  }

  diagonal(): number[] {
    this.assertSquare('diagonal');
    const result: number[] = [];
    for (let i = 0; i < this.rows; i++) {
      result.push(this.data[i][i]);
    }
    return result;
  }

  determinant(): number {
    this.assertSquare('determinant');

    // exact, allocation-free path for trivial sizes — also avoids LU's
    // pivoting-induced floating point noise on inputs that don't need it
    if (this.rows <= 2) {
      return Matrix.determinantOf(this.data);
    }

    try {
      const { U, sign } = this.lu();
      let det = sign as number;
      for (let i = 0; i < this.rows; i++) det *= U.get(i, i);
      return det;
    } catch {
      // lu() throws on an exact zero pivot — a singular matrix has
      // determinant 0, so this is the correct (not exceptional) result
      return 0;
    }
  }

  minor(row: number, col: number): number {
    this.assertSquare('minor');
    this.assertInBounds(row, col);
    if (this.rows <= 1) {
      throw new Error('Matrix: minor is undefined for a 1x1 matrix');
    }
    return Matrix.determinantOf(this.submatrixData(row, col));
  }

  cofactor(row: number, col: number): number {
    const sign = (row + col) % 2 === 0 ? 1 : -1;
    return sign * this.minor(row, col);
  }

  adjugate(): Matrix {
    this.assertSquare('adjugate');
    if (this.rows === 1) {
      // By convention, adj([[a]]) = [[1]] (cofactor of a 1x1 is defined as 1,
      // since there's no smaller minor to compute).
      return Matrix.fromArray([[1]]);
    }
    const cofactors = Array.from({ length: this.rows }, (_, r) =>
      Array.from({ length: this.cols }, (_, c) => this.cofactor(r, c))
    );
    return Matrix.fromArray(cofactors).transpose();
  }

  inverse(): Matrix {
    this.assertSquare('inverse');
    if (this.isSingular()) {
      throw new Error(
        'Matrix: cannot invert a singular matrix (determinant is 0)'
      );
    }
    // A^-1 is exactly the solution to A * X = I
    return this.solve(Matrix.identity(this.rows));
  }

  vectorization(): Vector {
    const result: number[] = [];
    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        result.push(this.data[r][c]);
      }
    }
    return new Vector(...result);
  }

  directSum(other: Matrix): Matrix {
    const rows = this.rows + other.rows;
    const cols = this.cols + other.cols;
    const data = Array.from({ length: rows }, () => new Array(cols).fill(0));

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        data[r][c] = this.data[r][c];
      }
    }
    for (let r = 0; r < other.rows; r++) {
      for (let c = 0; c < other.cols; c++) {
        data[this.rows + r][this.cols + c] = other.get(r, c);
      }
    }
    return Matrix.fromArray(data);
  }

  hadamardProduct(other: Matrix): Matrix {
    this.assertSameShape(other, 'compute the Hadamard product of');
    return Matrix.fromArray(
      this.data.map((row, r) => row.map((v, c) => v * other.get(r, c)))
    );
  }

  kroneckerProduct(other: Matrix): Matrix {
    const rows = this.rows * other.rows;
    const cols = this.cols * other.cols;
    const data = Array.from({ length: rows }, () => new Array(cols).fill(0));

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const scalar = this.data[r][c];
        for (let pr = 0; pr < other.rows; pr++) {
          for (let pc = 0; pc < other.cols; pc++) {
            data[r * other.rows + pr][c * other.cols + pc] =
              scalar * other.get(pr, pc);
          }
        }
      }
    }
    return Matrix.fromArray(data);
  }

  eigenSymmetric(
    maxIterations = 100,
    epsilon = 1e-12
  ): { eigenvalues: number[]; eigenvectors: Matrix } {
    this.assertSquare('eigenSymmetric');
    if (!this.equals(this.transpose())) {
      throw new Error(
        'Matrix: eigenSymmetric only supports symmetric matrices — general (non-symmetric) ' +
          "eigendecomposition requires complex eigenvalues/Jordan form and isn't implemented"
      );
    }

    const { eigenvalues, eigenvectors } = Matrix.jacobiEigenSymmetric(
      this.data,
      maxIterations,
      epsilon
    );
    return { eigenvalues, eigenvectors: Matrix.fromArray(eigenvectors) };
  }

  pow(power: number): Matrix {
    this.assertSquare('pow');

    if (!Number.isInteger(power)) {
      return this.powFractional(power);
    }

    if (power === 0) return Matrix.identity(this.rows);
    if (power < 0) return this.inverse().pow(-power);

    let result = Matrix.identity(this.rows);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let base: Matrix = this;
    let exp = power;
    while (exp > 0) {
      if (exp % 2 === 1) result = result.multiply(base);
      base = base.multiply(base);
      exp = Math.floor(exp / 2);
    }
    return result;
  }

  isSquare(): boolean {
    return this.rows === this.cols;
  }

  isSymmetric(epsilon = 1e-9): boolean {
    return this.isSquare() && this.equals(this.transpose(), epsilon);
  }

  isDiagonal(epsilon = 1e-9): boolean {
    if (!this.isSquare()) return false;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (r !== c && Math.abs(this.data[r][c]) > epsilon) return false;
      }
    }
    return true;
  }

  isOrthogonal(epsilon = 1e-9): boolean {
    if (!this.isSquare()) return false;
    return this.multiply(this.transpose()).equals(
      Matrix.identity(this.rows),
      epsilon
    );
  }

  isSingular(epsilon = 1e-9): boolean {
    this.assertSquare('isSingular');
    try {
      const { U } = this.lu();
      return U.diagonal().some((v) => Math.abs(v) <= epsilon);
    } catch {
      return true; // lu() throws precisely when a pivot is exactly 0
    }
  }

  frobeniusNorm(): number {
    let sumSquares = 0;
    for (const row of this.data) {
      for (const v of row) sumSquares += v * v;
    }
    return Math.sqrt(sumSquares);
  }

  lu(): { L: Matrix; U: Matrix; P: Matrix; sign: 1 | -1 } {
    this.assertSquare('lu');
    const n = this.rows;
    const u = this.data.map((row) => [...row]); // working copy, becomes U
    const l = Array.from({ length: n }, () => new Array(n).fill(0));
    const perm = Array.from({ length: n }, (_, i) => i); // tracks row permutation
    let sign: 1 | -1 = 1;

    for (let col = 0; col < n; col++) {
      // partial pivoting: find the row (at or below `col`) with the
      // largest absolute value in this column, swap it into place
      let pivotRow = col;
      let pivotValue = Math.abs(u[col][col]);
      for (let r = col + 1; r < n; r++) {
        if (Math.abs(u[r][col]) > pivotValue) {
          pivotValue = Math.abs(u[r][col]);
          pivotRow = r;
        }
      }

      if (pivotValue === 0) {
        throw new Error('Matrix: lu decomposition failed — matrix is singular');
      }

      if (pivotRow !== col) {
        [u[col], u[pivotRow]] = [u[pivotRow], u[col]];
        [perm[col], perm[pivotRow]] = [perm[pivotRow], perm[col]];
        // also swap the already-computed part of L's rows, so L stays
        // consistent with the row reordering applied to U
        [l[col], l[pivotRow]] = [l[pivotRow], l[col]];
        sign = sign === 1 ? -1 : 1;
      }

      l[col][col] = 1;

      for (let r = col + 1; r < n; r++) {
        const factor = u[r][col] / u[col][col];
        l[r][col] = factor;
        for (let c = col; c < n; c++) {
          u[r][c] -= factor * u[col][c];
        }
      }
    }

    // build P from the tracked permutation: P[i][perm[i]] = 1
    const p = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (perm[i] === j ? 1 : 0))
    );

    return {
      L: Matrix.fromArray(l),
      U: Matrix.fromArray(u),
      P: Matrix.fromArray(p),
      sign,
    };
  }

  solve(b: Vector): Vector;
  solve(b: Matrix): Matrix;
  solve(b: Vector | Matrix): Vector | Matrix {
    const isVector = !(b instanceof Matrix);
    const bMatrix = isVector ? Matrix.fromArray(b.toJSON().map((v) => [v])) : b;

    this.assertSquare('solve');
    if (bMatrix.rows !== this.rows) {
      throw new Error(
        `Matrix: solve requires b to have ${this.rows} rows to match A, got ${bMatrix.rows}`
      );
    }

    const { L, U, P } = this.lu();
    const n = this.rows;
    const pb = P.multiply(bMatrix);

    const x = Array.from({ length: n }, () => new Array(bMatrix.cols).fill(0));
    const y = Array.from({ length: n }, () => new Array(bMatrix.cols).fill(0));

    for (let col = 0; col < bMatrix.cols; col++) {
      for (let r = 0; r < n; r++) {
        let sum = pb.get(r, col);
        for (let k = 0; k < r; k++) sum -= L.get(r, k) * y[k][col];
        y[r][col] = sum;
      }
    }

    for (let col = 0; col < bMatrix.cols; col++) {
      for (let r = n - 1; r >= 0; r--) {
        let sum = y[r][col];
        for (let k = r + 1; k < n; k++) sum -= U.get(r, k) * x[k][col];
        const pivot = U.get(r, r);
        if (Math.abs(pivot) < 1e-12) {
          throw new Error(
            'Matrix: solve failed — matrix is singular or nearly singular'
          );
        }
        x[r][col] = sum / pivot;
      }
    }

    const resultMatrix = Matrix.fromArray(x);
    return isVector
      ? Vector.fromArray(resultMatrix.toArray().map((row) => row[0]))
      : resultMatrix;
  }

  rref(epsilon = 1e-9): Matrix {
    const m = this.data.map((row) => [...row]);
    const rowCount = this.rows;
    const colCount = this.cols;
    let pivotRow = 0;

    for (let col = 0; col < colCount && pivotRow < rowCount; col++) {
      // find the best pivot in this column at or below the current pivot row
      let best = pivotRow;
      for (let r = pivotRow + 1; r < rowCount; r++) {
        if (Math.abs(m[r][col]) > Math.abs(m[best][col])) best = r;
      }
      if (Math.abs(m[best][col]) < epsilon) continue; // no usable pivot in this column

      [m[pivotRow], m[best]] = [m[best], m[pivotRow]];

      const pivotValue = m[pivotRow][col];
      for (let c = 0; c < colCount; c++) m[pivotRow][c] /= pivotValue;

      for (let r = 0; r < rowCount; r++) {
        if (r === pivotRow) continue;
        const factor = m[r][col];
        for (let c = 0; c < colCount; c++) m[r][c] -= factor * m[pivotRow][c];
      }

      pivotRow++;
    }

    return Matrix.fromArray(m);
  }

  rank(epsilon = 1e-9): number {
    const reduced = this.rref(epsilon).toArray();
    let count = 0;
    for (const row of reduced) {
      if (row.some((v) => Math.abs(v) > epsilon)) count++;
    }
    return count;
  }

  qr(): { Q: Matrix; R: Matrix } {
    const { Q, R } = Matrix.householderQR(this.data);
    return { Q: Matrix.fromArray(Q), R: Matrix.fromArray(R) };
  }

  hessenberg(): { H: Matrix; Q: Matrix } {
    this.assertSquare('hessenberg');
    const n = this.rows;
    const h = this.data.map((row) => [...row]);
    const q = Matrix.identity(n).toArray();

    for (let k = 0; k < n - 2; k++) {
      let normX = 0;
      for (let i = k + 1; i < n; i++) normX += h[i][k] * h[i][k];
      normX = Math.sqrt(normX);
      if (normX < 1e-15) continue;

      const alpha = h[k + 1][k] > 0 ? -normX : normX;
      const v = new Array(n - (k + 1)).fill(0);
      v[0] = h[k + 1][k] - alpha;
      for (let i = 1; i < v.length; i++) v[i] = h[k + 1 + i][k];

      let vNorm = 0;
      for (const vi of v) vNorm += vi * vi;
      vNorm = Math.sqrt(vNorm);
      if (vNorm < 1e-15) continue;
      for (let i = 0; i < v.length; i++) v[i] /= vNorm;

      // apply from the left (rows k+1..n-1, all columns k..n-1)
      for (let j = k; j < n; j++) {
        let dot = 0;
        for (let i = 0; i < v.length; i++) dot += v[i] * h[k + 1 + i][j];
        for (let i = 0; i < v.length; i++) h[k + 1 + i][j] -= 2 * dot * v[i];
      }
      // apply from the right (all rows, columns k+1..n-1) — this half is
      // what makes it a similarity transform rather than a one-sided QR step
      for (let row = 0; row < n; row++) {
        let dot = 0;
        for (let i = 0; i < v.length; i++) dot += v[i] * h[row][k + 1 + i];
        for (let i = 0; i < v.length; i++) h[row][k + 1 + i] -= 2 * dot * v[i];
      }
      for (let row = 0; row < n; row++) {
        let dot = 0;
        for (let i = 0; i < v.length; i++) dot += v[i] * q[row][k + 1 + i];
        for (let i = 0; i < v.length; i++) q[row][k + 1 + i] -= 2 * dot * v[i];
      }
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < i - 1; j++) h[i][j] = 0;
    }

    return { H: Matrix.fromArray(h), Q: Matrix.fromArray(q) };
  }

  leastSquares(b: Vector): Vector;
  leastSquares(b: Matrix): Matrix;
  leastSquares(b: Vector | Matrix): Vector | Matrix {
    if (this.rows < this.cols) {
      throw new Error(
        'Matrix: leastSquares requires at least as many rows as columns (an overdetermined or exactly-determined system)'
      );
    }

    const isVector = !(b instanceof Matrix);
    const bMatrix = isVector ? Matrix.fromArray(b.toJSON().map((v) => [v])) : b;

    if (bMatrix.rows !== this.rows) {
      throw new Error(
        `Matrix: leastSquares requires b to have ${this.rows} rows to match A, got ${bMatrix.rows}`
      );
    }

    const { Q, R } = this.qr();
    const qtb = Q.transpose().multiply(bMatrix);
    const n = this.cols;

    // Back-substitution using only the top n rows of R (rows n..m-1 of R
    // are all zero by construction — R is upper triangular past its n-th row).
    const x = Array.from({ length: n }, () => new Array(bMatrix.cols).fill(0));

    for (let col = 0; col < bMatrix.cols; col++) {
      for (let row = n - 1; row >= 0; row--) {
        let sum = qtb.get(row, col);
        for (let k = row + 1; k < n; k++) sum -= R.get(row, k) * x[k][col];
        const pivot = R.get(row, row);
        if (Math.abs(pivot) < 1e-12) {
          throw new Error('Matrix: leastSquares failed — A is rank-deficient');
        }
        x[row][col] = sum / pivot;
      }
    }

    const resultMatrix = Matrix.fromArray(x);
    return isVector
      ? Vector.fromArray(resultMatrix.toArray().map((row) => row[0]))
      : resultMatrix;
  }

  eigen(maxIterations = 500, epsilon = 1e-12): EigenResult {
    this.assertSquare('eigen');
    const n = this.rows;
    const { H } = this.hessenberg();
    const h = H.toArray();

    const eigenvalues: ComplexNumber[] = new Array(n);
    let m = n; // size of the still-unreduced leading block
    let iterationsUsed = 0;

    while (m > 0) {
      if (iterationsUsed >= maxIterations) {
        throw new Error(
          `Matrix: eigen did not converge within ${maxIterations} iterations`
        );
      }

      if (m === 1) {
        eigenvalues[0] = { re: h[0][0], im: 0 };
        m = 0;
        continue;
      }

      // deflate a single real eigenvalue if the last subdiagonal entry has vanished
      const scale1 = Math.abs(h[m - 2][m - 2]) + Math.abs(h[m - 1][m - 1]) || 1;
      if (Math.abs(h[m - 1][m - 2]) <= epsilon * scale1) {
        eigenvalues[m - 1] = { re: h[m - 1][m - 1], im: 0 };
        m -= 1;
        continue;
      }

      // deflate a 2x2 block (real pair or complex conjugate pair) if it's isolated
      const isolated =
        m === 2 ||
        Math.abs(h[m - 2][m - 3]) <=
          epsilon *
            (Math.abs(h[m - 3][m - 3]) + Math.abs(h[m - 2][m - 2]) || 1);
      if (isolated) {
        const [a, b, c, d] = [
          h[m - 2][m - 2],
          h[m - 2][m - 1],
          h[m - 1][m - 2],
          h[m - 1][m - 1],
        ];
        const trace = a + d;
        const det = a * d - b * c;
        const disc = trace * trace - 4 * det;

        if (disc >= 0) {
          const sq = Math.sqrt(disc);
          eigenvalues[m - 2] = { re: (trace + sq) / 2, im: 0 };
          eigenvalues[m - 1] = { re: (trace - sq) / 2, im: 0 };
        } else {
          const sq = Math.sqrt(-disc);
          eigenvalues[m - 2] = { re: trace / 2, im: sq / 2 };
          eigenvalues[m - 1] = { re: trace / 2, im: -sq / 2 };
        }
        m -= 2;
        continue;
      }

      // one shifted QR step on the active m x m block, Wilkinson shift
      // (the eigenvalue of the trailing 2x2 block closest to h[m-1][m-1])
      const [a, b, c, d] = [
        h[m - 2][m - 2],
        h[m - 2][m - 1],
        h[m - 1][m - 2],
        h[m - 1][m - 1],
      ];
      const trace = a + d;
      const det = a * d - b * c;
      const disc = trace * trace - 4 * det;
      let mu: number;
      if (disc >= 0) {
        const sq = Math.sqrt(disc);
        const l1 = (trace + sq) / 2;
        const l2 = (trace - sq) / 2;
        mu = Math.abs(l1 - d) < Math.abs(l2 - d) ? l1 : l2;
      } else {
        mu = d; // no real shift is close to a genuinely complex trailing pair — see caveats
      }

      const active = h.slice(0, m).map((row) => row.slice(0, m));
      for (let i = 0; i < m; i++) active[i][i] -= mu;

      const { Q, R } = Matrix.householderQR(active);
      const newActive = Matrix.fromArray(R)
        .multiply(Matrix.fromArray(Q))
        .toArray();
      for (let i = 0; i < m; i++) newActive[i][i] += mu;

      for (let i = 0; i < m; i++) {
        for (let j = 0; j < m; j++) h[i][j] = newActive[i][j];
      }

      iterationsUsed++;
    }

    const eigenvectors = eigenvalues.map((lambda) =>
      lambda.im === 0 ? Matrix.realEigenvector(this, lambda.re) : null
    );

    return { eigenvalues, eigenvectors };
  }

  private static realEigenvector(
    A: Matrix,
    lambda: number,
    iterations = 50
  ): Vector {
    const n = A.rows;
    const shifted = A.subtract(Matrix.identity(n).scale(lambda + 1e-8));
    let v = Vector.fromArray(Array.from({ length: n }, (_, i) => 1 / (i + 1)));

    for (let iter = 0; iter < iterations; iter++) {
      let next: Vector;
      try {
        next = shifted.solve(v);
      } catch {
        break; // shifted system too ill-conditioned to solve further — keep the last good v
      }
      const norm = Math.hypot(...next.toJSON());
      if (norm < 1e-300) break;
      v = Vector.fromArray(next.toJSON().map((x) => x / norm));
    }

    return v;
  }

  private static householderQR(input: number[][]): {
    Q: number[][];
    R: number[][];
  } {
    const m = input.length;
    const n = input[0].length;
    const r = input.map((row) => [...row]);
    const q = Array.from({ length: m }, (_, i) =>
      Array.from({ length: m }, (_, j) => (i === j ? 1 : 0))
    );
    const steps = Math.min(m - 1, n);

    for (let k = 0; k < steps; k++) {
      let normX = 0;
      for (let i = k; i < m; i++) normX += r[i][k] * r[i][k];
      normX = Math.sqrt(normX);
      if (normX < 1e-15) continue;

      const alpha = r[k][k] > 0 ? -normX : normX;
      const v = new Array(m - k).fill(0);
      v[0] = r[k][k] - alpha;
      for (let i = 1; i < m - k; i++) v[i] = r[k + i][k];

      let vNorm = 0;
      for (const vi of v) vNorm += vi * vi;
      vNorm = Math.sqrt(vNorm);
      if (vNorm < 1e-15) continue;
      for (let i = 0; i < v.length; i++) v[i] /= vNorm;

      for (let j = k; j < n; j++) {
        let dot = 0;
        for (let i = 0; i < v.length; i++) dot += v[i] * r[k + i][j];
        for (let i = 0; i < v.length; i++) r[k + i][j] -= 2 * dot * v[i];
      }
      for (let row = 0; row < m; row++) {
        let dot = 0;
        for (let i = 0; i < v.length; i++) dot += v[i] * q[row][k + i];
        for (let i = 0; i < v.length; i++) q[row][k + i] -= 2 * dot * v[i];
      }
    }

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < Math.min(i, n); j++) r[i][j] = 0;
    }

    return { Q: q, R: r };
  }

  private static jacobiEigenSymmetric(
    data: readonly number[][],
    maxIterations: number,
    epsilon: number
  ): { eigenvalues: number[]; eigenvectors: number[][] } {
    const n = data.length;
    const a = data.map((row) => [...row]); // working copy — destroyed during iteration
    const v: number[][] = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
    );

    if (n === 1) {
      return { eigenvalues: [a[0][0]], eigenvectors: v };
    }

    for (let iter = 0; iter < maxIterations; iter++) {
      // find the largest off-diagonal element — this is the entry the
      // rotation will zero out this iteration
      let p = 0,
        q = 1,
        max = 0;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (Math.abs(a[i][j]) > max) {
            max = Math.abs(a[i][j]);
            p = i;
            q = j;
          }
        }
      }

      if (max < epsilon) break; // converged to (approximately) diagonal

      const app = a[p][p],
        aqq = a[q][q],
        apq = a[p][q];
      // atan2 form handles both app !== aqq and app === aqq (the classic
      // "theta = pi/4" special case) without a separate branch
      const theta = 0.5 * Math.atan2(2 * apq, aqq - app);
      const c = Math.cos(theta),
        s = Math.sin(theta);

      // update every row/col k other than p, q (off-diagonal block)
      for (let k = 0; k < n; k++) {
        if (k === p || k === q) continue;
        const akp = a[k][p],
          akq = a[k][q];
        a[k][p] = a[p][k] = c * akp - s * akq;
        a[k][q] = a[q][k] = s * akp + c * akq;
      }

      // update the 2x2 block at (p,q) explicitly — this MUST use the
      // original app/aqq/apq values, not values already overwritten
      // above, or the rotation comes out wrong
      a[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
      a[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
      a[p][q] = a[q][p] = 0;

      // accumulate the rotation into the eigenvector matrix
      for (let k = 0; k < n; k++) {
        const vkp = v[k][p],
          vkq = v[k][q];
        v[k][p] = c * vkp - s * vkq;
        v[k][q] = s * vkp + c * vkq;
      }
    }

    const eigenvalues = Array.from({ length: n }, (_, i) => a[i][i]);
    return { eigenvalues, eigenvectors: v };
  }

  private powFractional(power: number): Matrix {
    const { eigenvalues, eigenvectors } = this.eigenSymmetric();

    for (const lambda of eigenvalues) {
      if (lambda < 0) {
        throw new Error(
          'Matrix: fractional power requires a positive-semidefinite matrix — ' +
            'a negative eigenvalue raised to a non-integer power is complex-valued'
        );
      }
    }

    const poweredDiagonal = Matrix.fromArray(
      eigenvalues.map((lambda, i) =>
        eigenvalues.map((_, j) => (i === j ? Math.pow(lambda, power) : 0))
      )
    );

    return eigenvectors
      .multiply(poweredDiagonal)
      .multiply(eigenvectors.transpose());
  }

  private submatrixData(excludeRow: number, excludeCol: number): number[][] {
    return this.data
      .filter((_, r) => r !== excludeRow)
      .map((row) => row.filter((_, c) => c !== excludeCol));
  }

  private static determinantOf(m: number[][]): number {
    const n = m.length;
    if (n === 1) return m[0][0];
    if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];

    // Laplace expansion along the first row. Fine for small matrices
    // (this toolkit isn't aiming to be a numerically-stable large-N
    // linear algebra library — swap in LU decomposition if you need that).
    let det = 0;
    for (let col = 0; col < n; col++) {
      const minor = m.slice(1).map((row) => row.filter((_, c) => c !== col));
      const sign = col % 2 === 0 ? 1 : -1;
      det += sign * m[0][col] * Matrix.determinantOf(minor);
    }
    return det;
  }

  private assertSameShape(other: Matrix, op: string): void {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error(
        `Matrix: cannot ${op} ${this.rows}x${this.cols} and ${other.rows}x${other.cols} matrices`
      );
    }
  }

  private assertSquare(op: string): void {
    if (this.rows !== this.cols) {
      throw new Error(`Matrix: ${op} is only defined for square matrices`);
    }
  }
}
