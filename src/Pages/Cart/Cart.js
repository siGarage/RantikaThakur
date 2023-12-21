import { memo, useEffect, useState } from 'react';
import './Cart.css';
import { connect, useDispatch } from 'react-redux';
import constants from '../../constants';
import { toast } from 'react-toastify';
import YouMayLike from '../YouMayLike/YouMayLike'
import CARTDATA from '../../API/Cart'
import { useNavigate } from 'react-router-dom';
function Cart(props) {

  const navigate=useNavigate()
  const dispatch=useDispatch();
  
    const [code,setCode]=useState('NOTVALID')
    const {cart,useremail,authtoken}=props;

    const onChange=(e)=>{
      setCode(e.target.value)
     
     }

    let DiscountCode='ASDFGH'
    
    const TotalSum=()=>{
      const arr = cart.map((element) => Number(element.attributes.price))
      let sum = 0;
      arr.forEach((el) => sum += el);
      if(DiscountCode===code){
        toast.success('Discount Successful!',{id:1})
        return sum-(sum*(40/100))
      }
      else
      {
      return sum;
      }
    }


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

  return (
    <section className='Cart' style={{width:'100%',margin:'100px 0px'}}>
    <div className='Cart-Main-Box'>
      <div className='Cart-Main-Box1'>
    {cart?.length!==0 ? cart.map((element)=>{return <div  key={element.id} style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center',height:'300px',fontFamily:'Comfortaa',fontWeight:'500',fontSize:'20px',margin:'0px 0px 50px 0px'}}>
        <div style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img src={`${process.env.REACT_APP_SERVERNAME}${element.attributes.image}`} alt='ProductImage' style={{height:'299px',width:'254px'}}/>
        </div>
      <div style={{width:'50%',display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
        <div onClick={()=>{navigate(`/shop/${element.attributes.id_product}`)}} style={{cursor:'pointer'}}> 
      <p style={{margin:'0px 0px'}}>{element.attributes.title.length>25?`${element.attributes.title.slice(0,25)}...`:element.attributes.title}</p>
      <p style={{margin:'0px 0px'}}>Rs. {element.attributes.price}</p>
      <p style={{margin:'0px 0px'}}>Category: {element.attributes.category}</p>
      <p style={{margin:'0px 0px'}}>Product Id: {element.attributes.id_product}</p>
      </div>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
      <div className="input-group">
      <button disable={Number(element.attributes.quantity===1)?'true':'false'} id="decrement"  onClick={()=>{Decrement(element.id,element.attributes.price,element.attributes.quantity)}} style={{borderRadius:'50%',width:'30px',border:'none',backgroundColor:'rgb(226, 191, 68)'}}>-</button>
      <input id="input" value={Number(element.attributes.quantity)} readOnly style={{width:'50px',margin:'0px 10px'}}/>
       <button id="increment"  onClick={()=>{Increment(element.id,element.attributes.price,element.attributes.quantity)}} style={{borderRadius:'50%',width:'30px',border:'none',backgroundColor:'rgb(226, 191, 68)'}}>+</button>
       </div>
      <span  style={{margin:'0px 50px',cursor:'pointer',fontSize:'40px'}} className="material-symbols-outlined"  onClick={()=>{DeleteFromCart(element.id,authtoken)}}>delete</span>
      </div>
  </div>
</div>}):<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',height:'100%',fontFamily:'Comfortaa',color:'#737373',fontSize:'20px',fontWeight:'700'}}>No Item In Cart</div>} 
      </div>  
     <div className='Cart-Main-Box2'>
      <div>Add a Discount Code</div>
      <div style={{margin:'12px 0px'}}>
        <input type='text' onChange={onChange} style={{height:'40px',margin:'0px 20px 0px 0px'}}/>
        {/* <button style={{height:'40px',width:'100px',border:'none',borderRadius:'6px',backgroundColor:'#E2BF44'}}>Add</button> */}
      </div>
     
     <div style={{borderBottom:'1px solid black',padding:'20px 0px',width:'80%'}}>
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

        <div style={{padding:'20px 0px',width:'80%'}}>
        
        <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
        <div >Total</div>
         <div>
        {TotalSum()}
        </div>
        </div>


        </div>

        <button style={{padding:'10px 0px',width:'80%',border:'none',borderRadius:'6px',backgroundColor:'#E2BF44',height:'auto',fontSize:'20px',fontWeight:'400',display:'flex',justifyContent:'center',alignItems:'center',color:'white'}}>Continue To Checkout</button>
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



  