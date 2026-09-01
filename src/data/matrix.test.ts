// matrix.test.ts
import { describe, it, expect } from 'vitest';
import { EigenResult, Matrix } from './matrix';
import { Vector } from './vector';

function expectMatrixClose(a: Matrix, b: Matrix, epsilon = 1e-9) {
  expect(a.equals(b, epsilon)).toBe(true);
}

function expectClose(a: number, b: number, epsilon = 1e-9) {
  expect(Math.abs(a - b)).toBeLessThanOrEqual(epsilon);
}

function sumRe(eigenvalues: { re: number; im: number }[]): number {
  return eigenvalues.reduce((acc, e) => acc + e.re, 0);
}

function productComplex(eigenvalues: { re: number; im: number }[]): {
  re: number;
  im: number;
} {
  let re = 1;
  let im = 0;
  for (const { re: r, im: i } of eigenvalues) {
    const newRe = re * r - im * i;
    const newIm = re * i + im * r;
    re = newRe;
    im = newIm;
  }
  return { re, im };
}

describe('Matrix construction', () => {
  it('creates a zero matrix of the given shape', () => {
    expect(Matrix.zeros(2, 3).toArray()).toEqual([
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it('creates an identity matrix', () => {
    expect(Matrix.identity(3).toArray()).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });

  it('throws on non-positive dimensions', () => {
    expect(() => new Matrix(0, 3)).toThrow();
    expect(() => new Matrix(3, -1)).toThrow();
  });

  it("throws when provided data doesn't match declared dimensions", () => {
    expect(() => new Matrix(2, 2, [[1, 2]])).toThrow();
  });

  it('get/set access individual cells', () => {
    const m = Matrix.zeros(2, 2);
    m.set(0, 1, 5);
    expect(m.get(0, 1)).toBe(5);
  });

  it('throws on out-of-bounds get/set', () => {
    const m = Matrix.zeros(2, 2);
    expect(() => m.get(5, 0)).toThrow();
    expect(() => m.set(0, 5, 1)).toThrow();
  });
});

describe('Matrix.equals', () => {
  it('is true for identical matrices', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    const b = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    expect(a.equals(b)).toBe(true);
  });

  it('is false for different shapes', () => {
    const a = Matrix.fromArray([[1, 2]]);
    const b = Matrix.fromArray([[1], [2]]);
    expect(a.equals(b)).toBe(false);
  });

  it('tolerates small floating-point differences within epsilon', () => {
    const a = Matrix.fromArray([[1, 2]]);
    const b = Matrix.fromArray([[1.0000000001, 2]]);
    expect(a.equals(b)).toBe(true);
  });
});

describe('Matrix arithmetic', () => {
  const a = Matrix.fromArray([
    [1, 2],
    [3, 4],
  ]);
  const b = Matrix.fromArray([
    [5, 6],
    [7, 8],
  ]);

  it('adds element-wise', () => {
    expect(a.add(b).toArray()).toEqual([
      [6, 8],
      [10, 12],
    ]);
  });

  it('subtracts element-wise', () => {
    expect(a.subtract(b).toArray()).toEqual([
      [-4, -4],
      [-4, -4],
    ]);
  });

  it('throws when adding mismatched shapes', () => {
    expect(() => a.add(Matrix.zeros(3, 3))).toThrow();
  });

  it('scales every element by a scalar', () => {
    expect(a.scale(2).toArray()).toEqual([
      [2, 4],
      [6, 8],
    ]);
  });

  it('multiplies according to standard matrix multiplication', () => {
    expect(a.multiply(b).toArray()).toEqual([
      [19, 22],
      [43, 50],
    ]);
  });

  it("throws when inner dimensions don't match for multiply", () => {
    const c = Matrix.zeros(3, 2);
    expect(() => a.multiply(c)).toThrow();
  });

  it('multiplying by the identity returns the original matrix', () => {
    expectMatrixClose(a.multiply(Matrix.identity(2)), a);
  });

  it('transposes rows and columns', () => {
    const m = Matrix.fromArray([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    expect(m.transpose().toArray()).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });
});

describe('Matrix.trace / diagonal', () => {
  const m = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);

  it('diagonal returns the main diagonal elements', () => {
    expect(m.diagonal()).toEqual([1, 5, 9]);
  });

  it('trace sums the main diagonal', () => {
    expect(m.trace()).toBe(15);
  });

  it('throws on a non-square matrix', () => {
    const rect = Matrix.zeros(2, 3);
    expect(() => rect.trace()).toThrow();
    expect(() => rect.diagonal()).toThrow();
  });
});

describe('Matrix.determinant', () => {
  it('computes a 1x1 determinant', () => {
    expect(Matrix.fromArray([[7]]).determinant()).toBe(7);
  });

  it('computes a 2x2 determinant', () => {
    expect(
      Matrix.fromArray([
        [1, 2],
        [3, 4],
      ]).determinant()
    ).toBe(1 * 4 - 2 * 3);
  });

  it('computes a 3x3 determinant', () => {
    const m = Matrix.fromArray([
      [6, 1, 1],
      [4, -2, 5],
      [2, 8, 7],
    ]);
    expect(m.determinant()).toBe(-306);
  });

  it('is 0 for a singular matrix', () => {
    const m = Matrix.fromArray([
      [1, 2],
      [2, 4],
    ]);
    expect(m.determinant()).toBe(0);
  });

  it('throws on a non-square matrix', () => {
    expect(() => Matrix.zeros(2, 3).determinant()).toThrow();
  });
});

describe('Matrix.minor / cofactor / adjugate / inverse', () => {
  const a = Matrix.fromArray([
    [1, 2],
    [3, 4],
  ]);

  it('computes the correct minor', () => {
    expect(a.minor(0, 0)).toBe(4);
    expect(a.minor(0, 1)).toBe(3);
    expect(a.minor(1, 0)).toBe(2);
    expect(a.minor(1, 1)).toBe(1);
  });

  it('throws minor on a 1x1 matrix', () => {
    expect(() => Matrix.fromArray([[5]]).minor(0, 0)).toThrow();
  });

  it('applies the correct sign to cofactors', () => {
    expect(a.cofactor(0, 0)).toBe(4);
    expect(a.cofactor(0, 1)).toBe(-3);
    expect(a.cofactor(1, 0)).toBe(-2);
    expect(a.cofactor(1, 1)).toBe(1);
  });

  it('computes the adjugate as the transposed cofactor matrix', () => {
    expect(a.adjugate().toArray()).toEqual([
      [4, -2],
      [-3, 1],
    ]);
  });

  it('adjugate of a 1x1 matrix is [[1]] by convention', () => {
    expect(
      Matrix.fromArray([[5]])
        .adjugate()
        .toArray()
    ).toEqual([[1]]);
  });

  it('computes the correct inverse', () => {
    expectMatrixClose(
      a.inverse(),
      Matrix.fromArray([
        [-2, 1],
        [1.5, -0.5],
      ])
    );
  });

  it('A * A^-1 is (approximately) the identity', () => {
    expectMatrixClose(a.multiply(a.inverse()), Matrix.identity(2));
  });

  it('throws when inverting a singular matrix', () => {
    const singular = Matrix.fromArray([
      [1, 2],
      [2, 4],
    ]);
    expect(() => singular.inverse()).toThrow();
  });

  it('throws minor/cofactor/adjugate/inverse on a non-square matrix', () => {
    const rect = Matrix.zeros(2, 3);
    expect(() => rect.minor(0, 0)).toThrow();
    expect(() => rect.cofactor(0, 0)).toThrow();
    expect(() => rect.adjugate()).toThrow();
    expect(() => rect.inverse()).toThrow();
  });
});

describe('Matrix.vectorization', () => {
  it('stacks columns top-to-bottom, left-to-right (column-major)', () => {
    const m = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    expect(m.vectorization().toJSON()).toEqual([1, 3, 2, 4]);
  });
});

describe('Matrix.directSum', () => {
  it('places both matrices as diagonal blocks with zeros elsewhere', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    const b = Matrix.fromArray([[5]]);
    expect(a.directSum(b).toArray()).toEqual([
      [1, 2, 0],
      [3, 4, 0],
      [0, 0, 5],
    ]);
  });

  it('works for non-square operands', () => {
    const a = Matrix.fromArray([[1, 2, 3]]);
    const b = Matrix.fromArray([[4], [5]]);
    expect(a.directSum(b).toArray()).toEqual([
      [1, 2, 3, 0],
      [0, 0, 0, 4],
      [0, 0, 0, 5],
    ]);
  });
});

describe('Matrix.hadamardProduct', () => {
  it('multiplies element-wise, not via matrix multiplication', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    expect(a.hadamardProduct(a).toArray()).toEqual([
      [1, 4],
      [9, 16],
    ]);
  });

  it('throws on mismatched shapes', () => {
    const a = Matrix.fromArray([[1, 2]]);
    const b = Matrix.fromArray([[1], [2]]);
    expect(() => a.hadamardProduct(b)).toThrow();
  });
});

describe('Matrix.kroneckerProduct', () => {
  it('produces the correctly-sized block matrix', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    const b = Matrix.identity(2);
    const result = a.kroneckerProduct(b);
    expect(result.rows).toBe(4);
    expect(result.cols).toBe(4);
  });

  it('matches a known Kronecker product result', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    const b = Matrix.fromArray([
      [0, 5],
      [6, 7],
    ]);
    expect(a.kroneckerProduct(b).toArray()).toEqual([
      [0, 5, 0, 10],
      [6, 7, 12, 14],
      [0, 15, 0, 20],
      [18, 21, 24, 28],
    ]);
  });

  it('is not commutative in general', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    const b = Matrix.fromArray([
      [0, 1],
      [1, 0],
    ]);

    expect(a.kroneckerProduct(b).equals(b.kroneckerProduct(a))).toBe(false);
  });

  it('computes a known non-commuting Kronecker product pair correctly', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    const b = Matrix.fromArray([
      [0, 1],
      [1, 0],
    ]);

    expect(a.kroneckerProduct(b).toArray()).toEqual([
      [0, 1, 0, 2],
      [1, 0, 2, 0],
      [0, 3, 0, 4],
      [3, 0, 4, 0],
    ]);

    expect(b.kroneckerProduct(a).toArray()).toEqual([
      [0, 0, 1, 2],
      [0, 0, 3, 4],
      [1, 2, 0, 0],
      [3, 4, 0, 0],
    ]);
  });
});

describe('Matrix.pow (integer)', () => {
  const a = Matrix.fromArray([
    [1, 1],
    [0, 1],
  ]);

  it('returns the identity for power 0', () => {
    expect(a.pow(0).toArray()).toEqual(Matrix.identity(2).toArray());
  });

  it('returns the original matrix for power 1', () => {
    expect(a.pow(1).toArray()).toEqual(a.toArray());
  });

  it('matches repeated multiplication for a small positive power', () => {
    expect(a.pow(3).toArray()).toEqual(a.multiply(a).multiply(a).toArray());
  });

  it('matches the inverse for power -1', () => {
    const invertible = Matrix.fromArray([
      [2, 0],
      [0, 2],
    ]);
    expectMatrixClose(invertible.pow(-1), invertible.inverse());
  });

  it('throws on a non-square matrix', () => {
    expect(() => Matrix.zeros(2, 3).pow(2)).toThrow();
  });
});

describe('Matrix.eigenSymmetric', () => {
  it('throws on a non-symmetric matrix', () => {
    const m = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    expect(() => m.eigenSymmetric()).toThrow();
  });

  it('computes correct eigenvalues for a known symmetric matrix', () => {
    const m = Matrix.fromArray([
      [2, 0],
      [0, 3],
    ]);
    const { eigenvalues } = m.eigenSymmetric();
    expect([...eigenvalues].sort()).toEqual([2, 3]);
  });

  it('reconstructs the original matrix from V * D * V^T', () => {
    const m = Matrix.fromArray([
      [4, 1],
      [1, 3],
    ]);
    const { eigenvalues, eigenvectors } = m.eigenSymmetric();
    const d = Matrix.fromArray(
      eigenvalues.map((lambda, i) =>
        eigenvalues.map((_, j) => (i === j ? lambda : 0))
      )
    );
    const reconstructed = eigenvectors
      .multiply(d)
      .multiply(eigenvectors.transpose());
    expectMatrixClose(reconstructed, m, 1e-6);
  });

  it('a single 2x2 Jacobi rotation exactly zeroes the off-diagonal entry', () => {
    const m = Matrix.fromArray([
      [4, 1],
      [1, 3],
    ]);
    const { eigenvalues } = m.eigenSymmetric(1); // maxIterations: 1 — force exactly one rotation

    // for a 2x2 matrix, a single correct Jacobi rotation fully diagonalizes it
    const [a, b] = [...eigenvalues].sort((x, y) => x - y);
    expect(a).toBeCloseTo((7 - Math.sqrt(5)) / 2, 6); // 2.381966...
    expect(b).toBeCloseTo((7 + Math.sqrt(5)) / 2, 6); // 4.618034...
  });
});

describe('Matrix.pow (fractional)', () => {
  it('computes a matrix square root that squares back to the original', () => {
    const a = Matrix.fromArray([
      [4, 1],
      [1, 3],
    ]);
    const sqrtA = a.pow(0.5);
    expectMatrixClose(sqrtA.multiply(sqrtA), a, 1e-6);
  });

  it('throws for a non-integer power on a non-symmetric matrix', () => {
    const m = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    expect(() => m.pow(0.5)).toThrow();
  });

  it('throws for a non-integer power when an eigenvalue is negative', () => {
    const m = Matrix.fromArray([
      [0, 1],
      [1, 0],
    ]); // symmetric, eigenvalues are +1 and -1
    expect(() => m.pow(0.5)).toThrow();
  });
});

describe('Matrix.lu', () => {
  it('factors A into L (unit lower triangular) and U (upper triangular)', () => {
    const a = Matrix.fromArray([
      [4, 3],
      [6, 3],
    ]);
    const { L, U } = a.lu();

    for (let i = 0; i < 2; i++) expect(L.get(i, i)).toBe(1);
    expect(L.get(0, 1)).toBe(0); // strictly lower triangular above the diagonal
    expect(U.get(1, 0)).toBe(0); // strictly upper triangular below the diagonal
  });

  it('satisfies P * A = L * U', () => {
    const a = Matrix.fromArray([
      [4, 3],
      [6, 3],
    ]);
    const { L, U, P } = a.lu();
    expectMatrixClose(P.multiply(a), L.multiply(U));
  });

  it('applies a row swap (and flips sign) when partial pivoting requires it', () => {
    // a[0][0] is 0, forcing a pivot swap with row 1
    const a = Matrix.fromArray([
      [0, 1],
      [1, 1],
    ]);
    const { P, sign } = a.lu();
    expect(sign).toBe(-1);
    expect(P.toArray()).toEqual([
      [0, 1],
      [1, 0],
    ]);
  });

  it('still satisfies P * A = L * U when pivoting occurs', () => {
    const a = Matrix.fromArray([
      [0, 1],
      [1, 1],
    ]);
    const { L, U, P } = a.lu();
    expectMatrixClose(P.multiply(a), L.multiply(U));
  });

  it('throws on a singular matrix', () => {
    const singular = Matrix.fromArray([
      [1, 2],
      [2, 4],
    ]);
    expect(() => singular.lu()).toThrow();
  });

  it('throws on a non-square matrix', () => {
    expect(() => Matrix.zeros(2, 3).lu()).toThrow();
  });
});

describe('Matrix.solve', () => {
  it('solves a known linear system exactly (textbook example)', () => {
    const a = Matrix.fromArray([
      [2, 1, -1],
      [-3, -1, 2],
      [-2, 1, 2],
    ]);
    const b = Matrix.fromArray([[8], [-11], [-3]]);

    const x = a.solve(b);
    expect(x.get(0, 0)).toBeCloseTo(2, 9);
    expect(x.get(1, 0)).toBeCloseTo(3, 9);
    expect(x.get(2, 0)).toBeCloseTo(-1, 9);
  });

  it('solves for multiple right-hand sides at once', () => {
    const a = Matrix.identity(2).scale(2); // [[2,0],[0,2]]
    const b = Matrix.fromArray([
      [4, 6],
      [8, 10],
    ]);
    const x = a.solve(b);
    expectMatrixClose(
      x,
      Matrix.fromArray([
        [2, 3],
        [4, 5],
      ])
    );
  });

  it('accepts a Vector as the right-hand side and returns a Vector', () => {
    const a = Matrix.fromArray([
      [2, 0],
      [0, 4],
    ]);
    const b = Vector.fromArray([6, 8]);

    const x = a.solve(b);
    expect(x).toBeInstanceOf(Vector);
    expect(Array.from(x.toJSON())).toEqual([3, 2]);
  });

  it("throws when b's row count doesn't match A", () => {
    const a = Matrix.identity(2);
    const b = Matrix.fromArray([[1], [2], [3]]);
    expect(() => a.solve(b)).toThrow();
  });

  it('throws when solving with a singular matrix', () => {
    const singular = Matrix.fromArray([
      [1, 2],
      [2, 4],
    ]);
    expect(() => singular.solve(Matrix.fromArray([[1], [1]]))).toThrow();
  });

  it('throws on a non-square matrix', () => {
    expect(() =>
      Matrix.zeros(2, 3).solve(Matrix.fromArray([[1], [1]]))
    ).toThrow();
  });
});

describe('Matrix.rref', () => {
  it('reduces a full-rank matrix to the identity', () => {
    const a = Matrix.fromArray([
      [2, 1],
      [1, 1],
    ]);
    expectMatrixClose(a.rref(), Matrix.identity(2));
  });

  it('leaves a zero row when the matrix is rank-deficient', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [2, 4],
    ]);
    const reduced = a.rref().toArray();
    const zeroRow = reduced.find((row) => row.every((v) => Math.abs(v) < 1e-9));
    expect(zeroRow).toBeDefined();
  });

  it('handles non-square input', () => {
    const a = Matrix.fromArray([
      [1, 2, 3],
      [2, 4, 7],
    ]);
    const reduced = a.rref();
    expect(reduced.rows).toBe(2);
    expect(reduced.cols).toBe(3);
  });
});

describe('Matrix.rank', () => {
  it('is full rank for an invertible matrix', () => {
    expect(Matrix.identity(3).rank()).toBe(3);
  });

  it('is reduced for a linearly dependent matrix', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [2, 4],
    ]);
    expect(a.rank()).toBe(1);
  });

  it('is 0 for a zero matrix', () => {
    expect(Matrix.zeros(2, 2).rank()).toBe(0);
  });

  it('matches the smaller dimension for a full-rank rectangular matrix', () => {
    const a = Matrix.fromArray([
      [1, 0, 0],
      [0, 1, 0],
    ]);
    expect(a.rank()).toBe(2);
  });
});

describe('Matrix.frobeniusNorm (Frobenius)', () => {
  it('computes sqrt(sum of squares of all entries)', () => {
    const a = Matrix.fromArray([
      [3, 0],
      [0, 4],
    ]);
    expect(a.frobeniusNorm()).toBe(5);
  });

  it('is 0 for a zero matrix', () => {
    expect(Matrix.zeros(2, 2).frobeniusNorm()).toBe(0);
  });
});

describe('Matrix structural queries', () => {
  it('isSquare', () => {
    expect(Matrix.zeros(2, 2).isSquare()).toBe(true);
    expect(Matrix.zeros(2, 3).isSquare()).toBe(false);
  });

  it('isSymmetric', () => {
    expect(
      Matrix.fromArray([
        [1, 2],
        [2, 3],
      ]).isSymmetric()
    ).toBe(true);
    expect(
      Matrix.fromArray([
        [1, 2],
        [3, 4],
      ]).isSymmetric()
    ).toBe(false);
    expect(Matrix.zeros(2, 3).isSymmetric()).toBe(false); // non-square can't be symmetric
  });

  it('isDiagonal', () => {
    expect(
      Matrix.fromArray([
        [2, 0],
        [0, 3],
      ]).isDiagonal()
    ).toBe(true);
    expect(
      Matrix.fromArray([
        [2, 1],
        [0, 3],
      ]).isDiagonal()
    ).toBe(false);
  });

  it('isOrthogonal', () => {
    expect(Matrix.identity(3).isOrthogonal()).toBe(true);
    const rotation90 = Matrix.fromArray([
      [0, -1],
      [1, 0],
    ]);
    expect(rotation90.isOrthogonal()).toBe(true);
    expect(
      Matrix.fromArray([
        [1, 2],
        [3, 4],
      ]).isOrthogonal()
    ).toBe(false);
  });

  it('isSingular', () => {
    expect(
      Matrix.fromArray([
        [1, 2],
        [2, 4],
      ]).isSingular()
    ).toBe(true);
    expect(Matrix.identity(2).isSingular()).toBe(false);
  });

  it('throws isSingular on a non-square matrix', () => {
    expect(() => Matrix.zeros(2, 3).isSingular()).toThrow();
  });
});

describe('Matrix.qr', () => {
  it('reconstructs the original matrix: Q * R = A', () => {
    const a = Matrix.fromArray([
      [12, -51, 4],
      [6, 167, -68],
      [-4, 24, -41],
    ]);
    const { Q, R } = a.qr();
    expectMatrixClose(Q.multiply(R), a, 1e-6);
  });

  it('produces an orthogonal Q', () => {
    const a = Matrix.fromArray([
      [12, -51, 4],
      [6, 167, -68],
      [-4, 24, -41],
    ]);
    const { Q } = a.qr();
    expect(Q.isOrthogonal(1e-6)).toBe(true);
  });

  it('produces an upper triangular R', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    const { R } = a.qr();
    for (let i = 1; i < R.rows; i++) {
      for (let j = 0; j < Math.min(i, R.cols); j++) {
        expect(R.get(i, j)).toBe(0);
      }
    }
  });

  it('handles a tall (more rows than columns) matrix', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    const { Q, R } = a.qr();
    expect(Q.rows).toBe(3);
    expect(Q.cols).toBe(3);
    expect(R.rows).toBe(3);
    expect(R.cols).toBe(2);
    expectMatrixClose(Q.multiply(R), a, 1e-9);
  });

  it('handles a wide (more columns than rows) matrix', () => {
    const a = Matrix.fromArray([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const { Q, R } = a.qr();
    expectMatrixClose(Q.multiply(R), a, 1e-9);
    expect(Q.isOrthogonal(1e-9)).toBe(true);
  });

  it('handles a matrix that is already upper triangular', () => {
    const a = Matrix.fromArray([
      [2, 3],
      [0, 4],
    ]);
    const { Q, R } = a.qr();
    expectMatrixClose(Q.multiply(R), a, 1e-9);
  });

  it('handles a column with a zero below the diagonal without corrupting R', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [0, 3],
      [0, 0],
    ]);
    const { Q, R } = a.qr();
    expectMatrixClose(Q.multiply(R), a, 1e-9);
  });
});

describe('Matrix.leastSquares', () => {
  it('solves an exactly-determined square system, matching solve()', () => {
    const a = Matrix.fromArray([
      [2, 1],
      [1, 3],
    ]);
    const b = Vector.fromArray([5, 10]);

    const viaSolve = a.solve(b);
    const viaLeastSquares = a.leastSquares(b);

    const s = viaSolve.toJSON();
    const l = viaLeastSquares.toJSON();
    for (let i = 0; i < s.length; i++) expectClose(s[i], l[i], 1e-6);
  });

  it('fits a known best-fit line (least-squares linear regression)', () => {
    // points (0,1), (1,2), (2,4) — fit y = intercept + slope * x
    const design = Matrix.fromArray([
      [1, 0],
      [1, 1],
      [1, 2],
    ]);
    const y = Vector.fromArray([1, 2, 4]);

    const [intercept, slope] = design.leastSquares(y).toJSON();

    // verify by construction: the residual (design*coeffs - y) must be
    // orthogonal to every column of design (the normal equations condition)
    const coeffs = Matrix.fromArray([[intercept], [slope]]);
    const residual = design
      .multiply(coeffs)
      .subtract(Matrix.fromArray([[1], [2], [4]]));
    const designT = design.transpose();
    const orthogonalityCheck = designT.multiply(residual);

    expectClose(orthogonalityCheck.get(0, 0), 0, 1e-6);
    expectClose(orthogonalityCheck.get(1, 0), 0, 1e-6);
  });

  it('solves for multiple right-hand-side columns at once', () => {
    const a = Matrix.fromArray([
      [1, 0],
      [0, 1],
      [1, 1],
    ]);
    const b = Matrix.fromArray([
      [1, 2],
      [1, 2],
      [2, 4],
    ]);
    const x = a.leastSquares(b);
    expect(x.rows).toBe(2);
    expect(x.cols).toBe(2);
  });

  it('throws when there are fewer rows than columns', () => {
    const a = Matrix.fromArray([[1, 2, 3]]);
    const b = Vector.fromArray([1]);
    expect(() => a.leastSquares(b)).toThrow();
  });

  it("throws when b's row count doesn't match A", () => {
    const a = Matrix.fromArray([
      [1, 0],
      [0, 1],
      [1, 1],
    ]);
    const b = Vector.fromArray([1, 2]);
    expect(() => a.leastSquares(b)).toThrow();
  });

  it('throws on a rank-deficient A', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [2, 4],
      [3, 6],
    ]);
    const b = Vector.fromArray([1, 2, 3]);
    expect(() => a.leastSquares(b)).toThrow();
  });
});

describe('Matrix.hessenberg', () => {
  it('produces a matrix that is zero below the first subdiagonal', () => {
    const a = Matrix.fromArray([
      [4, 1, 2, 3],
      [1, 3, 1, 2],
      [2, 1, 5, 1],
      [3, 2, 1, 6],
    ]);
    const { H } = a.hessenberg();
    for (let i = 0; i < H.rows; i++) {
      for (let j = 0; j < i - 1; j++) {
        expect(H.get(i, j)).toBe(0);
      }
    }
  });

  it('is a similarity transform: Q^T * A * Q = H', () => {
    const a = Matrix.fromArray([
      [4, 1, 2, 3],
      [1, 3, 1, 2],
      [2, 1, 5, 1],
      [3, 2, 1, 6],
    ]);
    const { H, Q } = a.hessenberg();
    const reconstructed = Q.transpose().multiply(a).multiply(Q);
    expectMatrixClose(reconstructed, H, 1e-9);
  });

  it('produces an orthogonal Q', () => {
    const a = Matrix.fromArray([
      [4, 1, 2, 3],
      [1, 3, 1, 2],
      [2, 1, 5, 1],
      [3, 2, 1, 6],
    ]);
    const { Q } = a.hessenberg();
    expect(Q.isOrthogonal(1e-9)).toBe(true);
  });

  it('preserves the trace (similarity transforms preserve trace)', () => {
    const a = Matrix.fromArray([
      [4, 1, 2, 3],
      [1, 3, 1, 2],
      [2, 1, 5, 1],
      [3, 2, 1, 6],
    ]);
    const { H } = a.hessenberg();
    expectClose(H.trace(), a.trace(), 1e-9);
  });

  it('leaves an already-Hessenberg (e.g. already upper-triangular) matrix essentially unchanged', () => {
    const a = Matrix.fromArray([
      [2, 1, 3],
      [0, 4, 1],
      [0, 0, 5],
    ]);
    const { H } = a.hessenberg();
    expectMatrixClose(H, a, 1e-9);
  });

  it('throws on a non-square matrix', () => {
    expect(() => Matrix.zeros(2, 3).hessenberg()).toThrow();
  });

  it('handles a 2x2 matrix (no reduction needed) without throwing', () => {
    const a = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    expect(() => a.hessenberg()).not.toThrow();
  });
});

describe('Matrix.eigen — real eigenvalues', () => {
  it('finds eigenvalues of a diagonal matrix (trivially, the diagonal itself)', () => {
    const a = Matrix.fromArray([
      [2, 0, 0],
      [0, 5, 0],
      [0, 0, -1],
    ]);
    const { eigenvalues } = a.eigen();
    const values = eigenvalues.map((e) => e.re).sort((x, y) => x - y);
    expect(eigenvalues.every((e) => e.im === 0)).toBe(true);
    expect(values.map((v) => Math.round(v * 1e6) / 1e6)).toEqual([-1, 2, 5]);
  });

  it('agrees with eigenSymmetric() on a symmetric matrix', () => {
    const a = Matrix.fromArray([
      [4, 1],
      [1, 3],
    ]);

    const fromEigen = a
      .eigen()
      .eigenvalues.map((e) => e.re)
      .sort((x, y) => x - y);
    const fromSymmetric = [...a.eigenSymmetric().eigenvalues].sort(
      (x, y) => x - y
    );

    expectClose(fromEigen[0], fromSymmetric[0], 1e-5);
    expectClose(fromEigen[1], fromSymmetric[1], 1e-5);
  });

  it('finds eigenvalues of a known 3x3 matrix with distinct real eigenvalues', () => {
    // eigenvalues of this matrix are exactly 1, 2, 3 (constructed from a
    // known diagonalization, so this is a reliable ground truth)
    const p = Matrix.fromArray([
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ]); // upper triangular, invertible
    const d = Matrix.fromArray([
      [1, 0, 0],
      [0, 2, 0],
      [0, 0, 3],
    ]);
    const a = p.multiply(d).multiply(p.inverse());

    const { eigenvalues } = a.eigen();
    const values = eigenvalues.map((e) => e.re).sort((x, y) => x - y);
    expect(eigenvalues.every((e) => Math.abs(e.im) < 1e-6)).toBe(true);
    expectClose(values[0], 1, 1e-5);
    expectClose(values[1], 2, 1e-5);
    expectClose(values[2], 3, 1e-5);
  });

  it('sum of eigenvalues (real parts) matches the trace', () => {
    const a = Matrix.fromArray([
      [4, 1, 2],
      [1, 3, 1],
      [2, 1, 5],
    ]);
    const { eigenvalues } = a.eigen();
    const sum = eigenvalues.reduce((acc, e) => acc + e.re, 0);
    expectClose(sum, a.trace(), 1e-5);
  });

  it('product of eigenvalues (as complex numbers) matches the determinant', () => {
    const a = Matrix.fromArray([
      [2, 1],
      [1, 3],
    ]);
    const { eigenvalues } = a.eigen();

    // multiply complex eigenvalues together; for a real matrix the
    // imaginary part of the product must vanish
    let re = 1;
    let im = 0;
    for (const { re: r, im: i } of eigenvalues) {
      const newRe = re * r - im * i;
      const newIm = re * i + im * r;
      re = newRe;
      im = newIm;
    }

    expectClose(re, a.determinant(), 1e-5);
    expectClose(im, 0, 1e-5);
  });

  it('throws on a non-square matrix', () => {
    expect(() => Matrix.zeros(2, 3).eigen()).toThrow();
  });
});

describe('Matrix.eigen — complex eigenvalues', () => {
  it('finds purely imaginary eigenvalues for a 90-degree rotation matrix', () => {
    const rotation = Matrix.fromArray([
      [0, -1],
      [1, 0],
    ]);
    const { eigenvalues } = rotation.eigen();

    const sorted = [...eigenvalues].sort((a, b) => a.im - b.im);
    expectClose(sorted[0].re, 0, 1e-6);
    expectClose(sorted[0].im, -1, 1e-6);
    expectClose(sorted[1].re, 0, 1e-6);
    expectClose(sorted[1].im, 1, 1e-6);
  });

  it('finds a complex-conjugate eigenvalue pair for a general rotation-like 2x2 matrix', () => {
    // a 2x2 matrix with trace 2*cos(theta), det 1 has eigenvalues e^{+-i*theta}
    const theta = 0.7;
    const a = Matrix.fromArray([
      [Math.cos(theta), -Math.sin(theta)],
      [Math.sin(theta), Math.cos(theta)],
    ]);
    const { eigenvalues } = a.eigen();

    const sorted = [...eigenvalues].sort((x, y) => x.im - y.im);
    expectClose(sorted[0].re, Math.cos(theta), 1e-5);
    expectClose(sorted[0].im, -Math.sin(theta), 1e-5);
    expectClose(sorted[1].re, Math.cos(theta), 1e-5);
    expectClose(sorted[1].im, Math.sin(theta), 1e-5);
  });

  it('returns null eigenvectors for complex eigenvalues', () => {
    const rotation = Matrix.fromArray([
      [0, -1],
      [1, 0],
    ]);
    const { eigenvectors } = rotation.eigen();
    expect(eigenvectors.every((v) => v === null)).toBe(true);
  });

  it('finds a mix of one real and one complex-conjugate pair in a 3x3 matrix', () => {
    // block-diagonal: real eigenvalue 5, plus a 2x2 rotation-like block
    // with eigenvalues cos(theta) +- i*sin(theta)
    const theta = 0.5;
    const rotationBlock = Matrix.fromArray([
      [Math.cos(theta), -Math.sin(theta)],
      [Math.sin(theta), Math.cos(theta)],
    ]);
    const a = Matrix.fromArray([[5]]).directSum(rotationBlock);

    const { eigenvalues } = a.eigen();
    const real = eigenvalues.filter((e) => Math.abs(e.im) < 1e-6);
    const complex = eigenvalues.filter((e) => Math.abs(e.im) >= 1e-6);

    expect(real).toHaveLength(1);
    expectClose(real[0].re, 5, 1e-5);

    expect(complex).toHaveLength(2);
    const sorted = [...complex].sort((x, y) => x.im - y.im);
    expectClose(sorted[0].re, Math.cos(theta), 1e-5);
    expectClose(sorted[0].im, -Math.sin(theta), 1e-5);
    expectClose(sorted[1].re, Math.cos(theta), 1e-5);
    expectClose(sorted[1].im, Math.sin(theta), 1e-5);
  });
});

describe('Matrix.eigen — real eigenvectors', () => {
  it('computes eigenvectors satisfying A*v = lambda*v for a symmetric matrix', () => {
    const a = Matrix.fromArray([
      [4, 1],
      [1, 3],
    ]);
    const { eigenvalues, eigenvectors } = a.eigen();

    for (let i = 0; i < eigenvalues.length; i++) {
      const v = eigenvectors[i];
      expect(v).not.toBeNull();
      if (!v) continue;

      const av = a.multiply(Matrix.fromArray(v.toJSON().map((x) => [x])));
      const lambdaV = v.toJSON().map((x) => x * eigenvalues[i].re);

      for (let r = 0; r < av.rows; r++) {
        expectClose(av.get(r, 0), lambdaV[r], 1e-4);
      }
    }
  });

  it('returns a unit-length eigenvector', () => {
    const a = Matrix.fromArray([
      [2, 0],
      [0, 5],
    ]);
    const { eigenvectors } = a.eigen();
    for (const v of eigenvectors) {
      expect(v).not.toBeNull();
      if (!v) continue;
      const norm = Math.hypot(...v.toJSON());
      expectClose(norm, 1, 1e-6);
    }
  });
});

describe('Matrix.eigen — known convergence limitations', () => {
  // These document the caveats we flagged rather than asserting perfection:
  // a single-shift QR implementation isn't guaranteed to converge as
  // robustly as a full double-shift (Francis) algorithm on every input.
  // If this test starts failing, it's a real signal the implementation
  // needs the double-shift upgrade — not a test to silently loosen.

  it('converges within maxIterations for a well-conditioned 5x5 matrix', () => {
    const a = Matrix.fromArray([
      [4, 1, 0, 0, 0],
      [1, 3, 1, 0, 0],
      [0, 1, 5, 1, 0],
      [0, 0, 1, 2, 1],
      [0, 0, 0, 1, 6],
    ]);
    expect(() => a.eigen()).not.toThrow();
  });

  it("throws a clear error rather than looping forever when it can't converge", () => {
    // Artificially tiny maxIterations forces the failure path on
    // ANY nontrivial matrix — this pins down that the error is
    // actually reachable and has a sensible message, without needing
    // to hand-craft a pathological non-converging matrix.
    const a = Matrix.fromArray([
      [4, 1, 2],
      [1, 3, 1],
      [2, 1, 5],
    ]);
    expect(() => a.eigen(0)).toThrow(/did not converge/);
  });
});

describe('eigen — nearly-degenerate eigenvalues (classic slow-convergence case)', () => {
  it('still converges and separates two very close real eigenvalues', () => {
    // Constructed by similarity transform from a diagonal with eigenvalues
    // 5.0 and 5.0001 — deliberately close enough to stress a single-shift
    // QR's convergence rate, since shifts near one eigenvalue can be
    // ambiguous about which of the two nearby values they're pulling toward.
    const p = Matrix.fromArray([
      [1, 2],
      [3, 5],
    ]);
    const d = Matrix.fromArray([
      [5, 0],
      [0, 5.0001],
    ]);
    const a = p.multiply(d).multiply(p.inverse());

    let result: EigenResult;
    expect(() => {
      result = a.eigen(2000); // generous iteration budget for a hard case
    }).not.toThrow();

    const values = result!.eigenvalues.map((e) => e.re).sort((x, y) => x - y);
    expect(result!.eigenvalues.every((e) => Math.abs(e.im) < 1e-4)).toBe(true);
    expectClose(values[0], 5, 1e-3);
    expectClose(values[1], 5.0001, 1e-3);
  });

  it('handles a repeated eigenvalue (diagonalizable case: identity-like block)', () => {
    // A genuinely has eigenvalue 3 with multiplicity 2 (it's 3*I after similarity),
    // which is the easy, non-defective version of a repeated eigenvalue.
    const p = Matrix.fromArray([
      [2, 1],
      [1, 1],
    ]);
    const d = Matrix.fromArray([
      [3, 0],
      [0, 3],
    ]);
    const a = p.multiply(d).multiply(p.inverse());

    const { eigenvalues } = a.eigen();
    expect(eigenvalues.every((e) => Math.abs(e.im) < 1e-5)).toBe(true);
    expectClose(eigenvalues[0].re, 3, 1e-4);
    expectClose(eigenvalues[1].re, 3, 1e-4);
  });
});

describe('eigen — defective (non-diagonalizable) matrix', () => {
  it('still reports the correct eigenvalue for a Jordan block, even though it has no full eigenvector basis', () => {
    // Classic 2x2 Jordan block: eigenvalue 4 with algebraic multiplicity 2,
    // but only ONE independent eigenvector exists. eigenvalues should still
    // come out correct — it's eigenVECTORS that are expected to be unreliable
    // here, per the caveat we flagged when building eigen().
    const jordan = Matrix.fromArray([
      [4, 1],
      [0, 4],
    ]);

    const { eigenvalues } = jordan.eigen();
    expect(eigenvalues.every((e) => Math.abs(e.im) < 1e-5)).toBe(true);
    expectClose(eigenvalues[0].re, 4, 1e-4);
    expectClose(eigenvalues[1].re, 4, 1e-4);
  });

  it("does not crash computing 'an' eigenvector for a defective matrix, even if not meaningful", () => {
    const jordan = Matrix.fromArray([
      [4, 1],
      [0, 4],
    ]);
    expect(() => jordan.eigen()).not.toThrow();
  });
});

describe('eigen — ill-conditioned matrix', () => {
  it('still recovers eigenvalues (with looser tolerance) for a poorly-scaled matrix', () => {
    // Wide spread between the largest and smallest diagonal entries —
    // stresses numerical stability of the shift/deflation logic, since
    // relative deflation thresholds (epsilon * scale) behave differently
    // across widely different magnitudes within the same matrix.
    const a = Matrix.fromArray([
      [1e6, 1, 0],
      [1, 2, 1],
      [0, 1, 1e-3],
    ]);

    let result;
    expect(() => {
      result = a.eigen(1000);
    }).not.toThrow();

    // Cross-check via trace/determinant instead of asserting exact values —
    // more robust ground truth than hand-deriving a cubic's roots for a
    // matrix with this much dynamic range.
    expectClose(sumRe(result!.eigenvalues), a.trace(), 1);
    const { re, im } = productComplex(result!.eigenvalues);
    expectClose(re, a.determinant(), Math.abs(a.determinant()) * 1e-3);
    expectClose(im, 0, 1);
  });
});

describe('eigen — larger matrix (stress beyond hand-checkable sizes)', () => {
  it('converges for a 6x6 symmetric matrix and agrees with eigenSymmetric()', () => {
    const data = [
      [4, 1, 0, 0, 2, 0],
      [1, 3, 1, 0, 0, 1],
      [0, 1, 5, 1, 0, 0],
      [0, 0, 1, 6, 1, 0],
      [2, 0, 0, 1, 4, 1],
      [0, 1, 0, 0, 1, 3],
    ];
    const a = Matrix.fromArray(data);
    expect(a.isSymmetric()).toBe(true);

    const fromEigen = a
      .eigen(1000)
      .eigenvalues.map((e) => e.re)
      .sort((x, y) => x - y);
    const fromSymmetric = [...a.eigenSymmetric().eigenvalues].sort(
      (x, y) => x - y
    );

    expect(fromEigen).toHaveLength(6);
    for (let i = 0; i < 6; i++) {
      expectClose(fromEigen[i], fromSymmetric[i], 1e-3);
    }
  });

  it('converges for a 6x6 non-symmetric matrix within a reasonable iteration count', () => {
    const a = Matrix.fromArray([
      [4, 1, 0, 2, 0, 1],
      [0, 3, 1, 0, 1, 0],
      [1, 0, 5, 1, 0, 0],
      [0, 1, 0, 6, 1, 2],
      [2, 0, 1, 0, 4, 1],
      [0, 0, 0, 1, 0, 3],
    ]);

    let result;
    expect(() => {
      result = a.eigen(1000);
    }).not.toThrow();

    expect(result!.eigenvalues).toHaveLength(6);
    expectClose(sumRe(result!.eigenvalues), a.trace(), 1e-2);
    const { re, im } = productComplex(result!.eigenvalues);
    expectClose(re, a.determinant(), Math.abs(a.determinant()) * 1e-2 + 1e-6);
    expectClose(im, 0, 1e-2);
  });
});

describe('eigen — pathological shift scenarios', () => {
  it('handles a matrix where the trailing 2x2 block is already exactly diagonal (shift = exact eigenvalue)', () => {
    // If h[m-1][m-1] happens to exactly equal the Wilkinson shift on some
    // iteration, (active - mu*I) can become singular right when we're
    // about to QR-factor it — this is a known edge case for shifted QR
    // that a naive implementation can mishandle.
    const a = Matrix.fromArray([
      [2, 1, 0],
      [1, 2, 0],
      [0, 0, 2],
    ]);

    let result: EigenResult;
    expect(() => {
      result = a.eigen();
    }).not.toThrow();

    const values = result!.eigenvalues.map((e) => e.re).sort((x, y) => x - y);
    expectClose(values[0], 1, 1e-4);
    expectClose(values[1], 2, 1e-4);
    expectClose(values[2], 3, 1e-4);
  });

  it('handles an all-zero matrix (every eigenvalue is 0)', () => {
    const a = Matrix.zeros(3, 3);
    const { eigenvalues } = a.eigen();
    expect(
      eigenvalues.every((e) => Math.abs(e.re) < 1e-9 && Math.abs(e.im) < 1e-9)
    ).toBe(true);
  });

  it('handles a matrix that is already diagonal (no QR iterations should even be needed)', () => {
    const a = Matrix.fromArray([
      [1, 0, 0],
      [0, 2, 0],
      [0, 0, 3],
    ]);
    const { eigenvalues } = a.eigen(1); // maxIterations=1: should still succeed via immediate deflation
    const values = eigenvalues.map((e) => e.re).sort((x, y) => x - y);
    expect(values).toEqual([1, 2, 3]);
  });
});
