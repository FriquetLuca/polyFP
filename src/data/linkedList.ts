/**
 * A singly linked list node that holds a value and a reference to the next node.
 *
 * @template T The type of value stored in the node.
 */
export class LinkedList<T> {
  private value: T;
  private next: LinkedList<T> | null;
  /**
   * Creates a new node with the given value.
   * @param value The value to store in the node.
   */
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
  /** @returns The value stored in this node. */
  getValue() {
    return this.value;
  }
  /** @returns The next node in the list, or `null` if there is none. */
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
   * Sets the next node by creating a new `LinkedList` node.
   * @param item The value for the new node.
   * @returns The new next node.
   */
  setNext(item: T) {
    this.next = new LinkedList(item);
    return this.next;
  }
  /** Removes the next node reference. */
  removeNext() {
    this.next = null;
  }
}
