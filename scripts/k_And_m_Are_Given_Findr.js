function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function binomialCoefficient(n, k) {
    if (k > n) return 0;
    return factorial(n) / (factorial(k) * factorial(n - k));
}

function findMinimumRForCorrection(m, k) {
    let r = 0;

    while (true) {
        let sum = 1; // Start with the initial 1 in the formula

        for (let i = 0; i <= k; i++) {
            sum += binomialCoefficient(m + r, i);
        }

        if (sum <= Math.pow(2, r)) {
            return r;
        }

        r++;
    }
}

// Function to handle the button click for finding minimum r
function onFindRButtonClick() {
    const m = parseInt(document.getElementById('dataWord').value);
    const k = parseInt(document.getElementById('numErrors').value);
    
    // Validate inputs
    if (isNaN(m) || isNaN(k) || m < 0 || k < 0) {
        alert("Please enter valid non-negative numbers for m and k.");
        return;
    }

    const r = findMinimumRForCorrection(m, k);
    document.getElementById('r-output').innerText = `Minimum r: ${r}`;
}

// Add event listener for the button click
document.getElementById('find-r-run').addEventListener('click', onFindRButtonClick);
