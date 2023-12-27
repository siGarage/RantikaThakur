import './SignUp.css';
import SideImage from '../../Images/SDP05271.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Auth from '../../API/Auth';

import { useState } from 'react';
function SignUp() {
  let navigate=useNavigate()
  const [credentials,setCredentials] = useState({username:"",email:"",password:""});
    let myFunction=()=> {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }



      
      let validateForm=(credentials)=> {
        const {username,email,password}=credentials;
        if(!username){
          toast.error('Please Enter UserName');
          return;
        }
        if(!email){
          toast.error('Please Enter Email;');
          return;
        }
        if(!password){
          toast.error('Please Enter Password');
          return;
        }
    
        if (!email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")){
          toast.error('Enter Valid Email')
          return ;
        }
       
        else{
            const data = {
              username,
              email,
              password,
            };

            Auth.signup({ data: data }).then((res) => {
              if (res.status=== 200) 
              {
                toast.success('Account Created Successfully!');
                navigate('/login')
              } 
              else {
                toast.error(res.data.error.message)
              }
            });
          };
        }
    
      const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
       }

       
  return (
    <section className='SignUp'>
      <div className='SignUp-Box1'>
    <div className='SignUp-Box1-innerBox'>
        <div className='SignUp-Box1-innerBox-Box1'><img src={SideImage} alt='SideImage' /></div>
        <div className='SignUp-Box1-innerBox-Box2'>
          <div className='SignUp-Box1-innerBox-Box2-innerBox1'>Sign Up</div>
          <div className='SignUp-Box1-innerBox-Box2-innerBox2'>
            <div className='SignUp-Box1-innerBox-Box2-innerBox2-innerBox'><div className='SignUp-Box1-innerBox-Box2-innerBox2-innerBox-box'>UserName</div><input  className='signup-input'  name='username' type='text'  onChange={onChange}/></div>
            <div className='SignUp-Box1-innerBox-Box2-innerBox2-innerBox'><div className='SignUp-Box1-innerBox-Box2-innerBox2-innerBox-box'>Email Address</div><input  className='signup-input' name='email' type='email'   onChange={onChange}/></div>
            <div className='SignUp-Box1-innerBox-Box2-innerBox2-innerBox'><div className='SignUp-Box1-innerBox-Box2-innerBox2-innerBox-box'>Set Password</div><input className='signup-input'  name='password' type='password' id="myInput"  onChange={onChange}/></div>
            <div style={{display:"flex",flexDirection:'row',width:'100%',fontFamily:'Poppins',fontWeight:'500',fontSize:'20px'}}><input type="checkbox" style={{margin:'10px 10px'}} onClick={()=>{myFunction()}}/>Show Password</div>
            <button className='SignUp-Button' onClick={()=>{validateForm(credentials)}}>Sign Up</button>
          </div>
        </div>
    </div>
    </div>
    </section>
  );
}

export default SignUp;
