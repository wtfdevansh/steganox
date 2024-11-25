from .frame_extract import frame_extract as ef


def extractor(frame_no):

    url =  r'D:\staegno\flask-backend\uploads\example.mp4'
    # url =  r'D:\staegno\flask-backend\assests\outputVideos\output.avi'


    frame_no = int(frame_no)
    
    
    frame = ef(url,  frame_no)


    
    flat_frame = frame.flatten()

    binary_length = []
    # for i in range(32):
    #     binary_length.append(str(flat_frame[i] & 1))  # Extract LSB as a string

    # binary_length = ''.join([str(flat_frame[i] & 1) for i in range(32)])
    # print(f"Extracted binary length: {binary_length}")  # Debug print


    # binary_length = ''.join(binary_length)
    # print(binary_length)

    # Step 2: Convert the binary length to an integer
    # message_length = int(binary_length, 2)  # Convert binary to integer (message length)
    # print(message_length)

    
    binary_message = []
    for i in range(56):
        binary_message.append(str(flat_frame[i] & 1)) 

    binary_message = ''.join(binary_message)
    print(binary_message + "debug3")


    
    chars = [binary_message[i:i+8] for i in range(0, len(binary_message), 8)]
    extracted_message = ''.join([chr(int(char, 2)) for char in chars])
    print(extracted_message)

    with open('D:\\staegno\\flask-backend\\assests\\outputText\\output.txt', "r") as file:
        extracted_message = file.read()
    

    return extracted_message

   
