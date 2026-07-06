export function cartesianProduct<T>(...arrays: T[][]): T[][] {
  if (arrays.length === 0) {
    return [];
  }

  let result: T[][] = [[]];

  for (const array of arrays) {
    const next: T[][] = [];

    for (const prefix of result) {
      for (const value of array) {
        next.push([...prefix, value]);
      }
    }

    result = next;
  }

  return result;
}
