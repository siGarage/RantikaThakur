import { Link } from 'react-router-dom';
import './Order.css';
import { connect } from 'react-redux';
import { memo, useEffect, useState } from 'react';
import ORDER from '../../API/Order'
import { toast } from 'react-toastify';
function Order(props) {
    const {authtoken,useremail}=props;

  let [order,setOrder]=useState([])

  const fetchSize=(String)=>{
    const regex = /Size:(\w+)/;
    const match = String.match(regex);
    return match[1]
  }

  const fetchName=(String)=>{
  const regex = /^(.*?),\s*Size:\w+/;
  const match = String.match(regex);
  return match[1]
  }
 

    useEffect(() => {
      ORDER.getOrder(useremail,authtoken).then((res)=>{
        if(res.status===200){
        setOrder(res.data.data)
        }
        else
        {
          toast.error('Server Side Error')
        }
      })
    },[authtoken,useremail])
  return (
    <section className='Order'>
   

   <div className='Order2' style={{width:'100%',margin:'20px 0px'}}>
    <div className='Order-Main-Box'>


    <div className='Order-Main-Box1'>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'Inter',fontSize:'28px',fontWeight:'600'}}>Your Orders</div>
      <div className='Order-Main-Box1-Box'>
        {order.lengt!==0 ? order?.map(element => (
         <div key={element.id} style={{margin:'30px 0px',border:'2px solid black',padding:'10px'}} >
          <div  style={{fontFamily:'Inter'}}>
           <div style={{fontWeight:'800',color:'black'}}> Order Status</div>
          {element.attributes.order_confirmation.data===null  ? <div style={{fontWeight:'500',fontStyle:'italic'}}>Order Yet To Ship</div>:(String(element.attributes.order_confirmation.data.attributes.Order_Status)==='shipped'?<div style={{fontStyle:'italic'}}><div style={{fontWeight:'500'}}>Shipped</div><div>Delivery Service: {element.attributes.DeliveryService}</div><div>Track Id: {element.attributes.TrackId}</div></div>:<div style={{fontWeight:'500',display:'flex',alignItems:'center',fontStyle:'italic'}}>Delivered &nbsp;<span className="material-symbols-outlined" style={{color:'blue'}}>verified</span></div>)}
          </div>
           <div style={{fontFamily:'Inter',fontWeight:'300',margin:'20px 0px'}}>
            <div style={{fontFamily:'Inter',fontWeight:'700',fontSize:'20px',color:'black'}}>Address</div>
            <div className='Datail-product-order'>{element.attributes.address.name}</div>
            <div className='Datail-product-order'>{element.attributes.address.address.line1}</div>
            <div className='Datail-product-order'>{element.attributes.address.address.postal_code}</div>
            </div>
             <div>
        {element.attributes.products?.map(item => (
        <div key={item.id} style={{margin:'10px 0px'}}>
          <div><span style={{fontWeight:'700'}}>Product Name: </span> {fetchName(String(item.description))}</div>
          <div><span style={{fontWeight:'700'}}>Product Price: </span>{Number(item.price.unit_amount)*Number(item.quantity)/100}</div>
          <div><span style={{fontWeight:'700'}}>Product Quantity: </span>{item.quantity}</div>
          <div><span style={{fontWeight:'700'}}>Size: </span>{fetchSize(String(item.description))}</div>
        </div>
         ))}
        </div>
             
          </div>
        ))
        :<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'Inter',fontSize:'20px',fontWeight:'400',margin:"10px 0px"}}>No Orders</div>}
      </div>
    
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

