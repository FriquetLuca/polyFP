export class TreeNode<T> {
  public value: T;
  children: TreeNode<T>[] = [];
  parent: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }

  addChild(value: T): TreeNode<T> {
    const child = new TreeNode(value);
    child.parent = this;
    this.children.push(child);
    return child;
  }

  removeChild(child: TreeNode<T>): boolean {
    const idx = this.children.indexOf(child);
    if (idx === -1) return false;
    this.children.splice(idx, 1);
    child.parent = null;
    return true;
  }

  isLeaf(): boolean {
    return this.children.length === 0;
  }

  isRoot(): boolean {
    return this.parent === null;
  }

  depth(): number {
    let d = 0;
    let node: TreeNode<T> | null = this.parent;
    while (node) {
      d++;
      node = node.parent;
    }
    return d;
  }

  *preOrder(): Generator<TreeNode<T>> {
    yield this;
    for (const child of this.children) yield* child.preOrder();
  }

  *postOrder(): Generator<TreeNode<T>> {
    for (const child of this.children) yield* child.postOrder();
    yield this;
  }

  *bfs(): Generator<TreeNode<T>> {
    const queue: TreeNode<T>[] = [this];
    let head = 0;
    while (head < queue.length) {
      const node = queue[head++];
      yield node;
      queue.push(...node.children);
    }
  }

  find(predicate: (value: T) => boolean): TreeNode<T> | undefined {
    for (const node of this.bfs()) {
      if (predicate(node.value)) return node;
    }
    return undefined;
  }

  toArray(): T[] {
    return [...this.preOrder()].map((n) => n.value);
  }
}

export class Tree<T> {
  readonly root: TreeNode<T>;

  constructor(rootValue: T) {
    this.root = new TreeNode(rootValue);
  }

  get size(): number {
    return [...this.root.preOrder()].length;
  }
}
