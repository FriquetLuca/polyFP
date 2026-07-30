import { QueueOverflowError, QueueUnderflowError } from './errors.js';

/**
 * A fixed-size circular buffer (ring buffer) queue.
 * Overwrites old values once the buffer is full if managed manually.
 *
 * @template T The type of elements stored.
 */
export class CircularQueue<T> {
  private arr: T[];
  private _capacity: number;
  private _size: number;
  private front: number;
  /**
   * Constructs a circular queue with a fixed capacity.
   * @param capacity Maximum number of items the queue can hold.
   */
  constructor(capacity: number) {
    this.arr = new Array<T>(capacity);
    this._capacity = capacity;
    this._size = 0;
    this.front = 0;
  }
  /** @returns The number of items currently in the queue. */
  public size() {
    return this._size;
  }
  /** @returns The fixed capacity of the queue. */
  public capacity() {
    return this._capacity;
  }
  /** @returns The front item without removing it, or `null` if empty. */
  public getFront() {
    if (this._size === 0) {
      return null;
    }
    return this.arr[this.front];
  }
  /** @returns The last item in the queue, or `null` if empty. */
  public getRear() {
    if (this._size === 0) {
      return null;
    }
    return this.arr[(this.front + this._size - 1) % this._capacity];
  }
  /**
   * Adds an item to the rear of the queue.
   * @param item The item to enqueue.
   * @throws QueueOverflowError if the queue is full.
   */
  public enqueue(item: T) {
    if (this._size === this._capacity) {
      throw new QueueOverflowError(
        'CircularQueue overflow: maximum capacity reached'
      );
    }
    this.arr[(this.front + this._size) % this._capacity] = item;
    this._size++;
  }
  /**
   * Removes and returns the front item.
   * @returns The dequeued item.
   * @throws QueueUnderflowError if the queue is empty.
   */
  public dequeue() {
    if (this._size === 0) {
      throw new QueueUnderflowError(
        'CircularQueue underflow: circular queue is empty'
      );
    }
    const res = this.arr[this.front];
    this.front = (this.front + 1) % this._capacity;
    this._size--;
    return res;
  }
}
