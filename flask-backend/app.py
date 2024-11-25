from flask import Flask, request, send_file , jsonify
from Algorithems.videoAlgo.main import main as proces
from Algorithems.videoAlgo.extractor import extractor
from Algorithems.videoAlgo.generate_random_text import generate_random_text
import os

app = Flask(__name__)

@app.route('/processvideo', methods=['POST'])
def process_video():


    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'})

    
    video = request.files['video']
    message = request.form.get('message')
    frame_no = request.form.get('frameNo')


    with open('D:\\staegno\\flask-backend\\assests\\outputText\\output.txt', "w") as file:
     file.write(frame_no + " " + message)



   
    video_path = os.path.join('uploads', video.filename)
    video.save(video_path)

 
    print(f'Processing video: {video_path}')
    print(f'Message: {message}, Frame No: {frame_no}')

    resp =  proces(message , frame_no )

    if(resp == "ok"):
        path = 'D:\staegno\\flask-backend\\assests\\outputVideos\\output.mp4'
        return send_file(path, as_attachment=True, mimetype='video/mkv')


@app.route('/decryptvideo', methods=['POST'])
def decrypt_video():

    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'})

    
    video = request.files['video']
    frame_no = request.form.get('frameNo')

   
    video_path = os.path.join('uploads', video.filename)
    video.save(video_path)

 
    print(f'Processing video: {video_path}')
    print(f'Frame No: {frame_no}')

    message = extractor(frame_no)

    words = message.split(" ");
    actual_fram_no = words[0]
    actualmessage = " ".join(words[1:])
    fakemessage = generate_random_text()


    if(actual_fram_no == frame_no):
        print(message)
        return jsonify({'message': actualmessage})
    else:
        return jsonify({'message': fakemessage})





if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True )
    app.run(port = 6000 , debug=True)