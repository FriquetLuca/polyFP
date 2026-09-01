import { randomHex } from './randomHex.js';

export function uuidv7(): `${string}-${string}-${string}-${string}-${string}` {
  const now = Date.now();
  const hexTime = now.toString(16).padStart(12, '0');
  const randA = randomHex(3);
  const variant = (8 + Math.floor(Math.random() * 4)).toString(16);
  const randB = randomHex(15);
  return `${hexTime.slice(0, 8)}-${hexTime.slice(8)}-7${randA}-${variant}${randB.slice(0, 3)}-${randB.slice(3)}` as `${string}-${string}-${string}-${string}-${string}`;
}
