import './Login.css';
import SideImage from '../../Images/SDP05271.png'
import { Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Auth from '../../API/Auth';
import constants from '../../constants';
import { useState } from 'react';
function Login() 
{
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const [credentials,setCredentials] = useState({identifier:"",password:""}); 

    let myFunction=()=> {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }

      let validateForm=(credentials)=> {
        const {identifier,password}=credentials;

        if(!identifier)
        {
          toast.error('Please Enter Email');
          return;
        }
        if(!password)
        {
          toast.error('Please Enter Password');
          return;
        }
      
       
        else{
            const data = {
              identifier,
              password,
            };

            Auth.login({ data: data }).then((res) => {
              if (res.status === 200) 
          {
            dispatch({
              type: constants("auth").reducers.login.success,
              payload: { data: res.data },
            });
            toast.success('Login successful!')
            navigate('/shop?type=All')
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
    <section className='LoginUp' style={{width:'100%',height:'550px',margin:'50px 0px'}}>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100%'}}>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',width:'100%',height:'100%'}}>
        <div className='LoginImage'><img src={SideImage} alt='SideImage' style={{height:'100%',width:'100%'}}/></div>
        <div className='LoginDetails'>
          <div style={{fontFamily:'Abhaya Libre',fontSize:'40px',color:'#bd9334'}}>Login</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'column',width:'70%',margin:'50px 0px 10px 0px'}}>
            <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'space-between',width:'100%',margin:'15px 0px'}}><div style={{width:'100%',fontFamily:'Abhaya Libre',fontWeight:'500',fontSize:'20px',color:'#757575'}}>Email or UserName</div><input name='identifier'  type='email' style={{height:'40px',width:'100%'}} onChange={onChange}/></div>
            <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'space-between',width:'100%',margin:'15px 0px'}}><div style={{width:'100%',fontFamily:'Abhaya Libre',fontWeight:'500',fontSize:'20px',color:'#757575'}}>Password</div><input  name='password' type='password' id="myInput" style={{height:'40px',width:'100%'}} onChange={onChange}/></div>
            <div style={{display:"flex",flexDirection:'row',width:'100%',fontFamily:'Poppins',fontWeight:'500',fontSize:'20px'}}><input type="checkbox" style={{margin:'10px 10px'}} onClick={()=>{myFunction()}}/>Show Password</div>
            <button className='Login-Button' onClick={()=>{validateForm(credentials)}}>Login</button>
          </div>
          <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'row',width:'70%'}}>
           <div style={{fontFamily:'Poppins',fontWeight:'500',fontSize:'20px'}}>Does not have account?</div>
            <Link to='/signup'  style={{textDecoration:'none',margin:'0px 10px'}}>SignUp</Link>
          </div>
        </div>
        
    </div>
    </div>
    </section>
  );
}

export default Login;
