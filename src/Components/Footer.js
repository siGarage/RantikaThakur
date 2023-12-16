import './Footer.css'
import EnImage from '../Images/EN.png'
import AppStoreImage from '../Images/AppStore.png'
import InstagramLogo from '../Images/Instagram_logo.jpg'
import FacebookLogo from '../Images/Facebook_icon.jpg'
import YoutubeLogo from '../Images/Youtube_logo.jpg'
import LinkedinLogo from '../Images/LinkedIn.jpg'
import {Link, useNavigate} from 'react-router-dom';
function Footer() {
    const navigate=useNavigate()
  return (
    <>
   <section className='Footer'>
   <div style={{height:'80%',width:'80%',display:'flex',flexDirection:'column',alignItems:'center'}}>
    <div style={{width:'90%'}}>
    <div style={{margin:'15px 0px',fontFamily:'Roboto',color:'white',fontSize:'24px'}}>RANTIKA THAKUR</div>
    <div style={{margin:'50px 0px 0px 0px',fontFamily:'Roboto',color:'white',fontSize:'14px'}}>Visit Help Center</div>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',color:'white',margin:'50px 0px'}}>
        <div style={{width:'32%'}}>
            <div style={{margin:'0px 0px 36px 0px',fontSize:'16px'}}>QUICK LINKS</div>
            <Link to='/shop'   style={{textDecoration:'none'}}><div style={{fontSize:'14px',margin:'16px 0px',color:'white'}}>Shop</div></Link>
            <Link to='/about'   style={{textDecoration:'none'}}><div style={{fontSize:'14px',margin:'16px 0px',color:'white'}}>About</div></Link>
            <Link to='/contact'   style={{textDecoration:'none'}}><div style={{fontSize:'14px',margin:'16px 0px',color:'white'}}>Customize Size</div></Link>
            <Link to='/contact'   style={{textDecoration:'none'}}><div style={{fontSize:'14px',margin:'16px 0px',color:'white'}}>Contact Us</div></Link>
            
        </div>


        <div style={{width:'32%'}}>
            <div style={{margin:'0px 0px 36px 0px',fontSize:'16px',fontWeight:'500'}}>USEFUL LINKS</div>
            <Link to='/privacypolicy'   style={{textDecoration:'none'}}><div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500',color:'white'}}>Privacy Policy</div></Link>
            <Link to='/exchangepolicy'  style={{textDecoration:'none'}}> <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500',color:'white'}}>Exchange Policy</div></Link>
            <Link to='/termsandcondition' style={{textDecoration:'none'}}> <div style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500',color:'white'}}>Terms and Conditions</div></Link>  
        </div>


        <div style={{width:'32%'}}>
            <div style={{margin:'0px 0px 36px 0px',fontSize:'16px',fontWeight:'500'}}>SHOP</div>
            <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${'Shirts'}`
          });
          window.scrollTo(0, 0)
          }} style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500',cursor:'pointer'}}>Shirts</div>
            
            <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${'Skirts'}`
          });
          window.scrollTo(0, 0)
          }}  style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500',cursor:'pointer'}}>Skirts</div>
            <div 
            onClick={()=>{navigate({
                pathname:'/shop',
                search:`?type=${'Tops'}`
              });
              window.scrollTo(0, 0)}} 
              style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500',cursor:'pointer'}}>Tops</div>
            <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${'Dresses'}`
          });
          window.scrollTo(0, 0)
        }} 
          style={{fontSize:'14px',margin:'16px 0px',fontWeight:'500',cursor:'pointer'}}>Dresses</div>
        </div>
       
    </div>
    </div>
    <div style={{width:'100%',height:'20%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div  style={{display:'flex',flexDirection:'row',alignItem:'center',justifyContent:'space-between',width:'50%'}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <a href='https://www.instagram.com/rantikathakur/' target='blank'><div style={{margin:'0px 10px'}}><img src={InstagramLogo}  style={{height:'25px',width:'25px'}} alt='Twitter'/></div></a>
                <a href='https://www.instagram.com/rantikathakur/' target='blank'><div style={{margin:'0px 10px'}}><img src={FacebookLogo}  style={{height:'25px',width:'25px'}} alt='Facebook'/></div></a>
                <a href='https://www.instagram.com/rantikathakur/' target='blank'><div style={{margin:'0px 10px'}}><img src={ YoutubeLogo}  style={{height:'25px',width:'25px'}} alt='Youtube'/></div></a>
                <a href='https://www.instagram.com/rantikathakur/' target='blank'><div style={{margin:'0px 10px'}}><img src={LinkedinLogo}  style={{height:'25px',width:'25px'}} alt='LinkedIn'/></div></a>
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

