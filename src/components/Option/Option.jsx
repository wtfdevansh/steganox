import Buttontwo from '../Buttontwo/Buttontwo';
import './option.css'
import { useNavigate } from 'react-router-dom';

const Option = () => {

    const navigate = useNavigate();

    const handleClick1 = () =>{
        navigate('/homepage/imagepg')
    }

    const handleClick2 = () =>{
        navigate('/homepage/videopg')
    }

    const handleClick3 = () =>{
        navigate('/homepage/livevideopg')
    }

    return(
        <div className='option-container'>


            <Buttontwo name = "upload image" onClick={handleClick1}/>
            <Buttontwo name = "upload video" onClick={handleClick2}/>
            <Buttontwo name = "live video" onClick={handleClick3}/>


        </div>
    )
}

export default Option;