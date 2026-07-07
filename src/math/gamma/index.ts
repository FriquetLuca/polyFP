const SQRTPI = 0.9189385332046727417803297; // ln(sqrt(2π))
const PI = Math.PI;
const XBIG = 171.624;
const XMININ = 2.23e-308;
const EPS = 2.22e-16;
const XINF = Number.POSITIVE_INFINITY;

const P = [
  -1.71618513886549492533811, 2.47656508055759199108314e1,
  -3.79804256470945635097577e2, 6.29331155312818442661052e2,
  8.66966202790413211295064e2, -3.14512729688483675254357e4,
  -3.61444134186911729807069e4, 6.64561438202405440627855e4,
];

const Q = [
  -3.08402300119738975254353e1, 3.15350626979604161529144e2,
  -1.01515636749021914166146e3, -3.10777167157231109440444e3,
  2.25381184209801510330112e4, 4.75584627752788110767815e3,
  -1.34659959864969306392456e5, -1.15132259675553483497211e5,
];

const C = [
  -1.910444077728e-3, 8.4171387781295e-4, -5.952379913043012e-4,
  7.93650793500350248e-4, -2.777777777777681622553e-3,
  8.333333333333333331554247e-2, 5.7083835261e-3,
];

export function gamma(x: number): number {
  if (x === Number.NEGATIVE_INFINITY) return Number.NaN;
  let parity = false;
  let fact = 1.0;
  let n = 0;
  let y = x;
  let y1: number;
  let res: number;
  let z: number;
  if (y <= 0.0) {
    y = -x;
    y1 = Math.trunc(y);
    const frac = y - y1;
    if (frac !== 0) {
      if (y1 % 2 !== 0) {
        parity = true;
      }
      fact = -PI / Math.sin(PI * frac);
      y += 1.0;
    } else {
      return XINF;
    }
  }
  if (y < EPS) {
    if (y >= XMININ) {
      res = 1.0 / y;
    } else {
      return XINF;
    }
  } else if (y < 12.0) {
    y1 = y;
    if (y < 1.0) {
      z = y;
      y += 1.0;
    } else {
      n = Math.trunc(y) - 1;
      y -= n;
      z = y - 1.0;
    }
    let xnum = 0.0;
    let xden = 1.0;
    for (let i = 0; i < 8; i++) {
      xnum = (xnum + P[i]) * z;
      xden = xden * z + Q[i];
    }
    res = xnum / xden + 1.0;
    if (y1 < y) {
      res /= y1;
    } else if (y1 > y) {
      for (let i = 0; i < n; i++) {
        res *= y;
        y += 1.0;
      }
    }
  } else {
    if (y > XBIG) return XINF;
    const ysq = y * y;
    let sum = C[6];
    for (let i = 0; i < 6; i++) {
      sum = sum / ysq + C[i];
    }
    sum = sum / y - y + SQRTPI;
    sum += (y - 0.5) * Math.log(y);
    res = Math.exp(sum);
  }
  if (parity) {
    res = -res;
  }
  if (fact !== 1.0) {
    res = fact / res;
  }
  return res;
}
