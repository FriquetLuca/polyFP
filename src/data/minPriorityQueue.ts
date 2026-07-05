import { PriorityQueue } from './utils';

/**
 * A minimum-priority queue where lower priority values are dequeued first.
 * Implements a binary min-heap.
 *
 * @template T The type of items stored in the queue.
 */
export class MinPriorityQueue<T> extends PriorityQueue<T> {
  /**
   * Creates a new MinPriorityQueue with an optional capacity limit.
   * @param capacity Maximum number of items allowed in the queue. If omitted, the queue is unbounded.
   */
  constructor(capacity?: number) {
    super(capacity);
  }
  protected heapifyUp() {
    let index = this.heap.length - 1;
    while (
      this.hasParent(index) &&
      this.parentPriority(index) > this.heap[index].priority
    ) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  protected heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.rightChildPriority(index) < this.leftChildPriority(index)
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.heap[index].priority < this.heap[smallerChildIndex].priority) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }
}
