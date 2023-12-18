import './Profile.css'
import ProfileImage from './profile.jpg'
import AddImage from './Group (4).png'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { memo } from 'react';
function Profile(props) {
  const logOut=()=>{
    localStorage.clear()
    window.location.reload('/login')
  }
  let user = props.user.user
  console.log(user)
  return (
    <>
    <section className='profile'>
   <div className='profileBox1'><img src={ProfileImage} alt='profileImage' style={{height:'108px',width:'108px',border:'none',borderRadius:'50%'}}/>
   <div style={{position:'absolute',height:'43px',display:'flex',justifyContent:'center',alignItems:'center',width:'42px',top:'70px',left:'45vw',backgroundColor:'white',borderRadius:'50%',border:'none'}}><img src={AddImage}  alt='AddImage' /></div>
   <div style={{margin:'5px 0px',fontFamily:'Poppins',fontWeight:'300',fontSize:'20px'}}>User Name</div></div>
   <div className='profileBox2'>
   <div style={{width:'50%'}}>
    <div  className='ProfileDetailsHeading'>User Name</div>
    <div   className='ProfileDetails'>{user.username}</div>
    <div className='ProfileDetailsHeading'>Address</div>
    <div  className='ProfileDetails'>VPO Brarta Teh Sarkaghat Distt Mandi HP</div>
    <div className='ProfileDetailsHeading'>Phone</div>
    <div  className='ProfileDetails'>1234567890</div>
    <div className='ProfileDetailsHeading'>Email Address</div>
    <div  className='ProfileDetails'>{user.email}</div>
   </div>
   <div style={{width:'50%',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'flex-end',padding:'0px 50px'}}>
    <button style={{display:'flex',justifyContent:'center',alignItems:'center',width:'86px',height:'37px',backgroundColor:'#E2BF44',color:'white',fontFamily:'Poppins',borderRadius:'72px',border:'none'}}>Edit</button>
    <button style={{display:'flex',border:'none',backgroundColor:'transparent',justifyContent:'center',alignItems:'center',margin:'0px 0px 50px 0px',color:'#E2BF44',fontWeight:'500',fontSize:'20px'}}>Add Address</button>
   </div>
   </div>


   <div>
   <button  style={{display:'flex',justifyContent:'center',alignItems:'center',width:'150px',margin:'0px 0px 40px 0px',height:'40px',backgroundColor:'#E2BF44',color:'white',fontFamily:'Poppins',borderRadius:'72px',border:'none'}} onClick={()=>{logOut()}}>LogOut</button>
   </div>










    </section>
    <section className='profile2' style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',margin:'138px 0px'}}>
   <Link to='/order' onClick={()=>{window.scrollTo(0,0)}} className='profile2Button' ><p>Orders</p><p>&gt;</p></Link>
   <button className='profile2Button'><p>Customer</p><p>&gt;</p></button>
    </section>

    
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(memo(Profile));
