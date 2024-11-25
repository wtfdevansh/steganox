import './stillvideod.css';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';




const Stillvideod = () =>{

   
    const[frame,setFrame] = useState("");
    const[file,setFile] = useState(null);
    const[output , setOutput] = useState(null);
    const[loading , setLoading] = useState(false);
   


   

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
        formData.append('frameNo', frame);

        

        try{
         const  response =  await axios.post('http://localhost:5000/stillvideod' , formData  ,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }})

            setOutput(response.data.message);
            console.log(output)

             

              

        } catch (err){
            console.log(err);
        }

        setLoading(false);

    
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
                    <input type='number' placeholder='enter frame number' onChange={handleframe} value={frame}></input>
                </div>
                <div>
                    <Button name ="submit" onClick = {upload}></Button>
                </div>
            </div>
            {loading && (<Loading />)}

            {output && (<div className='outputText'>{output}</div>)}

            

        </div>
    )
}

export default Stillvideod;