export interface GraphEdge<T, E> {
  to: T;
  weight: E;
}

export class Graph<T, E = number> {
  private adj = new Map<T, GraphEdge<T, E>[]>();

  addNode(node: T): void {
    if (!this.adj.has(node)) this.adj.set(node, []);
  }

  addEdge(
    from: T,
    to: T,
    weight: E = 1 as unknown as E,
    directed = false
  ): void {
    this.addNode(from);
    this.addNode(to);
    this.adj.get(from)!.push({ to, weight });
    if (!directed) this.adj.get(to)!.push({ to: from, weight });
  }

  hasNode(node: T): boolean {
    return this.adj.has(node);
  }

  removeNode(node: T): void {
    this.adj.delete(node);
    for (const [key, edges] of this.adj) {
      this.adj.set(
        key,
        edges.filter((e) => e.to !== node)
      );
    }
  }

  removeEdge(from: T, to: T, directed = false): void {
    const edges = this.adj.get(from);
    if (edges)
      this.adj.set(
        from,
        edges.filter((e) => e.to !== to)
      );
    if (!directed) {
      const reverse = this.adj.get(to);
      if (reverse)
        this.adj.set(
          to,
          reverse.filter((e) => e.to !== from)
        );
    }
  }

  neighbors(node: T): GraphEdge<T, E>[] {
    return this.adj.get(node) ?? [];
  }

  nodes(): T[] {
    return [...this.adj.keys()];
  }

  get size(): number {
    return this.adj.size;
  }
}
