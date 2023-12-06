import './Contact.css';
import SideImage from '../../Images/SDP05271.png'
function Contact() {
  return (
    <section className='Contact' style={{width:'100%',height:'800px',margin:'100px 0px'}}>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100%'}}>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',width:'80%',height:'60%'}}>
        <div style={{width:'40%',height:'100%'}}><img src={SideImage} alt='SideImage' style={{height:'100%'}}/></div>
        <div style={{width:'60%',display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'column',height:'100%'}}>
          <div style={{fontFamily:'Abhaya Libre',fontSize:'96px',color:'#757575'}}>Contact Us</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'column',height:'100px',width:'80%',margin:'40px 0px'}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'space-between',width:'100%',margin:'15px 0px'}}><div style={{width:'50%',fontFamily:'Abhaya Libre',fontSize:'32px',color:'#757575'}}>Email Address</div><input type='text' style={{width:'50%'}}/></div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'space-between',width:'100%',margin:'15px 0px'}}><div style={{width:'50%',fontFamily:'Abhaya Libre',fontSize:'32px',color:'#757575'}}>First Name</div><input type='text' style={{width:'50%'}}/></div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'space-between',width:'100%',margin:'15px 0px'}}><div style={{width:'50%',fontFamily:'Abhaya Libre',fontSize:'32px',color:'#757575'}}>Phone No.</div><input type='text' style={{width:'50%'}}/></div>
            
          </div>
        </div>
    </div>
    <div style={{width:'80%',height:'40%',margin:'100px 0px',borderTop:'1px solid #868686'}}>
      <div style={{margin:'40px 20px',fontFamily:'Abhaya Libre',fontSize:'32px',color:'#757575'}}>Our Mail</div>
      <div style={{margin:'40px 20px',fontFamily:'Abhaya Libre',fontSize:'32px',color:'#757575'}}>Social Media</div>
    </div>
    </div>
    </section>
  );
}

export default Contact;
