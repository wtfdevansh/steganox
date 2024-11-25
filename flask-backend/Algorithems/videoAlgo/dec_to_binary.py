def dec_to_binary(message):
    binary_message = ''.join(format(ord(char), '08b') for char in message)
    return binary_message