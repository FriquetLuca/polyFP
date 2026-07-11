export function randomStr(
  length: number,
  chars: string = 'abcdefghijklmnopqrstuvwxyz0123456789'
) {
  if (!Number.isInteger(length) || length < 0)
    throw new Error('length must be a non-negative integer');
  if (chars.length === 0) throw new Error('chars cannot be empty');
  let str = '';
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
