export const lowerFirst = (word: string) =>
  word.length === 0 ? '' : word[0].toLowerCase() + word.slice(1);
