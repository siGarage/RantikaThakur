import { memo, useEffect, useState } from 'react';
import './Wishlist.css';
import { connect, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import constants from '../../constants';
import WISHLIST from '../../API/Wishlist'
import CARTDATA from '../../API/Cart'
import { useNavigate } from 'react-router-dom';
function WishlistCard(props) {
  const navigate=useNavigate()
  const {wishlist,useremail,authtoken}=props;
  const dispatch=useDispatch()

  let {cart}=props;
  let element=props.element
  // Delete from Wishlist
  
  let [size,setSize]=useState('')
  const DeleteFromWishlist=(id,authtoken)=>{
    WISHLIST.deleteWishlistItems(id,authtoken).then((res)=>{
      if(res.status===200){
          const wishdata=wishlist.filter((ele)=>ele.id!==id)
          dispatch({
            type: constants("wishlist").reducers.wishlist.AddToWishlist,
            payload: {wishItems:wishdata},
          })
           }

          })
  };

   
    // Add to Cart from Wishlist

    const AddToCart = (data) => { 
      if(data.size!==''){
      const findData=cart.find((element)=>Number(element.attributes.id_product)===Number(data.id_product) && String(element.attributes.size)===String(data.size))
       if(findData){
         const findProductPrice=Number(findData.attributes.price)+Number(data.price)
         const findProductQuantity=Number(findData.attributes.quantity)+1
         updateProduct(findData.id,findProductPrice,findProductQuantity)
       }
       else{
         CARTDATA.addCartItems(data,authtoken).then((res)=>{ 
           if(res.status===200){
             dispatch({
               type: constants("cart").reducers.cart.AddToCart,
               payload: {cartItems:[...cart,res.data.data]},

             })
             toast.success('Item Added To Cart !')
              }  
           })
       }
       }
       else{
        toast.error('Please Select Size !')
       }
      }
     
      const updateProduct=(cartId,price,quantity)=>{
       const data={price,quantity}
       CARTDATA.updateCart(cartId,data,authtoken).then((res)=>{
           if(res.status===200){
             const something=cart.filter((ele)=>ele.id!==cartId)
             dispatch({
               type: constants("cart").reducers.cart.AddToCart,
               payload: {cartItems:[...something,res.data.data]},
             })
             toast.success('Item Added To Cart !')
              }
             })
      }


      // Get Wishlist Items

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
    <div style={{display:'flex',flexDirection:'row',width:'100%',margin:'0px 0px 50px 0px'}} key={element.id}>
        
        <div  style={{display:'flex',flexDirection:'row',width:'60%',justifyContent:'center',alignItems:'center',height:'300px',fontFamily:'Comfortaa',fontWeight:'500',fontSize:'20px'}}>
        <div style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img src={`${process.env.REACT_APP_SERVERNAME}${element.attributes.image}`} alt='ProductImage' style={{height:'299px',width:'254px'}}/>
        </div>
      <div  style={{cursor:'pointer',width:'50%',display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
        <div onClick={()=>{navigate(`/shop/${element.attributes.id_product}`)}} style={{width:'100%'}}>
      <p style={{margin:'0px 0px'}}>{element.attributes.title.length>30?`${element.attributes.title.slice(0,25)}...`:element.attributes.title}</p>
      <p style={{margin:'0px 0px'}}>Rs. {element.attributes.price}</p>
      <p style={{margin:'0px 0px'}}>Category: {element.attributes.category}</p>
      <p style={{margin:'0px 0px'}}>Product Id: {element.attributes.id_product}</p>
      
      </div>
      <div>Select Size: {element.attributes.size.map((element)=><button  style={{backgroundColor:(size===element)?'#E2BF44':'white',border:(size===element)?'none':'1px solid #959595',margin:'0px 4px'}} onClick={()=>{setSize(element)}} key={element}>{element}</button>)}</div>
      <div style={{display:'flex',justifyContent:'flex-end'}}><span style={{margin:'0px 50px',cursor:'pointer',fontSize:'40px'}} className="material-symbols-outlined"  onClick={()=>{DeleteFromWishlist(element.id,authtoken)}}>delete</span></div>
  </div>
</div>
<div  style={{width:'40%',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px 50px',fontFamily:'poppins',fontWeight:'400',fontSize:'24px',color:'#E2BF44'}}>
  <button onClick={()=>{AddToCart({"email":useremail,
                     "title":element.attributes.title,
                     "price":element.attributes.price,
                     "category":element.attributes.category,
                     "id_product":element.attributes.id_product,
                     "image":`${element.attributes.image}`,
                     "quantity":1,
                     "size":size,
                  },authtoken);                  
                  }}
style={{backgroundColor:'#E2BF44',padding:'10px 20px',color:'white',fontFamily:'Inter',fontWeight:'400',fontSize:'32px',borderRadius:'72px',border:'none'}}>Add To Cart</button></div>
</div>
 
      
  )
}
const mapStateToProps = (state) => ({
  useremail:state.auth.user.user.email,
  authtoken:state.auth.user.jwt,
  cart: state.cart.cartItems,
  wishlist:state.wishlist.wishItems
});


export default connect(mapStateToProps)(memo(WishlistCard));

