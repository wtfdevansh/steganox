import './login.css'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () =>{

    const navigate = useNavigate();

    const [password, setpassword]= useState('');
    const [UserName, setUsername]= useState('');

    const handleLogin = async (e) =>{

    
        e.preventDefault();
        alert("hii " + UserName);

        let status = 0;
       
        try {
          const response = await axios.post('http://localhost:5000/login', {
            username: UserName,
            password: password,
          });
          console.log(response.data);
          status = response.status;
        } catch (error) {
          console.error(error); 
          alert(error);
        }
        console.log('username:', UserName);
        console.log('password:', password);

        if(status === 200){
          navigate('/homepage' , {replace:true})
          navigate(0);
        }else{
          alert("Invalid Username or Password")
        }
    }


    function randomText(){
  
        let text = "अआइईउऊएऐओऔअंअःऋॠकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहक्षत्रज्ञ";
        
        const letter = text[Math.floor(Math.random() * text.length)];
        
        return letter;
      }
      
      
      //hacking animation
      function rain(){
        
        
        let e = document.createElement('div');
        
        let left = Math.floor(Math.random() * 100);
        let size = Math.random() * 1.8;
        let duration = Math.random() * 2;
        
        e.classList.add('text');
        e.innerText = randomText();
        document.body.appendChild(e);
        
        e.style.left = left + '%';
        e.style.fontSize = 0.3 + size + 'em';
        e.style.animationDuration = 1 + duration  + 'px';
        
          //remove
        setTimeout(function(){
          document.body.removeChild(e)
        },4080)
        
      }
      
      
      
     
        let rainInterval = setInterval(function(){
        rain()
      },600);

    return(

        <div className='parent'>
        <div className='login-container'>

            <div className='username'>
             <label for = "username">Username: </label>
             <input type="text" id="username" name="username" value={UserName} onChange={(e) =>setUsername(e.target.value)} required></input>
            </div>


            <div className='password'>
             <label for = "password">Password: </label>
             <input type="password" id="password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} required></input>
            </div>
            <span>don't have an account <a href="/register">register here </a></span>
            <br />

            <Button name = "Login" onClick={handleLogin}/>

        </div>
        </div>
    )
}

export default Login