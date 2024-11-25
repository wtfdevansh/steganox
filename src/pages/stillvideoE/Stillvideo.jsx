import './stillvideo.css';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';



const Stillvideo = () =>{

    const[message,setMessage] = useState("");
    const[frame,setFrame] = useState("");
    const[file,setFile] = useState(null);
    const[url , setUrl] = useState(null);
    const[loading , setLoading] = useState(false);


    const handlemessage = (e) =>{
        setMessage(e.target.value);
        console.log(message);
    }

    const handleframe = (e) =>{
        setFrame(e.target.value);
        console.log(frame);
    }

    const handlefile = (e) =>{
        setFile(e.target.files[0]);
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
        <div className='parentstill'>
            <Header />
            <div className='upload-container' >
                <div className='uploadtxt'>upload video</div>
                <div>
                    <input type='file' onChange={handlefile}></input>
                </div>
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

export default Stillvideo;