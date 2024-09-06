function calculateHammingCode(data) {
  let m = data.length;
  let r = 0;

  // Find the number of parity bits needed
  while (Math.pow(2, r) < m + r + 1) {
    r++;
  }

  // Initialize the Hamming code array with 'undefined' to find the positions of parity bits
  let hammingCode = new Array(m + r);
  let j = 0,
    k = 0;

  // Place the data bits and leave space for parity bits
  for (let i = 1; i <= hammingCode.length; i++) {
    if (Math.pow(2, j) === i) {
      hammingCode[i - 1] = "P"; // Placeholder for parity bits
      j++;
    } else {
      hammingCode[i - 1] = data[k];
      k++;
    }
  }

  // Calculate parity bits
  for (let i = 0; i < r; i++) {
    let parityPos = Math.pow(2, i);
    let count = 0;
    for (let j = parityPos; j <= hammingCode.length; j += 2 * parityPos) {
      for (let k = 0; k < parityPos; k++) {
        if (j + k <= hammingCode.length) {
          if (
            hammingCode[j + k - 1] !== "P" &&
            hammingCode[j + k - 1] === "1"
          ) {
            count++;
          }
        }
      }
    }
    hammingCode[parityPos - 1] = (count % 2).toString();
  }

  // Replace placeholders with actual values
  return hammingCode.join("");
}

function checkHammingCode(codeword) {
  let n = codeword.length;
  let r = 0;

  // Find the number of parity bits
  while (Math.pow(2, r) < n) {
    r++;
  }

  let errorPosition = 0;

  // Check parity bits
  for (let i = 0; i < r; i++) {
    let parityPos = Math.pow(2, i);
    let count = 0;
    for (let j = parityPos; j <= n; j += 2 * parityPos) {
      for (let k = 0; k < parityPos; k++) {
        if (j + k <= n) {
          if (codeword[j + k - 1] === "1") {
            count++;
          }
        }
      }
    }
    if (count % 2 !== 0) {
      errorPosition += parityPos;
    }
  }

  return errorPosition === 0;
}

function calculateOverhead(hammingCode) {
  let n = hammingCode.length;
  let r = 0;

  // Find the number of parity bits
  while (Math.pow(2, r) < n) {
    r++;
  }

  let overhead = r / n;
  return overhead;
}

/*
// Example inputs
const hammingCode1 = calculateHammingCode("0001");
console.log(hammingCode1);
console.log(`Overhead: ${calculateOverhead(hammingCode1)}`);

const hammingCode2 = calculateHammingCode(
  "0001101000000000000000000000000000000000000000000000101"
); // Example, output will vary based on input
console.log(hammingCode2);
console.log(`Overhead: ${calculateOverhead(hammingCode2)}`);

const hammingCode3 = calculateHammingCode("1101"); // Example, output will vary based on input
console.log(hammingCode3);
console.log(`Overhead: ${calculateOverhead(hammingCode3)}`);

console.log(checkHammingCode("1010101")); // Should return true
console.log(checkHammingCode("1100111")); // Should return false (example with error)
console.log(checkHammingCode("01000011101001011")); // Example, output will vary based on input
*/
