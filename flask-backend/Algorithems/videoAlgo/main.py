from .frame_extract import frame_extract as ef
from .dec_to_binary import dec_to_binary as dtb
from .hiding import hiding_data
from .merge import merge
from .extractortwo import extractortwo
from .extractor import extractor



def main(message , frame_no ):
  
  url =  r'D:\staegno\flask-backend\uploads\example.mp4'


  binaryMessage = dtb(message)
  print(binaryMessage + "debug")

  frame_no = int(frame_no)
  frame = 0

 
  

  frame = ef(url,  frame_no)

  framewData = hiding_data(binaryMessage , frame)

  

  

  merge(frame_no,framewData,url)

  # extractor(10)



  return "ok"



