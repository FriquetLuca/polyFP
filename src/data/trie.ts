class TrieNode<V> {
  children = new Map<string, TrieNode<V>>();
  isEnd = false;
  value?: V;
}

export class Trie<V = true> {
  private root = new TrieNode<V>();
  private count = 0;

  insert(key: string, value: V = true as V): void {
    let node = this.root;
    for (const ch of key) {
      let next = node.children.get(ch);
      if (!next) {
        next = new TrieNode<V>();
        node.children.set(ch, next);
      }
      node = next;
    }
    if (!node.isEnd) this.count++;
    node.isEnd = true;
    node.value = value;
  }

  has(key: string): boolean {
    const node = this.findNode(key);
    return node !== undefined && node.isEnd;
  }

  get(key: string): V | undefined {
    const node = this.findNode(key);
    return node?.isEnd ? node.value : undefined;
  }

  startsWith(prefix: string): boolean {
    return this.findNode(prefix) !== undefined;
  }

  delete(key: string): boolean {
    const before = this.count;

    const deleteHelper = (node: TrieNode<V>, depth: number): boolean => {
      if (depth === key.length) {
        if (!node.isEnd) return false;
        node.isEnd = false;
        node.value = undefined;
        this.count--;
        return node.children.size === 0;
      }
      const ch = key[depth];
      const child = node.children.get(ch);
      if (!child) return false;
      if (deleteHelper(child, depth + 1)) node.children.delete(ch);
      return node.children.size === 0 && !node.isEnd;
    };

    deleteHelper(this.root, 0);
    return this.count !== before;
  }

  keysWithPrefix(prefix: string): string[] {
    const start = this.findNode(prefix);
    if (!start) return [];

    const results: string[] = [];
    const dfs = (node: TrieNode<V>, path: string) => {
      if (node.isEnd) results.push(path);
      for (const [ch, child] of node.children) dfs(child, path + ch);
    };
    dfs(start, prefix);
    return results;
  }

  get size(): number {
    return this.count;
  }

  private findNode(key: string): TrieNode<V> | undefined {
    let node = this.root;
    for (const ch of key) {
      const next = node.children.get(ch);
      if (!next) return undefined;
      node = next;
    }
    return node;
  }
}
