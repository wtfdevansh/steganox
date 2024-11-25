import cv2
import numpy as np


def frame_extract(videoPath, frameNumber):
    
    
    cap = cv2.VideoCapture(videoPath)

    if (cap.isOpened() == False):
        print("Error opening video stream or file")

    for i in range(1, frameNumber):
        ret, frame = cap.read()
        if ret == False:
            print("Error reading frame")
            break

    ret, frame = cap.read()

    print(ret)

    # cv2.imshow('Extracted Frame', frame)
    # cv2.waitKey(0)

    return frame







    





