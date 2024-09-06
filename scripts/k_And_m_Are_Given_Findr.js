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

function findMinimumR(m, k) {
    let r = 0;

    while (true) {
        let sum = 1; // start with the initial 1 in the formula

        for (let i = 0; i <= k; i++) {
            sum += binomialCoefficient(m + r, i);
        }

        if (sum <= Math.pow(2, r)) {
            return r;
        }

        r++;
    }
}

// Example usage:
let m = 7; // length of info word
let k = 3; // to fix k sibiot
let minimumR = findMinimumR(m, k);
console.log("Minimum r:", minimumR);
