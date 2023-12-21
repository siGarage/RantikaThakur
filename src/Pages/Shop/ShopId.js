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

function ShopId(props) {
  const dispatch=useDispatch()
  
  // Id Of Product
  const { shopId } = useParams();


  const navigate=useNavigate()

  const {cart}=props;

  let [product, setProduct] = useState({});

  const {logged_in}=props;
 
  // If logged_in is true then set useremail and authtoken
  if(logged_in){
    var useremail=props.user.user.email;
    var authtoken=props.user.jwt
  }


  // Add Data To Cart
 const AddToCart = (data) => { 
 const findData=cart.find((element)=>Number(element.attributes.id_product)===Number(data.id_product))
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
  };

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

// Get Data of Product
  useEffect(() => {
    if (shopId) {
      fetch(
        `http://localhost:1337/api/products/${shopId}?populate=category,images,sizes`)
        .then((response) => response.json())
        .then((data) => setProduct(data.data));
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
                }}
              >
                Size Guide
              </p>

              <div style={{ display: "flex", flexDirection: "row" }}>
                {product.attributes.sizes.data.map((element) => (
                  <div className="Size-Box" key={element.id}>
                    {element.attributes.size}
                  </div>
                ))}
              </div>

             {logged_in ? <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "100px 0px 0px 0px",
                }}
              >
                <button
                  disabled={!product.attributes.instock}
                  style={{
                    backgroundColor:(!product.attributes.instock)?'grey':"#E2BF44",
                    width: "230px",
                    height: "77px",
                    border: "none",
                    borderRadius: "72px",
                    fontFamily: "Inter",
                    color: "white",
                    fontSize: "32px",
                  }}
                  
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
                     "quantity":1
                  },authtoken);
                  }}
                  disabled={!product.attributes.instock}
                  style={{
                    backgroundColor: "white",
                    width: "267px",
                    height: "77px",
                    border: "1px solid black",
                    borderRadius: "72px",
                    fontFamily: "Inter",
                    color: "black",
                    fontSize: "32px",
                    cursor: "pointer",
                  }}
                >
                 {(!product.attributes.instock)?'Out Of Stock':'Add To Cart'}
                </button>
              </div>:<div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "100px 0px 0px 0px",
                }}
              >
                <button
                  onClick={() => {navigate(`/login`)}}
                  style={{
                    backgroundColor:(!product.attributes.instock)?'grey':"#E2BF44",
                    width: "230px",
                    height: "77px",
                    border: "none",
                    borderRadius: "72px",
                    fontFamily: "Inter",
                    color: "white",
                    fontSize: "32px",
                  }}
                  
                >
                 Buy Now
                </button>
                <button
                  onClick={() => {navigate(`/login`)}}
                  style={{
                    backgroundColor: "white",
                    width: "267px",
                    height: "77px",
                    border: "1px solid black",
                    borderRadius: "72px",
                    fontFamily: "Inter",
                    color: "black",
                    fontSize: "32px",
                    cursor: "pointer",
                  }}
                >
                Add To Cart
                </button>
              </div>}
            </div>
          </div>
          <div className="ProductDescriptionBox2">
            <div style={{ width: "50%", padding: "0px 100px 0px 0px" }}>
              <h5 style={{ width: "60%", margin: "46px 0px" }}>
                Product Description
              </h5>
              <p style={{ width: "60%", fontSize: "12px", fontWeight: "300" }}>
                {product.attributes.description}
              </p>
              <h5 style={{ width: "60%", margin: "59px 0px 30px 0px" }}>
                Product Details
              </h5>
              <h5 style={{ width: "60%" }}>Size-</h5>
              <h5 style={{ width: "60%" }}>
                Material-{product.attributes.material}
              </h5>
              <h5 style={{ width: "60%" }}>Product Code-{product.id}</h5>
            </div>
          </div>
        </div>
      ) : (
        <>No Products Found</>
      )}
      <YouMayLike />
    </>
  );
}

const mapStateToProps = (state) => ({
  user:state.auth.user,
  logged_in:state.auth.logged_in,
  cart: state.cart.cartItems
});
export default connect(mapStateToProps)(memo(ShopId));
