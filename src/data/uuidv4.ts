export function uuidv4(): `${string}-${string}-${string}-${string}-${string}` {
  // Access via globalThis to prevent TS from throwing 'Cannot find name crypto'
  const g = globalThis as unknown as {
    crypto?: {
      randomUUID?: () => `${string}-${string}-${string}-${string}-${string}`;
    };
  };

  // If native crypto.randomUUID exists, use it
  if (typeof g.crypto?.randomUUID === 'function') {
    return g.crypto.randomUUID();
  }

  // Fallback for insecure contexts or legacy engines
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  }) as `${string}-${string}-${string}-${string}-${string}`;
}
