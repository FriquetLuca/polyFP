import { QueueOverflowError, QueueUnderflowError } from './errors';
import { SoloNode } from './utils';

/**
 * A simple linked-list-based FIFO queue.
 * Supports optional capacity and is iterable.
 *
 * @template T The type of elements stored in the queue.
 */
export class Queue<T> {
  private front: SoloNode<T> | null;
  private rear: SoloNode<T> | null;
  private _size: number;
  private _capacity: number | null;
  /**
   * Creates a new Queue.
   * @param capacity Optional maximum capacity. If omitted, the queue is unbounded.
   */
  constructor(capacity?: number) {
    this.front = null;
    this.rear = null;
    this._size = 0;
    this._capacity = capacity ? Math.max(0, capacity) : null;
  }
  /** @returns The maximum capacity of the queue or `null` if unbounded. */
  public capacity() {
    return this._capacity;
  }
  /**
   * Adds an item to the queue.
   * @param item The item to enqueue.
   * @throws QueueOverflowError if the queue is at capacity.
   */
  public enqueue(item: T) {
    if (this._capacity !== null && this._capacity === this._size) {
      throw new QueueOverflowError();
    }
    const newNode = new SoloNode(item);
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      if (this.rear) {
        this.rear.next = newNode;
      }
      this.rear = newNode;
    }
    this._size++;
  }
  /**
   * Removes and returns the front item from the queue.
   * @returns The dequeued item.
   * @throws QueueUnderflowError if the queue is empty.
   */
  public dequeue() {
    if (this.isEmpty()) {
      throw new QueueUnderflowError();
    }
    const removedNode = this.front as SoloNode<T>;
    this.front = removedNode.next;
    if (this.front === null) {
      this.rear = null;
    }
    this._size--;
    return removedNode.value;
  }
  /**
   * Peeks at the item at the front of the queue without removing it.
   * @returns The front item or `null` if the queue is empty.
   */
  public peek() {
    if (this.isEmpty()) {
      return null;
    }
    return (this.front as SoloNode<T>).value;
  }
  /** @returns `true` if the queue is empty. */
  public isEmpty() {
    return this._size === 0;
  }
  /** @returns The number of items in the queue. */
  public size() {
    return this._size;
  }
  /**
   * Iterates through the queue from front to back.
   */
  *[Symbol.iterator]() {
    let current = this.front;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
