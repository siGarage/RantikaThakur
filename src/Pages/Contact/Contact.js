import './Contact.css';
import SideImage from '../../Images/SDP05271.png'
// import { toast } from 'react-toastify';
import { useState } from 'react';
function Contact() {
  const [contactdata,setContactData] = useState({name:"",email:"",phone:""}); 
 console.log(contactdata)
  // let validateForm=(data)=> {
  //   const {email,name,phone}=data;


  //   if(!name){
  //     toast.error('Please Enter Name');
  //     return;
  //   } 
  //   if(!email){
  //     toast.error('Please Enter Email');
  //     return;
  //   }

  //   if(!phone){
  //     toast.error('Please Enter Phone Number');
  //     return;
  //   }
    
  
   
  //   else{

  //       Auth.login({ data: data }).then((res) => {
  //         if (res.status === 200) 
  //     {
  //       toast.success('Your Message Is Sent SuccessFully! ')
  //     } 
  //         else {
  //           toast.error(res.data.error.message)
  //         }
  //       });
  //     };
  //   }

    const onChange=(e)=>{
      setContactData({...contactdata,[e.target.name]:e.target.value})
     }

  return (
    <section className='Contact'>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100%'}}>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',width:'80%',height:'60%'}}>
        <div style={{width:'40%',height:'100%'}}><img src={SideImage} alt='SideImage' style={{height:'100%'}}/></div>
        <div style={{width:'60%',display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'column',height:'100%'}}>
          <div style={{fontFamily:'Abhaya Libre',fontSize:'96px',color:'#757575'}}>Contact Us</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'column',height:'auto',width:'80%',margin:'10px 0px'}}>
            <div  className='Contact-Input-Box'><div className='Contact-Box-Label'>Full Name</div><input type='text' name='name' onChange={onChange} className='Contact-Input'/></div>
            <div  className='Contact-Input-Box'><div className='Contact-Box-Label'>Email Address</div><input type='email' name='email' onChange={onChange} className='Contact-Input'/></div>
            <div  className='Contact-Input-Box'><div className='Contact-Box-Label'>Phone No.</div><input type='number'name='phone'  onChange={onChange} className='Contact-Input'/></div> 
            <div  className='Contact-Submit'><button  className='Contact-Submit-Button'>Submit</button></div> 
          </div>
        </div>
    </div>
    <div style={{width:'80%',height:'40%',margin:'50px 0px',borderTop:'1px solid #868686'}}>
      <div className='Contact-Detail'>Our Mail</div>
      <div className='Contact-Detail'>Social Media</div>
    </div>
    </div>
    </section>
  );
}



export default Contact;
