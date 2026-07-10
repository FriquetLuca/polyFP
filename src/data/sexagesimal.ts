export class Sexagesimal {
  public readonly totalDegrees: number;
  constructor(totalDegrees: number) {
    this.totalDegrees = totalDegrees;
  }
  static isSexagesimal(value: string): boolean {
    const trimmed = value.trim();

    // 1. Basic sanity checks: Reject empty strings or lone symbols
    if (!trimmed || trimmed === '-') return false;

    // 2. Strict Regex:
    // ^[-]?\s* : Starts with optional sign and optional space
    // (?:...)            : Matches the sequence of H, M, S, and DCM components
    // \s*$               : Ensures the string ends immediately after the last component
    const strictPattern =
      /^[-]?\s*(?:(?:\d+\s*[°h])?\s*(?:\d+\s*')?\s*(?:\d+\s*")?\s*(?:\d+)?)?\s*$/;

    // 3. Edge case: Ensure at least one component was actually matched
    // (The regex above allows empty matches for H/M/S/DCM, so we need to verify
    // that the string isn't just whitespace)
    const hasContent = /\d/.test(trimmed);

    return hasContent && strictPattern.test(trimmed);
  }
  static parse(value: string): Sexagesimal | null {
    if (!Sexagesimal.isSexagesimal(value)) return null;
    const trimmed = value.trim();
    const isNegative = trimmed.startsWith('-');
    const cleanValue = isNegative ? trimmed.substring(1) : trimmed;

    const h = parseInt(cleanValue.match(/(\d+)\s*[°h]/)?.[1] ?? '0', 10);
    const m = parseInt(cleanValue.match(/(\d+)\s*'/)?.[1] ?? '0', 10);
    const s = parseInt(cleanValue.match(/(\d+)\s*"/)?.[1] ?? '0', 10);

    // Find DCM: Check for sequence after ", or if no symbols exist, the whole string
    let dcmMatch = cleanValue.match(/"\s*(\d+)/)?.[1];
    if (!dcmMatch && !/[°h'"]/.test(cleanValue)) {
      dcmMatch = cleanValue;
    }

    // Apply fractional scaling for DCM (Deci-Centi-Milli)
    let dcm = 0;
    if (dcmMatch && /^\d+$/.test(dcmMatch)) {
      dcm = parseInt(dcmMatch, 10) / Math.pow(10, dcmMatch.length);
    }

    const total = h + m / 60 + (s + dcm) / 3600;
    return new Sexagesimal(isNegative ? -total : total);
  }
  add(other: Sexagesimal): Sexagesimal {
    return new Sexagesimal(this.totalDegrees + other.totalDegrees);
  }
  subtract(other: Sexagesimal): Sexagesimal {
    return new Sexagesimal(this.totalDegrees - other.totalDegrees);
  }
  scale(scalar: number) {
    return new Sexagesimal(this.totalDegrees * scalar);
  }
  toSeconds(precision: number = 3) {
    const precise = Math.pow(10, precision);
    const isNegative = this.totalDegrees < 0;
    const absVal = Math.abs(this.totalDegrees);
    const h = Math.floor(absVal);
    const remainingM = (absVal - h) * 60;
    const m = Math.floor(remainingM);
    const remainingS = (remainingM - m) * 60;
    const s = Math.floor(remainingS);
    const dcm = Math.round((remainingS - s) * precise);
    const sign = isNegative ? -1 : 1;
    return sign * (s + dcm / precise);
  }
  toString(precision: number = 3): string {
    const isNegative = this.totalDegrees < 0;
    const absVal = Math.abs(this.totalDegrees);
    const h = Math.floor(absVal);
    const remainingM = (absVal - h) * 60;
    const m = Math.floor(remainingM);
    const remainingS = (remainingM - m) * 60;
    const s = Math.floor(remainingS);
    const dcm = Math.round((remainingS - s) * Math.pow(10, precision));
    const sign = isNegative ? '-' : '';
    return `${sign}${h}°${m}'${s}"${dcm.toString().padStart(precision, '0')}`;
  }
}
