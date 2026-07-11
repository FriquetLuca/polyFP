export function jaro(a: string, b: string): number {
  if (a === b) return 1;
  const charsA = Array.from(a);
  const charsB = Array.from(b);
  const aLength = charsA.length;
  const bLength = charsB.length;
  if (aLength === 0 || bLength === 0) return 0;
  const matchDistance = Math.max(
    0,
    Math.floor(Math.max(aLength, bLength) / 2) - 1
  );
  const matchedA = new Array<boolean>(aLength).fill(false);
  const matchedB = new Array<boolean>(bLength).fill(false);
  let matches = 0;
  for (let i = 0; i < aLength; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, bLength);
    for (let j = start; j < end; j++) {
      if (matchedB[j] || charsA[i] !== charsB[j]) {
        continue;
      }
      matchedA[i] = true;
      matchedB[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) {
    return 0;
  }
  let transpositions = 0;
  let j = 0;

  for (let i = 0; i < aLength; i++) {
    if (!matchedA[i]) continue;

    while (!matchedB[j]) {
      j++;
    }
    if (charsA[i] !== charsB[j]) {
      transpositions++;
    }
    j++;
  }

  transpositions /= 2;
  return (
    (matches / aLength +
      matches / bLength +
      (matches - transpositions) / matches) /
    3
  );
}
