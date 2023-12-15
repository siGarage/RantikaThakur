import { memo, useState } from 'react';
import './Cart.css';
import { connect, useDispatch } from 'react-redux';
import constants from '../../constants';
import { toast } from 'react-toastify';
import YouMayLike from '../YouMayLike/YouMayLike'
function Cart(props) {
  const dispatch=useDispatch();
    const [code,setCode]=useState('NOTVALID')
    const {cart}=props;


    const onChange=(e)=>{
      setCode(e.target.value)
     
     }

    let DiscountCode='ASDFGH'
    
    const TotalSum=()=>{
      const arr = cart.map((element) => element.attributes.price)
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

    const DeleteFromCart=(id)=>{

      dispatch({
        type: constants("cart").reducers.cart.DeleteFromCart,
        payload: { data: id },
      })
      toast.success('Product Deleted From Cart');
    }


  return (
    <section className='Cart' style={{width:'100%',margin:'100px 0px'}}>
    <div className='Cart-Main-Box'>
      <div className='Cart-Main-Box1'>
    {cart.length!==0 ? cart.map((element)=>{return <div key={element.id} style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center',height:'300px',fontFamily:'Comfortaa',fontWeight:'500',fontSize:'20px',margin:'0px 0px 50px 0px'}}>
        <div style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img src={`${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[0].attributes.url}`} alt='ProductImage' style={{height:'299px',width:'254px'}}/>
        </div>
      <div style={{width:'50%',display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
        <div>
      <p style={{margin:'0px 0px'}}>{element.attributes.title.length>25?`${element.attributes.title.slice(0,25)}...`:element.attributes.title}<span className="material-symbols-outlined" style={{cursor:'pointer'}} onClick={()=>{DeleteFromCart(element.id)}}>delete</span></p>
      <p style={{margin:'0px 0px'}}>Rs. {element.attributes.price}</p>
      <p style={{margin:'0px 0px'}}>Category: {element.attributes.category.data.attributes.category}</p>
      <p style={{margin:'0px 0px'}}>Product Id: {element.id}</p>
      </div>
      <div>
      <h6>Quantity</h6>
      <select name="Quantity" id="Quantity" style={{width:'88px',height:'56px'}}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      </select>
      </div>
  </div>
</div>}):<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',height:'100%',fontFamily:'Comfortaa',color:'#737373',fontSize:'20px',fontWeight:'700'}}>No Items in Cart</div>} 
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
  });
  export default connect(mapStateToProps)(memo(Cart));

