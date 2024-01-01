import { toast } from 'react-toastify';
import './Custom.css';
import { useState } from 'react';
import CUSTOM from '../../API/Custom'
function Custom(props) {

    const [customdata,setCustomData] = useState({name:"",email:"",phone:"",upperbust:'',bust:'',highwaist:'',waist:'',hip:'',shoulder:'',armhole:'',sleevelength:'',bicep:'',fullLength:'',pantskirtLength:''}); 
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

        CUSTOM.message({ data: data }).then((res) => {
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
        setCustomData({...customdata,[e.target.name]:e.target.value})
     }

  return (
    <section className='Custom' >
        <div style={{margin:'10px 0px 10px 0px',fontSize:'36px',fontWeight:'600'}}>CUSTOM SIZE</div>
        <p className='Custom-Size-Text' style={{width:'80%',textAlign:'center',margin:'0px 0px 40px 0px'}}>If you're unable to find your size in our standard chart, fill in the measurements form below with all your details and your order shall be processed accordingly. </p>
        <div  className='Custom-Box-InnerBox'>
    <div className='Custom-Box1'>
        <div className='Custom-Box1-Box1'>
            <label  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Name
                <input name='name'  onChange={onChange} type='text' required/>
            </label>
        </div>
        <div className='Custom-Box1-Box2'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Contact No.
                <input name='phone' onChange={onChange} type='text' required/>
            </label>
        
        </div>
    </div>

    <div>
    <div className='Custom-Box2'>
            <label  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Email
                <input name='email' onChange={onChange} type='email' required/>
            </label>
        </div>
    </div>
    <div className='Custom-Box3'>
    <div className='Custom-Box3-Box'>
            <label  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Upper Bust
                <input name='upperbust' onChange={onChange} type='number'/>
            </label>
        </div>
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Bust
                <input name='bust' onChange={onChange} type='number'/>
            </label>
        </div> 
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                High Waist
                <input name='highwaist' onChange={onChange} type='number'/>
            </label>
        </div> 
    </div>
    <div className='Custom-Box3'>
    <div className='Custom-Box3-Box'>
            <label  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Waist
                <input name='waist' onChange={onChange} type='number'/>
            </label>
        </div>
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Hip
                <input name='hip' onChange={onChange} type='number'/>
            </label>
        </div> 
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Shoulder
                <input name='shoulder' onChange={onChange} type='number'/>
            </label>
        </div> 
    </div>
    <div className='Custom-Box3'>
    <div className='Custom-Box3-Box'>
            <label  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Armhole
                <input name='armhole' onChange={onChange} type='number'/>
            </label>
        </div>
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Sleeve Length
                <input name='sleevelength'  onChange={onChange} type='number'/>
            </label>
        </div> 
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Bicep
                <input name='bicep'  onChange={onChange} type='number'/>
            </label>
        </div> 
    </div>
    <div className='Custom-Box3'>
    <div className='Custom-Box3-Box'>
            <label  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Full Length
                <input name='fullLength' onChange={onChange}  type='number'/>
            </label>
        </div>
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Pant/Skirt Length
                <input name='pantskirtLength' onChange={onChange} type='number'/>
            </label>
        </div> 
       <div className='Custom-Box3-Box'>
      </div>
    </div>

    <div className='Custom-Box3'>
    <div className='Custom-Box4-Box'>
    <button className='Custom-Submit-Button' onClick={()=>validateForm(customdata)}>Submit</button>
    </div>
        
    </div>
    </div>
    </section>
  );
}

  export default Custom;



  