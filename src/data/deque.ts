import { QueueOverflowError, QueueUnderflowError } from './errors';
import { DualNode } from './utils';

/**
 * A double-ended queue implemented using a doubly-linked list.
 * Supports insertion and removal from both ends.
 *
 * @template T The type of elements stored.
 */
export class Deque<T> {
  private head: DualNode<T> | null;
  private tail: DualNode<T> | null;
  private _size: number;
  /** Creates an empty deque. */
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }
  /**
   * Adds an item to the front of the deque.
   * @param item The item to insert.
   * @throws QueueOverflowError if allocation fails (theoretically).
   */
  public addFront(item: T) {
    const newNode = new DualNode(item);
    if (!newNode) {
      throw new QueueOverflowError('Deque overflow: maximum capacity reached');
    }
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      if (this.head) {
        this.head.prev = newNode;
      }
      this.head = newNode;
    }
    this._size++;
  }
  /**
   * Adds an item to the back of the deque.
   * @param item The item to insert.
   * @throws QueueOverflowError if allocation fails (theoretically).
   */
  public addBack(item: T) {
    const newNode = new DualNode(item);
    if (!newNode) {
      throw new QueueOverflowError('Deque underflow: deque is empty');
    }
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
    }
    this._size++;
  }
  /**
   * Removes the front item from the deque.
   * @throws QueueUnderflowError if the deque is empty.
   */
  public removeFront() {
    if (this.head === null) {
      throw new QueueUnderflowError('Deque underflow: deque is empty');
    } else {
      const temp = this.head;
      this.head = temp.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      this._size--;
    }
  }
  /**
   * Removes the rear item from the deque.
   * @throws QueueUnderflowError if the deque is empty.
   */
  public removeBack() {
    if (this.tail === null) {
      throw new QueueUnderflowError('Deque underflow: deque is empty');
    } else {
      const temp = this.tail;
      this.tail = temp.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      this._size--;
    }
  }
  /** @returns The front item or `null` if the deque is empty. */
  public peekFront() {
    return this.head === null ? null : this.head.value;
  }
  /** @returns The rear item or `null` if the deque is empty. */
  public peekBack() {
    return this.tail === null ? null : this.tail.value;
  }
  /** @returns `true` if the deque has no elements. */
  public isEmpty() {
    return this._size === 0;
  }
  /** @returns The number of elements in the deque. */
  public size() {
    return this._size;
  }
  /** Removes all items from the deque. */
  public clear() {
    while (!this.isEmpty()) {
      this.removeFront();
    }
  }
  /**
   * Iterates through the deque from front to back.
   */
  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
