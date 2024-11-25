

def extractortwo(frame):

    flat_frame = frame.flatten()

    binary_message = []

    for i in range(56):
        binary_message.append(str(flat_frame[i] & 1)) 

    binary_message = ''.join(binary_message)
    print(binary_message  + "debug2")

    return extractortwo
