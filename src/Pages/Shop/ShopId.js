import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import constants from "../../constants";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import './ShopId.css'
import YouMayLike from "../YouMayLike/YouMayLike";


function ShopId(props) {  
    const {shopId}=useParams()
    let [product, setProduct] = useState({});
    const dispatch = useDispatch()

    const AddToCart = (product) => {
        dispatch({
          type: constants("cart").reducers.cart.AddToCart,
          payload: { data: product },
        });
        toast.success("Product Added To Cart");
      };

    useEffect(() => {
        if(shopId){
        fetch(`http://localhost:1337/api/products/${shopId}?populate=category,images,sizes`)
          .then((response) => response.json())
          .then((data) => setProduct(data.data));
        }
      }, [shopId]);

      
  return (
    <>{Object.entries(product).length>1?
        <div className="ProductDescriptionBox" key={product.id}>
        <div className="ProductDescriptionBox1">
          <div className="ProductDescriptionBox1-Box1">
            <Carousel
              style={{ height: "400px"}}
              autoFocus={true}
            >
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

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "100px 0px 0px 0px",
              }}
            >
              <button
                style={{
                  backgroundColor: "#E2BF44",
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
                onClick={() => {
                  AddToCart(product);
                }}
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
            </div>
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
        :<>No Products Found</>
       
    
    }
    <YouMayLike/>
    </>
  );
}

export default ShopId;
