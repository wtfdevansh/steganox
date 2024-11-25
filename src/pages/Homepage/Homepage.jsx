import './homepage.css'
import Header from '../../components/Header/Header';
import About from '../../components/About/About';
import Discription from '../../components/Description/Discription';
import Option from '../../components/Option/Option';
import Warning from '../../components/Warning/Warning';


const Homepage = () => {
    return(
        <div>
            <Header />
            <About />
            <Discription />
            <Option />
            <Warning />
        </div>
    )
}

export default Homepage;