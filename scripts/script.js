// RPF Algorithm
function computeRPFPackets(graph, source) {
    const visited = new Set();
    let packetCount = 0;
    function rpf(node, parent) {
        visited.add(node);
        for (let neighbor of graph[node]) {
            if (neighbor !== parent) {
                packetCount++;
                if (!visited.has(neighbor)) {
                    rpf(neighbor, node);
                }
            }
        }
    }
    rpf(source, null);
    return packetCount;
}

const smallGraph = {
    1: [5, 6], 2: [12, 3], 3: [2, 4], 4: [3, 6, 7], 5: [1, 8],
    6: [1, 4, 9], 7: [4, 10], 8: [5, 9, 11], 9: [8, 6, 14, 10],
    10: [7, 9, 15], 11: [12, 8, 13], 12: [2, 11], 13: [11, 14],
    14: [13, 15, 9], 15: [10, 14]
};

const n = 108;
const fullGraph = {};
for (let i = 1; i <= n; i++) {
    fullGraph[i] = [];
    for (let j = 1; j <= n; j++) {
        if (i !== j) {
            fullGraph[i].push(j);
        }
    }
}

function runRPF(graphType) {
    console.log("Running RPF for " + graphType + " graph");
    let graph, source;
    if (graphType === 'small') {
        graph = smallGraph;
        source = 1;
    } else {
        graph = fullGraph;
        source = 1;
    }
    const totalPackets = computeRPFPackets(graph, source);
    return `Total packets sent in the ${graphType} graph: ${totalPackets}`;
}

// Pyodide setup
let pyodideReadyPromise = null;

async function setupPyodide() {
    if (!pyodideReadyPromise) {
        pyodideReadyPromise = loadPyodide().then(async (pyodide) => {
            await pyodide.loadPackage("numpy");
            return pyodide;
        });
    }
    return pyodideReadyPromise;
}

// Main script runner
async function runScript() {
    const scriptName = document.getElementById('script-dropdown').value;
    const input = document.getElementById('input-area').value;
    const outputArea = document.getElementById('output-area');

    if (!scriptName) {
        outputArea.textContent = "Please select a script to run.";
        return;
    }

    outputArea.textContent = "Running script...";

    try {
        let result;
        if (scriptName === 'srtt-rttvar') {
            const pyodide = await setupPyodide();
            result = await runSRTTRTTVAR(pyodide, input);
        } else if (scriptName === 'rpf-small') {
            result = runRPF('small');
        } else if (scriptName === 'rpf-full') {
            result = runRPF('full');
        }
        outputArea.textContent = result;
    } catch (error) {
        outputArea.textContent = `Error: ${error.message}`;
        console.error(error);
    }
}

async function runSRTTRTTVAR(pyodide, input) {
    pyodide.globals.set("input_data", input);
    const script = `
def calculate_srtt_and_rttvar(times, a, b):
    SRTT = times[0]
    RTTVAR = 0
    RTO = 0
    output = f"Initial SRTT: {SRTT} ms\\n"
    for i in range(1, len(times)):
        R = times[i]
        prev_SRTT = SRTT
        SRTT = a * prev_SRTT + (1 - a) * R
        if i > 1:
            RTTVAR = b * RTTVAR + (1 - b) * abs(SRTT - R)
        else:
            RTTVAR = abs(SRTT - R)
        RTO = SRTT + 4 * RTTVAR
        output += f"Iteration {i}:\\n"
        output += f"Measured R: {R} ms\\n"
        output += f"New SRTT: {SRTT:.2f} ms\\n"
        output += f"New RTTVAR: {RTTVAR:.2f} ms\\n"
        output += f"New RTO: {RTO:.2f} ms\\n\\n"
    output += f"Final SRTT: {SRTT:.2f} ms\\n"
    output += f"Final RTTVAR: {RTTVAR:.2f} ms\\n"
    output += f"Final RTO: {RTO:.2f} ms"
    return output

input_lines = input_data.strip().split('\\n')
times = [float(x) for x in input_lines[0].split(',')]
a = float(input_lines[1])
b = float(input_lines[2])
result = calculate_srtt_and_rttvar(times, a, b)
print(result)
`;
    return await pyodide.runPythonAsync(script);
}

// Set up event listener and initialize Pyodide
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('run-button').addEventListener('click', runScript);
    setupPyodide();
});