import './videopg.css'
import Header from '../../components/Header/Header';
import Fetchembed from '../../components/fetchembed/Fetchembed';
import Buttontwo from '../../components/Buttontwo/Buttontwo';
import Imagetext from '../../components/Imagetext/Imagetext';

import { useNavigate } from 'react-router-dom';


const Videopg = () => {

    const navigate = useNavigate();

    const handleClick1 =() =>{
        
        navigate('./stillvideo')

    }

    const handleClick2 =() =>{
        navigate('./videod')
    }

    return(
        <div className='imagepg'>
            <Header />
            <Fetchembed />
            <div className='containeref'>
                <Buttontwo name = "embed message" onClick={handleClick1}/>
                <Buttontwo name = "fetch message" onClick={handleClick2}/>
            </div>
            <Imagetext name = "VIDEO" />
        </div>
    )
}

export default Videopg;