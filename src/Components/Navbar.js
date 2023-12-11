import './Navbar.css'
import {Link} from 'react-router-dom'
import CartImage from '../Images/Cart.png'
import HeartImage from '../Images/heart.png'
import ProfileImage from '../Images/profileicon.png'
import RantikaLogo from '../Images/Rantika.png'
import SearchImage from '../Images/Search.png'
function Navbar(props) {
  return (
    <>
   <section className='Navbar'>
    <div className='Navbar-box1'>
      <div className='Navbar-box1-box'>
     <div style={{height:'35px',width:'100%',borderRadius:'7px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',border:'1px solid #B0B0B0',margin:'0px 6px',padding:'2px 5px'}}>
      <div style={{height:'25px',width:'20%',margin:'0px 10px 0px 0px'}}><img src={SearchImage}style={{height:'20px'}} alt='search' /></div>
      <input type='text' onChange={props.handleInputChange} style={{height:'28px',border:'none'}}/>
      </div> 
      <Link to='/cart' style={{textDecoration:'none',color:'#757575'}}><div style={{height:'30px',width:'30px',margin:'0px 6px'}}><img src={CartImage} alt='cart' /></div></Link>
      <Link to='/wishlist' style={{textDecoration:'none',color:'#757575'}}><div style={{height:'30px',width:'30px',margin:'0px 6px'}}><img src={HeartImage} alt='wishlist' /></div></Link>
      <Link to='/profile' style={{textDecoration:'none',color:'#757575'}}><div style={{height:'30px',width:'30px',margin:'0px 6px'}}><img src={ProfileImage} alt='profile' /></div></Link>
      </div>
    </div>
    <div className='Navbar-box2' style={{margin:'14px 0px'}}>
    <img src={RantikaLogo} alt='Logo'/>
    </div>
    <div className='Navbar-box3' style={{fontFamily:'Abhaya Libre',fontSize:'32px',padding:'21px 21px'}}>
    <Link to='/' style={{textDecoration:'none',color:'#757575'}}><div style={{margin:'0px 35px'}}>Home</div></Link>
    <Link to='/shop' style={{textDecoration:'none',color:'#757575'}}><div style={{margin:'0px 35px'}}>Shop</div></Link>
      <div style={{margin:'0px 35px'}}>Customize Size</div>
      <Link to='/contact' style={{textDecoration:'none',color:'#757575'}}><div style={{margin:'0px 35px'}}>Contact</div></Link>
    </div>
   </section>
    </>
  );
}

// const mapStateToProps = (state) => ({
//   token: state.auth.user.token,
//   groupData:state.group.groupData

// });
// export default connect(mapStateToProps)(memo(CreateGroup));
export default Navbar;

