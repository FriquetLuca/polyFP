/**
 * A doubly linked list node that holds a value and references to both previous and next nodes.
 *
 * @template T The type of value stored in the node.
 */
export class DoublyLinkedList<T> {
  private value: T;
  private prev: DoublyLinkedList<T> | null;
  private next: DoublyLinkedList<T> | null;
  /**
   * Creates a new node with the given value.
   * @param value The value to store in the node.
   */
  constructor(value: T) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
  /** @returns The value stored in this node. */
  getValue() {
    return this.value;
  }
  /** @returns The previous node, or `null` if there is none. */
  getPrevious() {
    return this.prev;
  }
  /** @returns The next node, or `null` if there is none. */
  getNext() {
    return this.next;
  }
  /**
   * Updates the value stored in this node.
   * @param item The new value.
   */
  setValue(item: T) {
    this.value = item;
  }
  /**
   * Sets the previous node by creating a new `DoublyLinkedList` node.
   * @param item The value for the new previous node.
   * @returns The new previous node.
   */
  setPrevious(item: T) {
    this.prev = new DoublyLinkedList(item);
    return this.prev;
  }
  /**
   * Sets the next node by creating a new `DoublyLinkedList` node.
   * @param item The value for the new next node.
   * @returns The new next node.
   */
  setNext(item: T) {
    this.next = new DoublyLinkedList(item);
    return this.next;
  }
  /** Removes the reference to the previous node. */
  removePrevious() {
    this.prev = null;
  }
  /** Removes the reference to the next node. */
  removeNext() {
    this.next = null;
  }
  /**
   * Gets the value of the previous node, or `null` if it doesn't exist.
   */
  previousValue() {
    if (this.prev === null) return null;
    return this.prev.getValue();
  }
  /**
   * Gets the value of the next node, or `null` if it doesn't exist.
   */
  nextValue() {
    if (this.next === null) return null;
    return this.next.getValue();
  }
}
