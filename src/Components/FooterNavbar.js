import React, { memo } from 'react'
import './FooterNavbar.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartImage from '../Images/Cart.png'
import HeartImage from '../Images/heart.png'
import ProfileImage from '../Images/profileicon.png'
const FooterNavbar = (props) => {
    const {username,logged_in}=props;
  return (
    <div className='Footer-Navbar'>
      <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',height:'100%'}}>
      <Link  className='Footer-Navlink-Navbar' to='/home' style={{textDecoration:'none',color:'#757575'}}><span class="material-symbols-outlined" style={{fontSize:'35px',margin:'0px'}}>home</span></Link>
      <Link  className='Footer-Navlink-Navbar' to='/cart' style={{textDecoration:'none',color:'#757575'}}><div style={{height:'30px',width:'30px',margin:'0px 6px'}}><img src={CartImage} alt='cart'/></div></Link>
      <Link className='Footer-Navlink-Navbar' to='/wishlist' style={{textDecoration:'none',color:'#757575'}}><div style={{height:'30px',width:'30px',margin:'0px 6px'}}><img src={HeartImage} alt='wishlist' /></div></Link>
      {!logged_in?<Link className='Footer-Navlink-Navbar' to='/profile' style={{textDecoration:'none',color:'#757575'}}><div style={{height:'30px',width:'30px',margin:'0px 6px'}}><img src={ProfileImage} alt='profile' /></div></Link>:<Link  className='Footer-Navlink-Navbar'to='/profile' style={{textDecoration:'none'}}><div className='Profile--Footer-Navbar-Box-Text'>{username.slice(0,1).toUpperCase()}</div></Link>}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
    products: state.product.Products,
    logged_in:state.auth.logged_in,
    username:state?.auth?.user?.user?.username,
  });
  
  export default connect(mapStateToProps)(memo(FooterNavbar));