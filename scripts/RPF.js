function computeRPFPackets(graph, source) {
    const visited = new Set();
    let packetCount = 0;

    function rpf(node, parent) {
        // Mark the node as visited
        visited.add(node);

        // Increment packet count for each child node except the parent
        for (let neighbor of graph[node]) {
            if (neighbor !== parent) {
                packetCount++;
                if (!visited.has(neighbor)) {
                    rpf(neighbor, node);
                }
            }
        }
    }

    // Start the RPF from the source node
    rpf(source, null);
    
    return packetCount;
}

// Smaller graph representation based on the provided image
const smallGraph = {
    1: [5, 6],
    2: [12, 3],
    3: [2, 4],
    4: [3, 6, 7],
    5: [1, 8],
    6: [1, 4, 9],
    7: [4, 10],
    8: [5, 9, 11],
    9: [8, 6, 14, 10],
    10: [7, 9, 15],
    11: [12, 8, 13],
    12: [2, 11],
    13: [11, 14],
    14: [13, 15, 9],
    15: [10, 14]
};

// Generate a fully connected graph with 108 nodes
const n = 108;
const fullGraph = {};

// Initialize the graph with each node connected to every other node
for (let i = 1; i <= n; i++) {
    fullGraph[i] = [];
    for (let j = 1; j <= n; j++) {
        if (i !== j) {
            fullGraph[i].push(j);
        }
    }
}

// Test on the smaller graph
const smallSource = 1; // Source node for small graph
const smallTotalPackets = computeRPFPackets(smallGraph, smallSource);
console.log(`Total packets sent in the small graph: ${smallTotalPackets}`);

// Test on the fully connected graph
const fullSource = 1; // Source node for full graph
const fullTotalPackets = computeRPFPackets(fullGraph, fullSource);
console.log(`Total packets sent in the fully connected graph: ${fullTotalPackets}`);
