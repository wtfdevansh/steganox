import './register.css';
import Button from "../../components/Button/Button"
import { replace, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { clear } from '@testing-library/user-event/dist/clear';
import { useState } from 'react';
import axios from 'axios';


const Register = () =>{


  const [fullname, setFullName]= useState('');
  const [email, setEmail] = useState('');
  const [dateofbirth, setDateOfBirth]= useState();
  const [gender, setGender]=useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();

  const handleLogin = async (e) =>{

    

     e.preventDefault();

     if(!fullname){
        alert("username is required");
        return;
     }

     if(!email){
      alert("email is required");
      return;
     }

     if(email.includes('@gmail.com') === false){
      alert("invalid email");
      return;
     }

     if(!password){
      alert("password is required");
      return;
     }

     if(password.length < 8){
      alert("password must be atleast 8 characters long");
      return;
     }

    
    
      // Handle form submission logic here
      try {
        const response = await axios.post('http://localhost:5000/register', {
          Fullname: fullname,
          Email: email,
          DOB: dateofbirth,
          Gen: gender,
          un: username,
          ps: password
        });
        console.log(response.data); // Log the response data

        if(response.status === 201){
          alert("Registered Successfully");
          navigate('/homepage' , {replace:true});
          navigate(0);
        }
     
      } catch (error) {
        console.error(error); // Log any errors
      }
      console.log('Full Name: ',fullname);
      console.log('Email: ', email);
      console.log('Date of Birth: ',dateofbirth);
      console.log('Gender: ', gender);
      console.log('Username: ', username);
      console.log('Password: ', password);


    };

    function randomText(){
  
        const text = "अआइईउऊएऐओऔअंअःऋॠकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहक्षत्रज्ञ";
        
        const letter = text[Math.floor(Math.random() * text.length)];
        
        return letter;
      }
      
      
      //hacking animation
      function rain(){
        
        
        let e = document.createElement('div');
        
        let left = Math.floor(Math.random() * 100);
        let size = Math.random() * 1.8;
        let duration = Math.random() * 1;
        
          e.classList.add('taxi');
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
      
      
      
     
        setInterval(function(){
        rain()
      },600);

    

   
      
      
      
    return(
        <div>
            <div className="container">

                <form className='form-container'>
                    <div>
                    <label for = "username">Username: </label>
                    <input type="text" id="username" name="username" value={fullname} onChange={(e) => setFullName(e.target.value)} ></input>
                    </div>

                    <div>
                    <label for = "email">Email: </label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  required></input>
                    </div>

                    <div>
                    <label for = "password">Password: </label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>

                    <div>
                    <label for = "age" className='specialLabel'>Age: </label>
                    <input type="number" id="age" name="age" className='specialInput' value={dateofbirth} onChange={(e) => setDateOfBirth(e.target.value)} required ></input>
                    </div>

                    <div>
                    <label for = "gender">Gender: </label>

                    <div className='gender'>
                    <input type="radio" id="gender" name="gender" ></input>
                    <span className='male'>Male</span>
                    <input type="radio" id="gender" name="gender" ></input>  
                    <span>Female</span>
                    </div>
                    </div>
                    <span>already have an account <a href="/login">Login here </a></span>

                    <Button name="submit" onClick={handleLogin}/>  
                </form>
            </div>

            <div className='secret'>
                <input type='text' className='secretInput'></input>
            </div>
        </div>
    )
}


export default Register;