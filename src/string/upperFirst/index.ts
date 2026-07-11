export const upperFirst = (word: string) =>
  word.length === 0 ? '' : word[0].toUpperCase() + word.slice(1);
