
import './buttontwo.css'

const Buttontwo = ({name , onClick}) =>{
    return(
        <button className='buttontwo' onClick={onClick}>
            <span>{name}</span>
        </button>
    )
}

export default Buttontwo;