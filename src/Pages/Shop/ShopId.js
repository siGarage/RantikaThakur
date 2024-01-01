import { memo, useEffect, useState } from "react";
import { connect, useDispatch} from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useParams } from "react-router-dom";
import CARTDATA from '../../API/Cart'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import "./ShopId.css";
import YouMayLike from "../YouMayLike/YouMayLike";
import constants from "../../constants";
import Rating from '@mui/material/Rating';
import REVIEW from '../../API/Review'
import Box from '@mui/material/Box';

import {loadStripe} from '@stripe/stripe-js'
import { makePaymentRequest } from '../../API/Payment';


function ShopId(props) {
  const dispatch=useDispatch()
  const [value, setValue] = useState(0);
  const [reviewItems, setReviewItems] = useState([]);
  const [size,setSize]=useState('')
  
  // Id Of Product
  const { shopId } = useParams();
  const [review,setReview] = useState({id_product:Number(shopId),rating:value,review:"",name:"",email:""}); 
  const navigate=useNavigate()
  const {cart}=props;
  let [product, setProduct] = useState({});
  const {logged_in,useremail,authtoken}=props;


  // Add Data To Cart
  const AddToCart = (data) => { 
    if(data.size!=='' ){
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



 // Review Form
 
 let validateForm=(data)=> {
  const {rating,review,name,email}=data;

  if(rating===0){
    toast.error('Please add rating');
    return;
  }
  if(review.length<=10){
    toast.error('Your review must contain at least 5 words');
    return;
  }
  if(name.length===0){
    toast.error('Please enter name');
    return;
  }
  if(email.length===0){
    toast.error('Please enter email');
    return;
  }
  if (!email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")){
    toast.error('Enter Valid Email')
    return ;
  }
 
  else{
      REVIEW.addReview({ data }).then((res) => {
        console.log(res.data.data)
    if (res.status === 200) 
    {
      toast.success('Thankyou for your review !')
      setReviewItems([...reviewItems,res.data.data])
    } 
        else {
          toast.error(res.data.error.message)
          
        }
      });
    };
  }


 const onChange=(e)=>{
  setReview({...review,[e.target.name]:e.target.value})
 }



 const stripePromise=loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISH_KEY}`)

  const handlePayment=async()=>{
    if(size!=='' )
    {
      try {
        const stripe = await stripePromise;
        const data={...product,attributes:{...product.attributes,size:size,quantity:1,image:product.attributes.images.data[0].attributes.url}}
        const res = await makePaymentRequest.post("/api/orders", {email:useremail,
            products: [data],
        });
    
        await stripe.redirectToCheckout({
            sessionId: res.data.stripeSession.id,
        });
    } 
    catch (err) {
        console.log(err);
    }
    }
  else{
    toast.error('Please Select Size')
  }
}

 

// Get Data of Product
  useEffect(() => {
    if (shopId) {
      fetch(
        `http://localhost:1337/api/products/${shopId}?populate=category,images,sizes`)
        .then((response) => response.json())
        .then((data) => setProduct(data.data));
    }
  }, [shopId]);




  useEffect(() => {
    if (shopId) {
      fetch(
        `http://localhost:1337/api/ratings?filters[id_product]=${shopId}`)
        .then((response) => response.json())
        .then((data) => setReviewItems(data.data));
    }
  }, [shopId]);

// Get Cart Items

  useEffect(() => {
    if(logged_in){
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
}
  },[useremail,authtoken,dispatch,cart.length,logged_in])



  return (
    <>
      {Object.entries(product).length > 1 ? (
        <div className="ProductDescriptionBox" key={product.id}>
          <div className="ProductDescriptionBox1">
            <div className="ProductDescriptionBox1-Box1">
              <Carousel style={{ height: "400px" }} autoFocus={true}>
                {product.attributes.images.data.map((element) => (
                  <div key={element.id}>
                    <img
                      src={`${process.env.REACT_APP_SERVERNAME}${element.attributes.url}`}
                      alt="productImages"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="ProductDescriptionBox1-Box2">
              <h5
                style={{
                  fontFamily: "Abhaya",
                  fontWeight: "400",
                  fontSize: "20px",
                }}
              >
                {product.attributes.title}
              </h5>
              <h6
                style={{
                  fontFamily: "Abhaya",
                  fontWeight: "700",
                  fontSize: "30px",
                  color: "#737373",
                }}
              >
                Rs. {product.attributes.price}
              </h6>

              <p
                style={{
                  fontFamily: "poppins",
                  fontWeight: "300",
                  fontSize: "15px",
                  color: "#737373",
                  margin: "53px 0px",
                  display:'flex',
                  justifyContent:'flex-end'
                }}
              >
               Available Size
              </p>

              <div style={{ display: "flex", flexDirection: "row" }}>
                {product.attributes.sizes.data.map((element) => (
                  <button  onClick={()=>setSize(element.attributes.size)} className="Size-Box" key={element.id} style={{backgroundColor:(size===element.attributes.size)?'#E2BF44':'white',border:(size===element.attributes.size)?'none':'3px solid #959595'}}>
                    {element.attributes.size}
                  </button>
                ))}
              </div>

             {logged_in ? <div className="Shop-Button">
                <button
                  disabled={!product.attributes.instock}
                  className="Buy-Button"
                  style={{backgroundColor:(!product.attributes.instock)?'grey':"#E2BF44"}}
                  onClick={()=>{handlePayment()}}
                >
                 {(!product.attributes.instock)?'Out Of Stock':'Buy Now'}
                </button>
                <button
                  onClick={() => {
                    AddToCart({"email":useremail,
                     "title":product.attributes.title,
                     "price":product.attributes.price,
                     "category":product.attributes.category.data.attributes.category,
                     "id_product":product.id,
                     "image":`${product.attributes.images.data[0].attributes.url}`,
                     "quantity":1,
                     "size":size
                  },authtoken);
                  }}
                  disabled={!product.attributes.instock}
                  className="Shop-AddToCart">
                 {(!product.attributes.instock)?'Out Of Stock':'Add To Cart'}
                </button>
              </div>:
              <div className="Shop-Button">
                <button
                  onClick={() => {navigate(`/login`)}}
                  className="Buy-Button"
                  style={{backgroundColor:(!product.attributes.instock)?'grey':"#E2BF44"}}
                  >
                 Buy Now
                </button>
                <button
                  onClick={() => {navigate(`/login`)}}
                  className="Shop-AddToCart">
                Add To Cart
                </button>
              </div>}
            </div>
          </div>
          <div className="ProductDescriptionBox2">
            <div className="ProductDescriptionBox2-ProductBox">
              <h5 style={{  margin: "46px 0px" }}>
                Product Description
              </h5>
              <p style={{  fontSize: "12px", fontWeight: "300" }}>
                {product.attributes.description}
              </p>
              <h5 style={{  margin: "59px 0px 30px 0px" }}>
                Product Details
              </h5>
              <h5 >
                Material-{product.attributes.material}
              </h5>
              <h5 >Product Code-{product.id}</h5>
            </div>
          </div>
        </div>
      ) : (
        <>No Product Found</>
      )}


{Object.entries(product).length > 1 ? (<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',margin:'20px 0px 50px 0px'}}>
        <div style={{width:'80%',fontFamily:'Inter',font:'500'}}>
        <div style={{color:'black',fontWeight:"800"}}>PLEASE REVIEW "{product.attributes.title}"</div>
        <div style={{margin:'10px 0px'}}>Your email address will not be published. Required fields are marked *</div>
        <div>

        <div style={{width:'auto',margin:'0px 0px 10px 0px'}}>
          <label style={{display:'flex',flexDirection:'column'}}>
          <p style={{fontWeight:'600'}}>Your Rating <span style={{color:'red'}}>*</span></p>
          <Box sx={{'& > legend': { mt: 2 }}}>
      <Rating name="simple-controlled" value={value} onChange={(e, newValue) => {setValue(newValue);setReview({...review,rating:Number(e.target.value)})}}/>
      </Box>

        </label>
        </div> 

        <div style={{width:'100%',margin:'0px 0px 10px 0px'}}>
          <label style={{display:'flex',flexDirection:'column'}}>
          <p style={{fontWeight:'600'}}>Your Review <span style={{color:'red'}}>*</span></p>
            <textarea  className='review-Inputs' type='text' name='review' rows="4" onChange={onChange}/>
          </label>
        </div>

        <div className='Review-Box'>
        <div className='Review-Box-InnerBox'>
          <label style={{display:'flex',flexDirection:'column'}}>
          <p style={{fontWeight:'600'}}>Name <span style={{color:'red'}}>*</span></p>
            <input  className='review-Inputs Input-review' type='text' name='name' rows="4" onChange={onChange}/>
          </label>
        </div>

        <div  className='Review-Box-InnerBox'>
          <label style={{display:'flex',flexDirection:'column'}}>
            <p style={{fontWeight:'600'}}>Email <span style={{color:'red'}}>*</span></p>
            <input  className='review-Inputs Input-review' type='text' name='email' rows="4" onChange={onChange}/>
          </label>
        </div>

        </div>
        </div>
        <button className='Review-Button' onClick={()=>{validateForm(review)}}>Add Review</button>
        </div>
      </div>):<div style={{fontFamily:'Inter',fontSize:'20px',fontWeight:'600',margin:'30px 0px',display:'flex',justifyContent:'center',alignItems:'center'}}>Please Wait !</div>}
       
       
      <div className="container" style={{ width: "80%"}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'Inter',fontWeight:'600',fontSize:'30px',margin:'10px 0px'}}>Customer's Review</div>
            <div className="row">
              {reviewItems?.length > 0 ? (
                <>
                  {reviewItems.map((element) => {
                    return (
                      <div
                        style={{ position: "relative", cursor: "pointer"}}
                        className="col-md-4 my-3"
                        key={element.id}
                      >        

                          <div>
                            <div style={{fontFamily:'inter',fontSize:'20px',fontWeight:'600',color:'black',margin:'0px 0px 5px 0px'}}>
                              {element.attributes.name}
                            </div>
                            <div>
                              {
                                 <Rating name="read-only" value={element.attributes.rating} readOnly />
                              }
                            </div>
                            <p >
                              {element.attributes.review}
                            </p>
                          </div>
                        </div>
                    );
                  })}
                </>
              ) : (
               <div style={{fontFamily:'Inter',fontSize:'20px',fontWeight:'600',margin:'30px 0px',display:'flex',justifyContent:'center',alignItems:'center'}}>No Reviews</div>
              )}
            </div>
          </div>
      <YouMayLike />
    </>
  );
}

const mapStateToProps = (state) => ({
  useremail:state?.auth?.user?.user?.email,
  authtoken:state?.auth?.user?.jwt,
  logged_in:state?.auth?.logged_in,
  cart: state?.cart?.cartItems
});
export default connect(mapStateToProps)(memo(ShopId));
