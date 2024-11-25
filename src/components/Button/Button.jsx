import './button.css'

const Button = ({name  , onClick})=>{
    return(
        <button className='button' onClick={onClick}>{name}</button>  
    )
}

export default Button;