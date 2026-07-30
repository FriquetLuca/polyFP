import { QueueOverflowError, QueueUnderflowError } from './errors.js';

export class SoloNode<T> {
  public value: T;
  public next: SoloNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class DualNode<T> {
  public value: T;
  public prev: DualNode<T> | null;
  public next: DualNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

/**
 * A generic abstract base class for implementing a priority queue.
 *
 * Stores elements along with their priority and allows enqueueing with priority,
 * peeking at the highest-priority item, and dequeueing in priority order.
 *
 * Subclasses must implement `heapifyUp()` and `heapifyDown()` to define the heap behavior.
 *
 * @template T The type of item stored in the queue.
 */
export abstract class PriorityQueue<T> {
  protected heap: { item: T; priority: number }[];
  private _capacity: number | null;
  /**
   * Creates a new PriorityQueue with an optional capacity limit.
   * @param capacity Maximum number of items allowed in the queue. If omitted, the queue is unbounded.
   */
  constructor(capacity?: number) {
    this.heap = [];
    this._capacity = capacity ?? null;
  }
  /**
   * Checks if the queue is empty.
   * @returns `true` if the queue is empty; otherwise `false`.
   */
  public isEmpty() {
    return this.heap.length === 0;
  }
  /**
   * Returns the number of items currently in the queue.
   */
  public size() {
    return this.heap.length;
  }
  /**
   * Returns the item at the front of the queue without removing it.
   * @returns The highest-priority item, or `null` if the queue is empty.
   */
  public peek() {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0];
  }
  /**
   * Removes and returns the item with the highest priority from the queue.
   * @throws QueueUnderflowError if the queue is empty.
   */
  public dequeue() {
    if (this.heap.length === 0) {
      throw new QueueUnderflowError('PriorityQueue underflow: queue is empty');
    }
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return item;
  }
  /**
   * Adds an item to the queue with a specified priority.
   * @param item The item to enqueue.
   * @param priority The priority value (lower values typically mean higher priority).
   * @throws QueueOverflowError if the queue is at capacity.
   */
  public enqueue(item: T, priority: number) {
    if (this._capacity !== null && this._capacity === this.heap.length) {
      throw new QueueOverflowError(
        'PriorityQueue overflow: maximum capacity reached'
      );
    }
    this.heap.push({ item, priority });
    this.heapifyUp();
  }
  protected getLeftChildIndex(parentIndex: number) {
    return 2 * parentIndex + 1;
  }
  protected getRightChildIndex(parentIndex: number) {
    return 2 * parentIndex + 2;
  }
  protected getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2);
  }
  protected hasLeftChild(index: number) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }
  protected hasRightChild(index: number) {
    return this.getRightChildIndex(index) < this.heap.length;
  }
  protected hasParent(index: number) {
    return this.getParentIndex(index) >= 0;
  }
  protected leftChildPriority(index: number) {
    return this.heap[this.getLeftChildIndex(index)].priority;
  }
  protected rightChildPriority(index: number) {
    return this.heap[this.getRightChildIndex(index)].priority;
  }
  protected parentPriority(index: number) {
    return this.heap[this.getParentIndex(index)].priority;
  }
  protected swap(indexOne: number, indexTwo: number) {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;
  }
  protected abstract heapifyUp(): void;
  protected abstract heapifyDown(): void;
}
