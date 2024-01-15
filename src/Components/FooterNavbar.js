import React, { memo } from 'react'
import './FooterNavbar.css'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import CartImage from '../Images/Cart.png'
// import HeartImage from '../Images/heart.png'
// import ProfileImage from '../Images/profileicon.png'
const FooterNavbar = (props) => {
    const {username,logged_in}=props;
  return (
    <div className='Footer-Navbar'>
      <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',height:'100%'}}> 
      <NavLink  className='Footer-Navlink-Navbar' to='/home' style={({ isActive }) => ({color: isActive ?'black':'grey'})}><span className="material-symbols-outlined" style={{fontSize:'31px',margin:'4px 0px',fontWeight:'300'}}>home</span></NavLink>
      <NavLink  className='Footer-Navlink-Navbar' to='/shop/?type=All' style={({ isActive }) => ({color: isActive ?'black':'grey'})}><span className="material-symbols-outlined" style={{fontSize:'30px',margin:'4px 0px',fontWeight:'300'}}>storefront</span></NavLink>
      <NavLink  className='Footer-Navlink-Navbar' to='/cart' style={({ isActive }) => ({color: isActive ?'black':'grey'})}><span className="material-symbols-outlined" style={{fontSize:'30px',margin:'4px 0px',fontWeight:'300'}}>shopping_cart</span></NavLink>
      <NavLink className='Footer-Navlink-Navbar' to='/wishlist' style={({ isActive }) => ({color: isActive ?'black':'grey'})}><span className="material-symbols-outlined" style={{fontSize:'30px',margin:'4px 0px',fontWeight:'300'}}>favorite</span></NavLink>
      {!logged_in?<NavLink className='Footer-Navlink-Navbar' to='/profile' style={({ isActive }) => ({color: isActive ?'black':'grey'})}><span className="material-symbols-outlined" style={{fontSize:'30px',margin:'4px 0px',fontWeight:'300'}}>person</span></NavLink>:<NavLink  className='Footer-Navlink-Navbar'to='/profile' style={{textDecoration:'none'}}><div className='Profile--Footer-Navbar-Box-Text'>{username.slice(0,1).toUpperCase()}</div></NavLink>}
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