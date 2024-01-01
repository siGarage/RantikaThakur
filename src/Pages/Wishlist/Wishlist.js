import { memo, useEffect} from 'react';
import './Wishlist.css';
import { connect, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import constants from '../../constants';
import WISHLIST from '../../API/Wishlist'
import CARTDATA from '../../API/Cart'
import Wishlistcard from './Wishlistcard';
function Wishlist(props) {
 
  const {wishlist,useremail,authtoken}=props;
  const dispatch=useDispatch()

  let {cart}=props;

  // Delete from Wishlist
  
  


  useEffect(() => {
    WISHLIST.getWishlistItems(useremail,authtoken).then((res)=>{
      if(res.status===200){
        dispatch({
          type: constants("wishlist").reducers.wishlist.AddToWishlist,
          payload: {wishItems:res.data.data}
        })
      }
      else{
        toast.error('Server Side Error')
      }
    })
    
  },[useremail,authtoken,dispatch])
 

  

    // Get Items From Cart

    useEffect(() => {
      if(cart.length===0){
      CARTDATA.getCartItems(useremail,authtoken).then((res)=>{
        if(res.status===200){
          dispatch({
            type: constants("cart").reducers.cart.AddToCart,
            payload: {cartItems:res.data.data},
          })
        }
        else{
          toast.error('Server Side Error')
        }
      })
    }
    },[useremail,authtoken,dispatch,cart.length])
  


  return (
    <section className='Wishlist'>
     <div className='Wishlist2' style={{width:'100%',margin:'40px 0px'}}>
    <div className='Wishlist-Main-Box'>
      <div className='Wishlist-Main-Box1'>
    {wishlist.length!==0 ? wishlist.map((element)=>{return <Wishlistcard element={element}/>
}):<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',height:'100%',fontFamily:'Comfortaa',color:'#737373',fontSize:'20px',fontWeight:'700'}}>No Item In Wishlist</div>} 
      </div>  
      
    </div> 
    </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  useremail:state.auth.user.user.email,
  authtoken:state.auth.user.jwt,
  wishlist:state.wishlist.wishItems,
  cart: state.cart.cartItems
});
export default connect(mapStateToProps)(memo(Wishlist));

