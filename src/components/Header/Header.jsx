import './header.css'
import Heart from'../Heart/Heart.jsx'


const Header = () =>{
    return(
            <div className='heading'>
                <h1 className='name'>Steganography tool</h1>
                <Heart />
            </div>
    )
}

export default Header