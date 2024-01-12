import { useNavigate, useSearchParams} from 'react-router-dom';
import './Success.css'
import { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ORDER from '../../API/Order'
const stripe = require("stripe")(
    `${process.env.REACT_APP_STRIPE_STRIPE_KEY}`
  );

const Success =(props) => {
    const [order,setOrder]=useState({})
    const [searchParams]=useSearchParams()
    const session_id=searchParams.get(`session_id`)
    const navigate=useNavigate()
   
  const {useremail}=props
    useEffect(()=>{
       if(session_id)
       {
        const some=async()=>{
            const order=await stripe.checkout.sessions.retrieve(session_id,
                {
                  expand: ["line_items"]
                }
                );
            setOrder(order) 
        }
        some()
       }
        
    },[session_id])


    const fetchName=(String)=>{
      const regex = /^(.*?),\s*Size:\w+/;
      const match = String.match(regex);
      return match[1]
      }


    const fetchSize=(String)=>{
      const regex = /Size:(\w+)/;
      const match = String.match(regex);
      
      return match[1]
    }
console.log(order)
    useEffect(()=>
      {
      if(Object.keys(order).length > 0)
      {
      ORDER.setOrder({"email":useremail,"address":order?.customer_details,"products":order?.line_items?.data,'stripeId':session_id}).then((res) => {
      if (res.status === 200) 
      {
      console.log('order successful!')
      } 
      else 
      {
      console.log('error')
      }
      });
      } 
      },[order,useremail,session_id])
    return (
        <div  className='Success-Box' >
        {Object.keys(order).length>0?(
            <div className='Success-Box-Details' >
            <h1>Thank you ✌</h1>
              <h2>{order.customer_details.email}</h2>
              <div className='Order-Detail-Box' style={{display: "flex",margin: "2rem 0rem",width:'80%'}}>
              <div style={{ fontSize:'1rem',width:'100%'}}>
              <h3 style={{fontWeight:'600'}}>Address</h3>
              {Object.entries(order.customer_details.address).map(
              ([key, val]) => (
              <p key={key} style={{margin:'2px 0px',fontStyle:'italic'}}>
              {key} : {val}
              </p>
              )
              )}
              </div>
              <div style={{fontSize: "1rem",width: "100%"}}>
              <h3 style={{fontWeight:'600'}}>Products</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id} style={{ paddingBottom:'1rem'}}>
                <p style={{margin:'2px 0px'}}><span style={{fontWeight:'600'}}>Name: </span> {fetchName(String(item.description))}</p>
                <p style={{margin:'2px 0px'}}><span style={{fontWeight:'600'}}>Quantity:</span> {item.quantity}</p>
                <p style={{margin:'2px 0px'}}><span style={{fontWeight:'600'}}>Price:</span> {item.price.unit_amount / 100}</p>
                <p style={{margin:'2px 0px'}}><span style={{fontWeight:'600'}}>Size:</span> {fetchSize(String(item.description))}</p>
                
              </div>
            ))}
                    </div>
                  </div>
                  <button style={{color: "white",backgroundColor: "#E2BF44",border: "none",fontSize: "1.2rem",fontWeight: "500", padding: "1rem 2rem",cursor: "pointer"}} onClick={() => navigate("/shop/?type=All")}>Continue Shopping</button>
                </div>
        ):`No Data Found`}
    </div>
    );
};

const mapStateToProps = (state) => ({
  useremail:state.auth.user.user.email
});
export default connect(mapStateToProps)(memo(Success));