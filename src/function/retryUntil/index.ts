import { timeout } from '../timeout/index.js';

export interface RetryUntilOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffFactor?: number; // multiplies delayMs after each failed attempt
  retryOnError?: boolean;
}

export class RetryExhaustedError extends Error {
  public readonly lastResult: unknown;
  constructor(attempts: number, lastResult: unknown) {
    super(
      `retryUntil: exhausted ${attempts} attempts without satisfying the predicate`
    );
    this.name = 'RetryExhaustedError';
    this.lastResult = lastResult;
  }
}

export function retryUntil<T, Args extends unknown[]>(
  fn: (...args: Args) => Promise<T>,
  predicate: (result: T) => boolean,
  options: RetryUntilOptions = {}
): (...args: Args) => Promise<T> {
  const {
    maxAttempts = 10,
    delayMs = 0,
    backoffFactor = 1,
    retryOnError = true,
  } = options;
  if (!Number.isInteger(maxAttempts) || maxAttempts <= 0) {
    throw new Error('retryUntil: maxAttempts must be a positive integer');
  }
  let currentDelay = delayMs;
  let lastResult: T | undefined;
  return async function (...args: Args) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const result = await fn(...args);
        if (predicate(result)) return result;
        lastResult = result;
      } catch (err) {
        if (!retryOnError) throw err;
      }
      if (attempt < maxAttempts && currentDelay > 0) {
        await timeout(currentDelay);
        currentDelay *= backoffFactor;
      }
    }
    throw new RetryExhaustedError(maxAttempts, lastResult);
  };
}
