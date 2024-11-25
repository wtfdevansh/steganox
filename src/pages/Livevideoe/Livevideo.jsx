import './livevideo.css';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import Button from '../../components/Button/Button';
import { useState , useRef} from 'react';
import axios from 'axios';


const Livevideo = () =>{

    const[message,setMessage] = useState("");
    const[frame,setFrame] = useState("");
    const[file,setFile] = useState(null);
    const[url , setUrl] = useState(null);
    const[loading , setLoading] = useState(false);

    const [recording, setRecording] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const videoRef = useRef(null);
    const chunksRef = useRef([]);


    const startRecording = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

          videoRef.current.srcObject = stream;
          mediaRecorderRef.current = new MediaRecorder(stream);
          
          mediaRecorderRef.current.ondataavailable = (e) => {
            chunksRef.current.push(e.data);
          };
          
          mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            setFile(blob)
            setVideoUrl(url);
            chunksRef.current = []; 
          };
          
          mediaRecorderRef.current.start();
          setRecording(true);
        } catch (error) {
          console.error('Error accessing media devices.', error);
        }
      };
    
      const stopRecording = () => {
        mediaRecorderRef.current.stop();
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        setRecording(false);
      };


    const handlemessage = (e) =>{
        setMessage(e.target.value);
        console.log(message);
    }

    const handleframe = (e) =>{
        setFrame(e.target.value);
        console.log(frame);
    }


    const upload = async () =>{

        setLoading(true);



        const formData = new FormData();
        formData.append('video', file);
        formData.append('message', message);
        formData.append('frameNo', frame);

        

        try{
         const  response =  await axios.post('http://localhost:5000/stillvideoe' , formData , {responseType: 'blob'} ,{
            headers: {
                'Content-Type': 'multipart/form-data',
              }})

              const url = window.URL.createObjectURL(new Blob([response.data]));

              setUrl(url);

        } catch (err){
            console.log(err);

        }

        setLoading(false);

       

    }

    const download = () =>{
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'video.mp4'); 

       
        document.body.appendChild(link);

       
        link.click();

        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
  


    return(
        <div className='livevideo'>

            <Header />

            <div className='video-container'>

            <div>
            <h3>Live Video:</h3>
            <video ref={videoRef} autoPlay muted width="400" height="300" />
            </div>
       
         

            {videoUrl && (
             <div>
               <h3>Recorded Video:</h3>
               <video src={videoUrl} controls width="400" height="300" />
            </div>
            )}

           

            </div>

            {recording ? (
            <Button name="stop recording" onClick={stopRecording}></Button>
            ) : (
            <Button name="start recording" onClick={startRecording}></Button>
            )}

            <div className='other-container'>
                <div>
                    <input type='text' placeholder='enter message' onChange={handlemessage} value={message}></input>
                </div>
                <div>
                    <input type='number' placeholder='enter frame number' onChange={handleframe} value={frame}></input>
                </div>
                <div>
                    <Button name ="submit" onClick = {upload}></Button>
                </div>
            </div>

            {loading && (<Loading />)}

            {url && (<Button name="download" onClick={download} />)}



        </div>
    )
}

export default Livevideo;