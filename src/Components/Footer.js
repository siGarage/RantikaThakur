import './Footer.css'
import TwitterImg from '../Images/Twitter.png'
import EnImage from '../Images/EN.png'
import AppStoreImage from '../Images/AppStore.png'
function Footer() {
  return (
    <>
   <section className='Footer'>
   <div style={{height:'80%',width:'80%',display:'flex',flexDirection:'column',alignItems:'center'}}>
    <div style={{width:'90%'}}>
    <div style={{margin:'15px 0px',fontFamily:'Roboto',color:'white',fontSize:'24px'}}>Company Name</div>
    <div style={{margin:'50px 0px 0px 0px',fontFamily:'Roboto',color:'white',fontSize:'14px'}}>Visit Help Center</div>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',color:'white',margin:'50px 0px'}}>
        <div style={{width:'23%',height:'80%'}}>
            <div style={{margin:'0px 0px 36px 0px',fontSize:'16px'}}>Company</div>
            <div style={{fontSize:'14px',margin:'16px 0px'}}>About Us</div>
            <div style={{fontSize:'14px',margin:'16px 0px'}}>Newsroom</div>
            <div style={{fontSize:'14px',margin:'16px 0px'}}>Investors</div>
            <div style={{fontSize:'14px',margin:'16px 0px'}}>Blog</div>
            <div style={{fontSize:'14px',margin:'16px 0px'}}>Careers</div>
        </div>


        <div style={{width:'23%'}}>
            <div style={{margin:'0px 0px 36px 0px',fontSize:'16px',fontWeight:'500'}}>Company</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>About Us</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>Newsroom</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>Investors</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>Blog</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>Careers</div>
        </div>
        <div style={{width:'23%'}}>
            <div style={{margin:'0px 0px 36px 0px',fontSize:'16px',fontWeight:'500'}}>Company</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>About Us</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>Newsroom</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>Investors</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>Blog</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>Careers</div>
        </div>
        <div style={{width:'23%'}}>
            <div style={{margin:'0px 0px 36px 0px',fontSize:'16px',fontWeight:'500'}}>Company</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>About Us</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>Newsroom</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>Investors</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>Blog</div>
            <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500'}}>Careers</div>
        </div>
    </div>
    </div>
    <div style={{width:'100%',height:'20%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div  style={{display:'flex',flexDirection:'row',alignItem:'center',justifyContent:'space-between',width:'50%'}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <div style={{margin:'0px 20px'}}><img src={TwitterImg}  alt='Twitter'/></div>
                <div style={{margin:'0px 20px'}}><img src={TwitterImg}  alt='Twitter'/></div>
                <div style={{margin:'0px 20px'}}><img src={TwitterImg}  alt='Twitter'/></div>
                <div style={{margin:'0px 20px'}}><img src={TwitterImg}  alt='Twitter'/></div>
                </div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <div style={{margin:'0px 20px'}}><img src={EnImage}  alt='Twitter'/></div>
                <div style={{margin:'0px 20px'}}><img src={EnImage}  alt='Twitter'/></div>

            </div>
        </div>
        
        <div>
        <div style={{margin:'0px 20px'}}><img src={AppStoreImage}  alt='Twitter'/></div>
        </div>
    </div>
    </div>
    <div style={{height:'20%',width:'95%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:'14px',fontWeight:'500',fontFamily:'Roboto',color:'white'}}>© 2022 Name Technologies Inc.</div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'20%'}}>
            <div style={{fontSize:'14px',fontWeight:'500',fontFamily:'Roboto',color:'white'}}>Privacy</div>
            <div style={{fontSize:'14px',fontWeight:'500',fontFamily:'Roboto',color:'white'}}>Accesebility</div>
            <div style={{fontSize:'14px',fontWeight:'500',fontFamily:'Roboto',color:'white'}}>Terms</div>
        </div>
    </div>
   </section>
    </>
  );
}

export default Footer;

