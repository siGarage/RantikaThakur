import './Hamberger.css'
import {Link} from 'react-router-dom';
function NavScrollExample() {
    
const openNav=()=> {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
const closeNav=(e)=> {
    e.preventDefault()
    document.getElementById("mySidenav").style.width = "0";
  }

  return (
    <>
  <div className='Hamburger' style={{backgroundColor:'white'}}>
  <div id="mySidenav" className="sidenav" style={{color:'#757575',opacity:'0.955',zIndex:'10'}}>
  <Link  className="closebtn" onClick={closeNav}>&times;</Link>
  <div onClick={closeNav}><Link to="/" style={{color:'white',fontSize:'18px'}}>Home</Link></div>
  <div onClick={closeNav}><Link  to="/shop?type=All" style={{color:'white',fontSize:'18px'}}>Shop</Link></div>
  <div onClick={closeNav}><Link  to="/customsize" style={{color:'white',fontSize:'18px',width:'250px'}}>Customize Size</Link></div>
  <div onClick={closeNav}><Link  to="/contact" style={{color:'white',fontSize:'18px'}}>Contact</Link></div>
</div>

 {/* Use any element to open the sidenav  */}
<button className='Hamburger-button' onClick={openNav} style={{backgroundColor:'transparent',border:'0px'}}>
<div style={{height:'3px',width:'20px',backgroundColor:'black',margin:'3px'}}></div>
<div style={{height:'3px',width:'20px',backgroundColor:'black',margin:'3px'}}></div>
<div style={{height:'3px',width:'20px',backgroundColor:'black',margin:'3px'}}></div>
</button>
</div>
    </>
  );
}

export default NavScrollExample;