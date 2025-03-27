export function dijkstra(
    graph: { [key: string]: { [key: string]: number } },
    start: string,
    end: string
  ): string[] {
    const distances: { [key: string]: number } = {};
    const prev: { [key: string]: string | null } = {};
    const visited = new Set<string>();
    const pq: [string, number][] = [];
  
    for (const node in graph) {
      distances[node] = Infinity;
      prev[node] = null;
    }
  
    distances[start] = 0;
    pq.push([start, 0]);
  
    while (pq.length > 0) {
      pq.sort((a, b) => a[1] - b[1]);
      const [current] = pq.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);
  
      for (const neighbor in graph[current]) {
        const alt = distances[current] + graph[current][neighbor];
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          prev[neighbor] = current;
          pq.push([neighbor, alt]);
        }
      }
    }
  
    const path: string[] = [];
    let current: string | null = end;
    while (current) {
      path.unshift(current);
      current = prev[current];
    }
  
    return path;
  }
  