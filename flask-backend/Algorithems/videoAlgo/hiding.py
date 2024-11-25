import cv2

def hiding_data(binary_message , frame):


    frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

    message_length = len(binary_message)
    print(message_length)
    binary_length = format(message_length, '032b')
    print(binary_length)


    message_index = 0
    message_length = len(binary_message)

    
    flat_frame = frame.flatten()


    # length_index = 0
    # for i in range(32):
    #     flat_frame[i] = (flat_frame[i] & 254) | int(binary_length[length_index])
    #     print(f"Embedding bit {binary_length[i]} into pixel {i}: {flat_frame[i] & 1}")
    #     length_index += 1

    for i in range(0, len(flat_frame)):
        if message_index < message_length:
           
            flat_frame[i] = (flat_frame[i] & 254) | int(binary_message[message_index])
            
            message_index += 1
        else:
            break

    
    frame_with_message = flat_frame.reshape(frame.shape)

    return frame_with_message


