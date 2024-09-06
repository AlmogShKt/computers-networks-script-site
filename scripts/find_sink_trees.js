class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(v1, v2, weight) {
        this.adjacencyList[v1].push({ node: v2, weight: weight });
        this.adjacencyList[v2].push({ node: v1, weight: weight }); // Assuming it's an undirected graph
    }

    // Function to find the shortest paths using Dijkstra's algorithm
    dijkstra(start) {
        const distances = {};
        const previous = {};
        const pq = new PriorityQueue();
        const edgesInTree = new Set();

        // Initialize distances and previous
        for (let vertex in this.adjacencyList) {
            distances[vertex] = Infinity;
            pq.enqueue(vertex, Infinity);
            previous[vertex] = null;
        }
        distances[start] = 0;
        pq.enqueue(start, 0);

        while (!pq.isEmpty()) {
            const smallest = pq.dequeue().val;
            if (smallest === null || distances[smallest] === Infinity) break;

            for (let neighbor of this.adjacencyList[smallest]) {
                const candidate = distances[smallest] + neighbor.weight;
                if (candidate < distances[neighbor.node]) {
                    distances[neighbor.node] = candidate;
                    previous[neighbor.node] = smallest;
                    pq.enqueue(neighbor.node, candidate);
                    edgesInTree.add(this.edgeKey(smallest, neighbor.node));
                } else if (candidate === distances[neighbor.node] && previous[neighbor.node] !== smallest) {
                    previous[neighbor.node] = smallest;
                    edgesInTree.add(this.edgeKey(smallest, neighbor.node));
                }
            }
        }

        // Ensure only the actual shortest path edges are in the edgesInTree set
        const actualEdgesInTree = new Set();
        for (let vertex in previous) {
            if (previous[vertex] !== null) {
                actualEdgesInTree.add(this.edgeKey(previous[vertex], vertex));
            }
        }

        return { distances, previous, edgesInTree: actualEdgesInTree };
    }

    edgeKey(v1, v2) {
        return `${v1}-${v2}`;
    }

    // Function to perturb the weights of edges in the tree
    perturbWeights(edgesInTree) {
        const epsilon = 0.01;
        for (let edge of edgesInTree) {
            const [v1, v2] = edge.split('-');
            console.log(`Perturbing edge: ${v1} -> ${v2}`);
            if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
                this.adjacencyList[v1].forEach(neighbor => {
                    if (neighbor.node === v2) {
                        neighbor.weight += epsilon;
                        console.log(`Updated weight of edge ${v1} -> ${v2}: ${neighbor.weight}`);
                    }
                });
                this.adjacencyList[v2].forEach(neighbor => {
                    if (neighbor.node === v1) {
                        neighbor.weight += epsilon;
                    }
                });
            } else {
                console.log(`Edge ${v1} -> ${v2} is invalid.`);
            }
        }
    }

    // Function to find and print the Dijkstra path
    findAndPrintDijkstraPath(start) {
        const { previous, edgesInTree } = this.dijkstra(start);
        
        // Print the paths
        console.log("Dijkstra Paths:");
        for (let vertex in previous) {
            if (previous[vertex] !== null) {
                console.log(`${previous[vertex]} -> ${vertex}`);
            }
        }

        // Perturb the edge weights in the path
        this.perturbWeights(edgesInTree);
        
        // Print the edges in the tree and their new weights
        console.log("Perturbed edges with new weights:");
        for (let edge of edgesInTree) {
            const [v1, v2] = edge.split('-');
            this.adjacencyList[v1].forEach(neighbor => {
                if (neighbor.node === v2) {
                    console.log(`Edge ${v1} -> ${v2}: ${neighbor.weight}`);
                }
            });
        }
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

// Example usage:
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

graph.addEdge("A", "B", 1);
graph.addEdge("B", "C", 4);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "E", 2);
graph.addEdge("C", "D", 3);

const startVertex = "A";
graph.findAndPrintDijkstraPath(startVertex); // until two prints are the same
graph.findAndPrintDijkstraPath(startVertex);
graph.findAndPrintDijkstraPath(startVertex);
