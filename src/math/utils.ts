// Source: https://www.netlib.org/specfun/erf
const SQRPI = 0.56418958354775628695;

const A = [
  3.1611237438705656, 113.864154151050156, 377.485237685302021,
  3209.37758913846947, 0.185777706184603153,
];

const B = [
  23.6012909523441209, 244.024637934444173, 1282.61652607737228,
  2844.23683343917062,
];

const C = [
  0.564188496988670089, 8.88314979438837594, 66.1191906371416295,
  298.635138197400131, 881.95222124176909, 1712.04761263407058,
  2051.07837782607147, 1230.33935479799725, 2.15311535474403846e-8,
];

const D = [
  15.7449261107098347, 117.693950891312499, 537.181101862009858,
  1621.38957456669019, 3290.79923573345963, 4362.61909014324716,
  3439.36767414372164, 1230.33935480374942,
];

const P = [
  0.305326634961232344, 0.360344899949804439, 0.125781726111229246,
  0.0160837851487422766, 0.000658749161529837803, 0.0163153871373020978,
];

const Q = [
  2.56852019228982242, 1.87295284992346047, 0.527905102951428412,
  0.0605183413124413191, 0.00233520497626869185,
];

export function calerf(arg: number, jint: 0 | 1 | 2): number {
  let result;
  const x = arg;
  const y = Math.abs(x);
  let xnum: number;
  let xden: number;
  let ysq: number;
  let del: number;

  if (y <= 0.46875) {
    ysq = 0;

    if (y > 1.11e-16) {
      ysq = y * y;
    }

    xnum = A[4] * ysq;
    xden = ysq;

    for (let i = 0; i < 3; i++) {
      xnum = (xnum + A[i]) * ysq;
      xden = (xden + B[i]) * ysq;
    }

    result = (x * (xnum + A[3])) / (xden + B[3]);

    if (jint !== 0) {
      result = 1 - result;
    }

    if (jint === 2) {
      return Math.exp(ysq) * result;
    }

    return result;
  }

  if (y <= 4.0) {
    xnum = C[8] * y;
    xden = y;

    for (let i = 0; i < 7; i++) {
      xnum = (xnum + C[i]) * y;
      xden = (xden + D[i]) * y;
    }

    result = (xnum + C[7]) / (xden + D[7]);

    if (jint !== 2) {
      ysq = Math.floor(y * 16.0) / 16.0;
      del = (y - ysq) * (y + ysq);

      result = Math.exp(-ysq * ysq) * Math.exp(-del) * result;
    }
  } else {
    result = 0;
    if (y >= 26.543) {
      if (jint !== 2 || y >= 2.53e307) {
        return fixNegative(x, result, jint);
      }

      if (y >= 6.71e7) {
        result = SQRPI / y;
        return fixNegative(x, result, jint);
      }
    }
    ysq = 1 / (y * y);
    xnum = P[5] * ysq;
    xden = ysq;
    for (let i = 0; i < 4; i++) {
      xnum = (xnum + P[i]) * ysq;
      xden = (xden + Q[i]) * ysq;
    }
    result = (ysq * (xnum + P[4])) / (xden + Q[4]);

    result = (SQRPI - result) / y;

    if (jint !== 2) {
      ysq = Math.floor(y * 16.0) / 16.0;
      del = (y - ysq) * (y + ysq);
      result = Math.exp(-ysq * ysq) * Math.exp(-del) * result;
    }
  }
  return fixNegative(x, result, jint);
}

function fixNegative(x: number, result: number, jint: 0 | 1 | 2): number {
  if (jint === 0) {
    result = 0.5 - result + 0.5;

    if (x < 0) {
      result = -result;
    }
  } else if (jint === 1) {
    if (x < 0) {
      result = 2 - result;
    }
  } else {
    if (x < 0) {
      if (x < -26.628) {
        result = Number.MAX_VALUE;
      } else {
        const ysq = Math.floor(x * 16.0) / 16.0;
        const del = (x - ysq) * (x + ysq);

        const y = Math.exp(ysq * ysq) * Math.exp(del);

        result = y + y - result;
      }
    }
  }

  return result;
}
