import './imagepg.css'
import Header from '../../components/Header/Header';
import Fetchembed from '../../components/fetchembed/Fetchembed';
import Buttontwo from '../../components/Buttontwo/Buttontwo';
import Imagetext from '../../components/Imagetext/Imagetext';
import { useNavigate } from 'react-router-dom';


const Imagepg = () => {

   

    const handleClick =() =>{
        window.location.href = "https://ranjan-rahu.github.io/Stegnography-Tool/";
    }
    
    return(
       
        <div className='imagepage'>
            <Header />
            <Fetchembed />
            <div className='containeref'>
                <Buttontwo name = "embed message" onClick={handleClick}/>
                <Buttontwo name = "fetch message" onClick={handleClick}/>
            </div>
            <Imagetext name = "IMAGE" />
        </div>
    )
}

export default Imagepg;