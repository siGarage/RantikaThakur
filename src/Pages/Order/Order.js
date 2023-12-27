import { Link } from 'react-router-dom';
import './Order.css';
import { connect } from 'react-redux';
import { memo, useEffect, useState } from 'react';
import ORDER from '../../API/Order'
import { toast } from 'react-toastify';
function Order(props) {
    const {authtoken}=props;
  let [order,setOrder]=useState([])
    useEffect(() => {
      ORDER.getOrder(authtoken).then((res)=>{
        
        if(res.status===200){
          let orderSimplify=[]
          for (let i of res.data.data){
            if(i.attributes.products.length>1){
                for (let j in i.attributes.products){
                orderSimplify.push(i.attributes.products[j])
                }
            }
            else{
              orderSimplify.push(i.attributes.products[0])
            }
          }
        setOrder(orderSimplify)
        }
        else
        {
          toast.error('Server Side Error')
        }
      })
    },[authtoken])

console.log(order)
  return (
    <section className='Order'>
   

   <div className='Order2' style={{width:'100%',margin:'100px 0px'}}>
    <div className='Order-Main-Box'>
      <div className='Order-Main-Box1'>
    {order.length!==0 ? order.map((element)=>{return <div key={element.id} style={{display:'flex',flexDirection:'row',width:'100%',margin:'0px 0px 50px 0px'}}>
        <div key={element.id} style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center',height:'300px',fontFamily:'Comfortaa',fontWeight:'500',fontSize:'20px'}}>
        <div style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img src={`${process.env.REACT_APP_SERVERNAME}${element.attributes.image}`} alt='ProductImage' style={{height:'299px',width:'254px'}}/>
        </div>
      <div style={{width:'50%',display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
        <div style={{width:'100%'}}>
      <p style={{margin:'0px 0px'}}>{element.attributes.title.length > 25
                                ? `${element.attributes.title.slice(0, 25)}...`
                                : element.attributes.title}</p>
      <p style={{margin:'0px 0px'}}>Rs. {element.attributes.price}</p>
      <p style={{margin:'0px 0px'}}>Size. {element.attributes.size}</p>
      <p style={{margin:'0px 0px'}}>Quantity: {element.attributes.quantity}</p>
      </div>
      
  </div>
</div>
  
</div>
}):<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',height:'100%',fontFamily:'Comfortaa',color:'#737373',fontSize:'20px',fontWeight:'700'}}>No Order Placed</div>} 
      </div>  
      
    </div> 
    </div>




   

   <div className='Order5'>
   <Link to='/shop?type=All' className='Order5Button'><button style={{backgroundColor:'transparent',border:'none'}} >Continue Shopping</button></Link>
    </div>

    </section>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
  useremail:state.auth.user.user.email,
  authtoken:state.auth.user.jwt,

});
export default connect(mapStateToProps)(memo(Order));

