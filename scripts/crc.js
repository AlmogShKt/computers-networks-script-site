function xor(a, b) {
  // Perform XOR operation on two binary strings of equal length.
  let result = "";
  for (let i = 0; i < a.length; i++) {
    result += (parseInt(a[i]) ^ parseInt(b[i])).toString();
  }
  return result;
}

function crc(data_word, generator) {
  // Calculate CRC codeword given data word and generator polynomial.
  let n_zeros = generator.length - 1;
  let appended_data = data_word + "0".repeat(n_zeros);
  let temp = appended_data.substring(0, generator.length);

  console.log("Division process:");
  for (let i = generator.length - 1; i < appended_data.length; i++) {
    if (temp[0] === "1") {
      temp = xor(temp, generator) + (appended_data[i + 1] || "");
    } else {
      temp =
        xor(temp, "0".repeat(generator.length)) + (appended_data[i + 1] || "");
    }
    temp = temp.substring(temp.length - generator.length);
    console.log(temp);
  }

  let remainder = temp.substring(1);
  let codeword = data_word + remainder;
  console.log("\nRemainder:", remainder);
  console.log("Codeword:", codeword);

  // Calculate overhead
  let overhead = remainder.length / codeword.length;
  console.log("Overhead:", overhead);

  return { codeword, overhead };
}

function checkCodeword(codeword, generator) {
  // Check if a given codeword is legal with respect to a generator polynomial.
  let temp = codeword.substring(0, generator.length);

  for (let i = generator.length - 1; i < codeword.length; i++) {
    if (temp[0] === "1") {
      temp = xor(temp, generator) + (codeword[i + 1] || "");
    } else {
      temp = xor(temp, "0".repeat(generator.length)) + (codeword[i + 1] || "");
    }
    temp = temp.substring(temp.length - generator.length);
    console.log(temp);
  }

  let remainder = temp.substring(1);
  console.log("Remainder:", remainder);

  if (Array.from(remainder).every((bit) => bit === "0")) {
    console.log("The codeword is legal.");
    return true;
  } else {
    console.log("The codeword is illegal.");
    return false;
  }
}

// Example usage
let generator = "10011";
let data_word = "1101011111";
let { codeword, overhead } = crc(data_word, generator);
console.log("CRC Codeword:", codeword);
console.log("Overhead:", overhead);

// Option to check if a given codeword is valid
let is_valid = checkCodeword(codeword, generator);
console.log("Is the codeword valid?", is_valid);
