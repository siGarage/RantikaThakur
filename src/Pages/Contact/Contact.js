import './Contact.css';
import SideImage from '../../Images/SDP05271.png'
// import { toast } from 'react-toastify';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CONTACT from '../../API/Contact'
import image3 from '../../Images/image3.svg'
import image4 from '../../Images/image4.svg'

function Contact() {
  const [contactdata,setContactData] = useState({name:"",email:"",phone:"",message:''}); 
  let validateForm=(data)=> {
    const {email,name,phone}=data;


    if(!name){
      toast.error('Please Enter Name');
      return;
    } 
    if(!email){
      toast.error('Please Enter Email');
      return;
    }

    if(!phone){
      toast.error('Please Enter Phone Number');
      return;
    }
    
  
   
    else{

        CONTACT.message({ data: data }).then((res) => {
          if (res.status === 200) 
      {
        toast.success('Your Message Is Sent SuccessFully ! ')
      } 
          else {
            toast.error(res.data.error.message)
          }
        });
      };
    }

    const onChange=(e)=>{
      setContactData({...contactdata,[e.target.name]:e.target.value})
     }

  return (
    <section className='Contact'>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100%'}}>
    <div className='Contact-Box'>
        <div  className='Contact-Box-Box1'><img src={SideImage} alt='SideImage' style={{height:'100%'}}/></div>
        <div className='Contact-Box-Box2'>
          <div className='Contact-Heading'>Contact Us</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'column',height:'auto',width:'80%',margin:'10px 0px'}}>
            <div  className='Contact-Input-Box'><div className='Contact-Box-Label'>Full Name</div><input type='text' name='name' onChange={onChange} className='Contact-Input'/></div>
            <div  className='Contact-Input-Box'><div className='Contact-Box-Label'>Email Address</div><input type='email' name='email' onChange={onChange} className='Contact-Input'/></div>
            <div  className='Contact-Input-Box'><div className='Contact-Box-Label'>Phone No.</div><input type='number'name='phone'  onChange={onChange} className='Contact-Input'/></div> 
            <div  className='Contact-Input-Box'><div className='Contact-Box-Label'>Your Message</div><textarea type='text' style={{height:'80px'}} name='message'  onChange={onChange} className='Contact-Input'/></div> 
            <div  className='Contact-Submit'><button  className='Contact-Submit-Button' onClick={()=>{validateForm(contactdata)}}>Submit</button></div> 
          </div>
        </div>
    </div>
    <div style={{width:'80%',height:'40%',margin:'50px 0px',borderTop:'1px solid #000000; '}}>
      <div className='Contact-Detail'><a href='mailto:contactrantikathakurclothing@gmail.com' style={{textDecoration:'none',color:'#000000; '}}>Our Mail : <span style={{fontSize:'20px'}}>contactrantikathakurclothing@gmail.com</span></a></div>
      <div className='Contact-Detail'>Social Media</div>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                <a href='https://www.instagram.com/rantikathakur/' target='blank'><div style={{margin:'0px 18px'}}><img src={image4}  style={{height:'35px',width:'35px',color:'#2c2c2c'}} alt='Twitter'/></div></a>
                <a href='https://www.facebook.com/Rantikathakurclothing/' target='blank'><div style={{margin:'0px 10px'}}><img src={image3}  style={{height:'35px',width:'35px',color:'#2c2c2c'}} alt='Facebook'/></div></a>
      </div>
    </div>
    </div>
    </section>
  );
}



export default Contact;
