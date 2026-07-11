export function levenshtein(a: string, b: string): number {
  const charsA = Array.from(a);
  const charsB = Array.from(b);
  const rows = charsA.length + 1;
  const cols = charsB.length + 1;

  const dp = Array.from({ length: rows }, () =>
    new Array<number>(cols).fill(0)
  );

  for (let i = 0; i < rows; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j < cols; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = charsA[i - 1] === charsB[j - 1] ? 0 : 1;

      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[charsA.length][charsB.length];
}
