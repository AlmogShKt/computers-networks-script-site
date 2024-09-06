def xor(a, b):
    """Perform XOR operation on two binary strings of equal length."""
    # Adjust to perform XOR on the full length, including the first bit.
    result = [str(int(x) ^ int(y)) for x, y in zip(a, b)]
    return ''.join(result)

def crc(data_word, generator):
    """Calculate CRC codeword given data word and generator polynomial."""
    # Calculate the number of zeros to append based on the generator's length.
    n_zeros = len(generator) - 1
    appended_data = data_word + '0' * n_zeros
    temp = appended_data[:len(generator)]

    print("Division process:")
    for i in range(len(generator) - 1, len(appended_data)):
        if temp[0] == '1':
            # XOR operation with the generator polynomial.
            temp = xor(temp, generator) + (appended_data[i + 1] if i + 1 < len(appended_data) else '')
        else:
            # XOR operation with a string of zeros equal in length to the generator.
            temp = xor(temp, '0'*len(generator)) + (appended_data[i + 1] if i + 1 < len(appended_data) else '')
        # Ensure temp is always the same length as the generator for the next iteration.
        temp = temp[-len(generator):]
        print(temp)

    # The remainder is the final value of temp, minus the leading bit which is always '0' after the last operation.
    remainder = temp[1:]
    codeword = data_word + remainder
    print("\nRemainder:", remainder)
    print("Codeword:", codeword)
    return codeword


def check_codeword(codeword, generator):
    """Check if a given codeword is legal with respect to a generator polynomial."""
    # Initial portion of the codeword to use for division.
    temp = codeword[:len(generator)]

    for i in range(len(generator) - 1, len(codeword)):
        if temp[0] == '1':
            # XOR with the generator if the leading bit is 1.
            temp = xor(temp, generator) + (codeword[i + 1] if i + 1 < len(codeword) else '')
        else:
            # XOR with zeros if the leading bit is 0.
            temp = xor(temp, '0' * len(generator)) + (codeword[i + 1] if i + 1 < len(codeword) else '')
        # Keep temp the correct length for the next iteration.
        temp = temp[-len(generator):]
        print(temp)

    # The final temp value is the remainder of the division.
    # If the remainder (excluding the initial '0') is all zeros, the codeword is legal.
    remainder = temp[1:]
    print("remainder is " + remainder)
    if all(bit == '0' for bit in remainder):
        print("The codeword is legal.")
        return True
    else:
        print("The codeword is illegal.")
        return False

# Example usage
generator = "1011" # generator should not be noted!!
data_word = "100010101" # option 1 - for checking the codeword
crc(data_word, generator) # option 1 - for checking the codeword
# codeword = "100010101" # option 2 - for checking if the codeword is valid
# check_codeword(codeword, generator) # option 2 - for checking if the codeword is valid






