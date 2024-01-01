import { memo, useEffect} from 'react';
import './Cart.css';
import { connect, useDispatch } from 'react-redux';
import constants from '../../constants';
import { toast } from 'react-toastify';
import YouMayLike from '../YouMayLike/YouMayLike'
import CARTDATA from '../../API/Cart'
import { useNavigate } from 'react-router-dom';

import {loadStripe} from '@stripe/stripe-js'
import { makePaymentRequest } from '../../API/Payment';
function Cart(props) {
 
  const navigate=useNavigate()
  const dispatch=useDispatch();
  
    
    const {cart,useremail,authtoken}=props;
   

  // Delete Items From Cart
    const DeleteFromCart=(id,authtoken)=>{
      CARTDATA.deleteCartItems(id,authtoken).then((res)=>{
        if(res.status===200){
          const cartdata=cart.filter((ele)=>ele.id!==id)
          dispatch({
            type: constants("cart").reducers.cart.AddToCart,
            payload: {cartItems:cartdata},
          })
          toast.success('Item Deleted Successfully !')
           }
          })
        }
    

    // Update 
    const Increment=(cartId,priceold,quantityold)=>{
      const priceofone=priceold/quantityold
      const price=Number(priceold)+Number(priceofone)
      const quantity=Number(quantityold)+1
      const data={price,quantity}
      const cartData=cart.map((element)=>{
        if(cartId===element.id)
        {
          return {
            ...element,
            attributes:{
                 ...element.attributes,...data
            }
          }
        }
        return element
      })
       
      
      CARTDATA.updateCart(cartId,data,authtoken).then((res)=>{ 
          if(res.status===200){
            dispatch({
              type: constants("cart").reducers.cart.AddToCart,
              payload: {cartItems:cartData},
            })
             }
            })
     }

     const Decrement=(cartId,priceold,quantityold)=>{
      const priceofone=priceold/quantityold
      const price=(quantityold>1?Number(priceold)-Number(priceofone):Number(priceofone))
      const quantity=(quantityold>1?Number(quantityold)-1:1)
      const data={price,quantity}
      const cartData=cart.map((element)=>{
        if(cartId===element.id)
        {
          return {
            ...element,
            attributes:{
                 ...element.attributes,...data
            }
          }

        }
        return element
      }) 
      if(quantity>=1){
      CARTDATA.updateCart(cartId,data,authtoken).then((res)=>{
          if(res.status===200){
            dispatch({
              type: constants("cart").reducers.cart.AddToCart,
              payload: {cartItems:cartData},
            })
             }
            })
        }
      }
     // Get Cart Items

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

    const stripePromise=loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISH_KEY}`)
    const handlePayment=async()=>{
      try {
        const stripe = await stripePromise;
        const res = await makePaymentRequest.post("/api/orders", {email:useremail,
            products: cart,
        });
       
        await stripe.redirectToCheckout({
            sessionId: res.data.stripeSession.id,
        });
    } catch (err) {
        console.log(err);
    }
    
    }
    
  return (
    <section className='Cart' style={{width:'100%',margin:'30px 0px'}}>
    <div className='Cart-Main-Box'>
      <div className='Cart-Main-Box1'>
    {cart?.length!==0 ? cart.map((element)=>{return <div  className='cartCard' key={element.id} style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center',fontFamily:'Comfortaa',fontWeight:'500',fontSize:'20px',margin:'0px 0px 50px 0px'}}>
        <div onClick={()=>{navigate(`/shop/${element.attributes.id_product}`)}} style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img className='cartCardImage' src={`${process.env.REACT_APP_SERVERNAME}${element.attributes.image}`} alt='ProductImage'/>
        </div>
      <div style={{width:'50%',display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%',margin:'0px 10px'}}>
        <div className='Cart-Product-Detail' onClick={()=>{navigate(`/shop/${element.attributes.id_product}`)}} style={{cursor:'pointer'}}> 
      <p style={{margin:'0px 0px'}}>{element.attributes.title.length>15?`${element.attributes.title.slice(0,15)}...`:element.attributes.title}</p>
      <p style={{margin:'0px 0px'}}>Rs. {element.attributes.price}</p>
      <p style={{margin:'0px 0px'}}>Category: {element.attributes.category}</p>
      <p style={{margin:'0px 0px'}}>Selected Size: {element.attributes.size}</p>
      </div>
      <div className="input-group">
      <button disable={Number(element.attributes.quantity===1)?'true':'false'} id="decrement"  onClick={()=>{Decrement(element.id,element.attributes.price,element.attributes.quantity)}} style={{borderRadius:'50%',width:'30px',border:'none',backgroundColor:'rgb(226, 191, 68)'}}>-</button>
      <input id="input" value={Number(element.attributes.quantity)} readOnly style={{width:'50px',margin:'0px 10px'}}/>
       <button id="increment"  onClick={()=>{Increment(element.id,element.attributes.price,element.attributes.quantity)}} style={{borderRadius:'50%',width:'30px',border:'none',backgroundColor:'rgb(226, 191, 68)'}}>+</button>
       </div>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center',width:'100%'}}>
      
      <span style={{margin:'0px 20px',cursor:'pointer'}} className="material-symbols-outlined cartDeleteButton"  onClick={()=>{DeleteFromCart(element.id,authtoken)}}>delete</span>
      </div>
  </div>
</div>}):<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',height:'100%',fontFamily:'Comfortaa',color:'#737373',fontSize:'20px',fontWeight:'700'}}>No Item In Cart</div>} 
      </div>  
     <div className='Cart-Main-Box2'>
      
     <div style={{borderBottom:'1px solid black',padding:'20px 0px',width:'100%'}}>
      <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between',margin:'20px 0px 0px 0px'}}>
        <div >Order Value</div>
         <div>
        {cart.map((element)=>{return <p key={element.id} style={{margin:'0px'}}>{element.attributes.price}</p>})}
        </div>
        </div>
        
        <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
        <div >Delivery</div>
         <div>
         Free
        </div>
        </div>

        </div>

        <div style={{padding:'20px 0px',width:'100%'}}>
        
        <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
        <div >Total</div>
         <div>
         {(cart.length!==0)?cart.map((element)=> Number(element.attributes.price)).reduce((accumulator, currentValue) => accumulator + currentValue):'0'
        }

        </div>
        </div>


        </div>

        <button disabled={cart.length===0} style={{padding:'10px 0px',width:'100%',border:'none',borderRadius:'6px',backgroundColor:'#E2BF44',height:'auto',fontSize:'20px',fontWeight:'400',display:'flex',justifyContent:'center',alignItems:'center',color:'white'}} onClick={()=>handlePayment()}>Continue To Checkout</button>
      </div>   
    </div> 
    <YouMayLike/>
    </section>
  );
}
const mapStateToProps = (state) => ({
    cart: state.cart.cartItems,
    useremail:state.auth.user.user.email,
    authtoken:state.auth.user.jwt,

  });
  export default connect(mapStateToProps)(memo(Cart));



  