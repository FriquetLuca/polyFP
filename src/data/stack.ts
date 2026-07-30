import { StackOverflowError, StackUnderflowError } from './errors';
import { SoloNode } from './utils';

/**
 * A generic LIFO (Last-In-First-Out) stack implemented using a singly-linked list.
 *
 * @template T The type of elements stored in the stack.
 */
export class Stack<T> {
  private head: SoloNode<T> | null;
  private _size: number;
  /**
   * Creates an empty stack.
   */
  constructor() {
    this.head = null;
    this._size = 0;
  }
  /**
   * Pushes a new item onto the top of the stack.
   * @param item The item to push.
   * @throws StackOverflowError If memory allocation fails (very rare in practice).
   */
  push(item: T) {
    const newNode = new SoloNode(item);
    if (!newNode) {
      throw new StackOverflowError();
    }
    newNode.next = this.head;
    this.head = newNode;
    this._size++;
  }
  /**
   * Access the head value, if it exist, and use a function on it.
   * @param apply The function to apply on the head value.
   */
  onHead(apply: (item: T) => void) {
    if (this.head !== null) {
      apply(this.head.value);
    }
  }
  /**
   * Removes the item from the top of the stack.
   * @throws StackUnderflowError If the stack is empty.
   */
  pop() {
    if (this.head === null) {
      throw new StackUnderflowError();
    }
    const temp = this.head;
    this.head = temp.next;
    this._size--;
  }
  /**
   * Returns the item at the top of the stack without removing it.
   * @returns The top item, or `null` if the stack is empty.
   */
  peek() {
    return this.head === null ? null : this.head.value;
  }
  /**
   * Checks whether the stack is empty.
   * @returns `true` if the stack contains no items.
   */
  isEmpty() {
    return this.head === null;
  }
  /**
   * Returns the number of items currently in the stack.
   * @returns The stack size.
   */
  size() {
    return this._size;
  }
  /**
   * Iterates through the stack from last to first.
   */
  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
