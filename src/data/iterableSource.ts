export type IterableInput<T> = T extends string
  ? T
  : T extends (infer U)[]
    ? U[]
    : never;
export type IterableOutput<T> = T extends string
  ? T
  : T extends (infer U)[]
    ? U
    : never;

/**
 * A generic class for iterating over strings or arrays element by element.
 * Provides peek, next, and advancement methods for sequential access.
 */
export class IterableSource<T> {
  private src: IterableInput<T>;
  private index: number;
  /**
   * Initializes the iterable source with a string or an array.
   * @param src The input source to iterate over (string or array).
   */
  constructor(src: IterableInput<T>) {
    this.src = src;
    this.index = 0;
  }
  /**
   * Checks if the iterator has reached the end of the source.
   * @returns `true` if at the end, otherwise `false`.
   */
  public isEOS() {
    return !(this.index < this.src.length);
  }
  /**
   * Checks if there is a value available to peek at the current index.
   * @returns `true` if a value can be peeked, otherwise `false`.
   */
  public canPeek() {
    return this.index < this.src.length;
  }
  /**
   * Returns the current element at the current index without advancing.
   * @returns The current element, or `null` if at the end.
   */
  public peek() {
    if (this.index < this.src.length) {
      return this.src[this.index] as IterableOutput<T>;
    }
    return null;
  }
  /**
   * Returns a slice of elements starting from the current index without advancing.
   * @param length The number of elements to retrieve.
   * @returns A slice of the input, or `null` if at the end.
   */
  public multiPeek(length: number) {
    if (this.index < this.src.length) {
      return this.src.slice(
        this.index,
        this.index + length
      ) as IterableInput<T>;
    }
    return null;
  }
  /**
   * Advances the iterator by one element and returns the new current element.
   * @returns The new current element, or `null` if at the end.
   */
  public next() {
    if (this.index < this.src.length) {
      return this.src[this.index++] as IterableOutput<T>;
    }
    return null;
  }
  /**
   * Returns a slice of elements and advances the internal index by the slice's length.
   * @param length The number of elements to retrieve and consume.
   * @returns The sliced elements, or `null` if at the end.
   */
  public multiNext(length: number) {
    if (this.index < this.src.length) {
      const result = this.src.slice(this.index, this.index + length);
      this.index += result.length;
      return result as IterableInput<T>;
    }
    return null;
  }
}
