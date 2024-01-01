import './Footer.css'
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
   <div className='Footer-inner-box' >
    <div style={{width:'100%'}}>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',color:'white',margin:'20px 0px 20px 0px'}}>
        <div style={{width:'32%'}}>
            <div style={{margin:'0px 0px 18px 0px',fontSize:'16px'}}>QUICK LINKS</div>
            <Link to='/shop/?type=All' onClick={window.scrollTo(0, 0)}   style={{textDecoration:'none'}}><div style={{fontSize:'14px',margin:'8px 0px',color:'white'}}>Shop</div></Link>
            <Link to='/about'   style={{textDecoration:'none'}}><div style={{fontSize:'14px',margin:'8px 0px',color:'white'}}>About</div></Link>
            <Link to='/customsize'  style={{textDecoration:'none'}}><div style={{fontSize:'14px',margin:'8px 0px',color:'white'}}>Customize Size</div></Link>
            <Link to='/contact'  style={{textDecoration:'none'}}><div style={{fontSize:'14px',margin:'8px 0px',color:'white'}}>Contact Us</div></Link>
            
        </div>


        <div style={{width:'32%'}}>
            <div style={{margin:'0px 0px 18px 0px',fontSize:'16px',fontWeight:'500'}}>USEFUL LINKS</div>
            <Link to='/privacypolicy'   style={{textDecoration:'none'}}><div style={{fontSize:'14px',margin:'8px 0px',fontWeight:'500',color:'white'}}>Privacy Policy</div></Link>
            <Link to='/exchangepolicy'  style={{textDecoration:'none'}}> <div style={{fontSize:'14px',margin:'8px 0px',fontWeight:'500',color:'white'}}>Exchange Policy</div></Link>
            <Link to='/termsandcondition' style={{textDecoration:'none'}}> <div style={{fontSize:'14px',margin:'8px 0px',fontWeight:'500',color:'white'}}>Terms and Conditions</div></Link>  
        </div>


        <div style={{width:'32%'}}>
            <div style={{margin:'0px 0px 18px 0px',fontSize:'16px',fontWeight:'500'}}>SHOP</div>
            <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${'Shirts'}`
          });
          window.scrollTo(0, 0)
          }} style={{fontSize:'14px',margin:'8px 0px',fontWeight:'500',cursor:'pointer'}}>Shirts</div>
            
            <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${'Skirts'}`
          });
          window.scrollTo(0, 0)
          }}  style={{fontSize:'14px',margin:'8px 0px',fontWeight:'500',cursor:'pointer'}}>Skirts</div>
            <div 
            onClick={()=>{navigate({
                pathname:'/shop',
                search:`?type=${'Tops'}`
              });
              window.scrollTo(0, 0)}} 
              style={{fontSize:'14px',margin:'8px 0px',fontWeight:'500',cursor:'pointer'}}>Tops</div>
            <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${'Dresses'}`
          });
          window.scrollTo(0, 0)
        }} 
          style={{fontSize:'14px',margin:'8px 0px',fontWeight:'500',cursor:'pointer'}}>Dresses</div>
        </div>
       
    </div>
    </div>
    <div style={{width:'100%',height:'20%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div  style={{display:'flex',flexDirection:'row',alignItem:'center',justifyContent:'space-between',width:'50%'}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',margin:'10px 0px 20px 0px'}}>
                <a href='https://www.instagram.com/rantikathakur/' target='blank'><div style={{margin:'0px 10px'}}><img src={InstagramLogo}  style={{height:'25px',width:'25px'}} alt='Twitter'/></div></a>
                <a href='https://www.instagram.com/rantikathakur/' target='blank'><div style={{margin:'0px 10px'}}><img src={FacebookLogo}  style={{height:'25px',width:'25px'}} alt='Facebook'/></div></a>
                <a href='https://www.instagram.com/rantikathakur/' target='blank'><div style={{margin:'0px 10px'}}><img src={ YoutubeLogo}  style={{height:'25px',width:'25px'}} alt='Youtube'/></div></a>
                <a href='https://www.instagram.com/rantikathakur/' target='blank'><div style={{margin:'0px 10px'}}><img src={LinkedinLogo}  style={{height:'25px',width:'25px'}} alt='LinkedIn'/></div></a>
            </div>
        </div>
    </div>
    </div>
    <div style={{width:'95%',height:'20%',margin:'10px 0px',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:'14px',fontWeight:'500',fontFamily:'Roboto',color:'white'}}>© 2022 Name Technologies Inc.</div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center',width:'40%',fontWeight:'500',fontFamily:'Roboto',color:'white'}}>
            All rights reserved 
        </div>
    </div>
   </section>
    </>
  );
}

export default Footer;

