import './SignUp.css';
import SideImage from '../../Images/SDP05271.png'
function SignUp() {
    function myFunction() {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
  return (
    <section className='SignUp' style={{width:'100%',height:'800px',margin:'50px 0px'}}>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100%'}}>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',width:'100%',height:'100%'}}>
        <div style={{width:'50%',height:'100%'}}><img src={SideImage} alt='SideImage' style={{height:'100%',width:'100%'}}/></div>
        <div style={{width:'50%',display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'column',height:'100%'}}>
          <div style={{fontFamily:'Abhaya Libre',fontSize:'40px',color:'#bd9334'}}>Sign Up</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'column',width:'70%',margin:'50px 0px'}}>
            <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'space-between',width:'100%',margin:'15px 0px'}}><div style={{width:'100%',fontFamily:'Abhaya Libre',fontWeight:'500',fontSize:'20px',color:'#757575'}}>Full Name</div><input type='text' style={{height:'40px',width:'100%'}}/></div>
            <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'space-between',width:'100%',margin:'15px 0px'}}><div style={{width:'100%',fontFamily:'Abhaya Libre',fontWeight:'500',fontSize:'20px',color:'#757575'}}>Email Address</div><input type='text' style={{height:'40px',width:'100%'}}/></div>
            <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'space-between',width:'100%',margin:'15px 0px'}}><div style={{width:'100%',fontFamily:'Abhaya Libre',fontWeight:'500',fontSize:'20px',color:'#757575'}}>Set Password</div><input type='password' id="myInput" style={{height:'40px',width:'100%'}}/></div>
            <div style={{display:"flex",flexDirection:'row',width:'100%',fontFamily:'Poppins',fontWeight:'500',fontSize:'20px'}}><input type="checkbox" style={{margin:'10px 10px'}} onClick={()=>{myFunction()}}/>Show Password</div>
            <button className='SignUp-Button'>Sign Up</button>
          </div>
        </div>
    </div>
    </div>
    </section>
  );
}

export default SignUp;
