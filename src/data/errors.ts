/**
 * Thrown when attempting to pop from an empty stack.
 */
export class StackUnderflowError extends Error {
  /**
   * Constructs a new StackUnderflowError.
   * @param message Optional custom error message.
   */
  constructor(message = 'Stack underflow: stack is empty') {
    super(message);
    this.name = 'StackUnderflowError';
  }
}
/**
 * Thrown when attempting to push to a stack that has reached its maximum capacity.
 */
export class StackOverflowError extends Error {
  /**
   * Constructs a new StackOverflowError.
   * @param message Optional custom error message.
   */
  constructor(message = 'Stack overflow: maximum capacity reached') {
    super(message);
    this.name = 'StackOverflowError';
  }
}
/**
 * Thrown when attempting to dequeue from an empty queue.
 */
export class QueueUnderflowError extends Error {
  /**
   * Constructs a new QueueUnderflowError.
   * @param message Optional custom error message.
   */
  constructor(message = 'Queue underflow: queue is empty') {
    super(message);
    this.name = 'QueueUnderflowError';
  }
}
/**
 * Thrown when attempting to enqueue into a queue that has reached its maximum capacity.
 */
export class QueueOverflowError extends Error {
  /**
   * Constructs a new QueueOverflowError.
   * @param message Optional custom error message.
   */
  constructor(message = 'Queue overflow: maximum capacity reached') {
    super(message);
    this.name = 'QueueOverflowError';
  }
}
