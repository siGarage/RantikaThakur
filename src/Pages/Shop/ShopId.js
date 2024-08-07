import { memo, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useParams } from "react-router-dom";
import CARTDATA from "../../API/Cart";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import "./ShopId.css";
import YouMayLike from "../YouMayLike/YouMayLike";
import CUSTOM from "../../API/Custom";
import constants from "../../constants";
import Rating from "@mui/material/Rating";
import REVIEW from "../../API/Review";
import WISHLIST from "../../API/Wishlist";
import Box from "@mui/material/Box";
import { loadStripe } from "@stripe/stripe-js";
import ImageZoom from "react-image-zooom";
import parse from "html-react-parser";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import sizeChart from "../../Images/size_chart.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Swiper, SwiperSlide } from "swiper/react";
import Cookies from "universal-cookie";

import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

function ShopId(props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [reviewItems, setReviewItems] = useState([]);
  const [showReviewSection, setShowReviewSection] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [csShow, setCsShow] = useState(false);
  const cookies = new Cookies(null, { path: "/" });
  const [customdata, setCustomData] = useState({
    name: "",
    email: "",
    phone: "",
    upperbust: "0",
    bust: "0",
    highwaist: "0",
    waist: "0",
    hip: "0",
    shoulder: "0",
    armhole: "0",
    sleevelength: "0",
    bicep: "0",
    fullLength: "0",
    pantskirtLength: "0",
  });
  const [size, setSize] = useState("");
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width:700px)").matches
  );
  const [mmatches, setMmatches] = useState(
    window.matchMedia("(max-width:395px)").matches
  );

  // Id Of Product
  const { shopId } = useParams();
  const [review, setReview] = useState({
    id_product: Number(shopId),
    rating: value,
    review: "",
    name: "",
    email: "",
  });
  const navigate = useNavigate();
  const { cart } = props;
  const WishCartID = (id) => {
    for (let item of wishlist) {
      if (Number(item?.attributes?.id_product) === Number(id)) {
        return Number(item?.id);
      }
    }
  };

  const DeleteFromWishlist = (id, authtoken) => {
    WISHLIST.deleteWishlistItems(id, authtoken).then((res) => {
      if (res?.status === 200) {
        const wishdata = wishlist.filter((ele) => ele?.id !== id);
        dispatch({
          type: constants("wishlist")?.reducers?.wishlist?.AddToWishlist,
          payload: { wishItems: wishdata },
        });
      }
    });
  };
  let wishlist = props.wishlist;
  let [product, setProduct] = useState({});

  let [csize, setCsize] = useState(false);
  const { logged_in, useremail, username, authtoken } = props;

  // Add Data To Cart
  const AddToCart = (data) => {
    if (data.size !== "") {
      const findData = cart.find(
        (element) =>
          Number(element?.attributes.id_product) === Number(data.id_product) &&
          String(element?.attributes.size) === String(data.size)
      );
      if (findData) {
        const findProductPrice =
          Number(findData?.attributes.price) + Number(data.price);
        const findProductQuantity = Number(findData?.attributes.quantity) + 1;
        updateProduct(findData.id, findProductPrice, findProductQuantity);
      } else {
        CARTDATA.addCartItems(data, authtoken).then((res) => {
          if (res.status === 200) {
            if (csize) {
              let customSize = {
                ...customdata,
                cart_id: res?.data?.data?.id?.toString(),
              };
              CUSTOM.message({ data: customSize }).then((res) => {
                if (res.status === 200) {
                  toast.success("Your Message Is Sent SuccessFully ! ");
                } else {
                  toast.error(res.data.error.message);
                }
              });
            }
            dispatch({
              type: constants("cart").reducers.cart.AddToCart,
              payload: { cartItems: [...cart, res.data.data] },
            });
            toast.success("Item Added To Cart !");
          }
        });
      }
    } else {
      toast.error("Please Select Size !");
    }
  };
  const AddToCartAfterLogin = (data) => {
    if (data.size !== "") {
      localStorage.setItem("cart", JSON.stringify(data));
      navigate("/login");
    } else {
      toast.error("Please Select Size !");
    }
  };

  const BuyAddToCart = (data) => {
    if (data.size !== "") {
      const findData = cart.find(
        (element) =>
          Number(element?.attributes.id_product) === Number(data.id_product) &&
          String(element?.attributes.size) === String(data.size)
      );
      if (findData) {
        const findProductPrice =
          Number(findData?.attributes.price) + Number(data.price);
        const findProductQuantity = Number(findData?.attributes.quantity) + 1;
        updateProduct(findData.id, findProductPrice, findProductQuantity);
      } else {
        CARTDATA.addCartItems(data, authtoken).then((res) => {
          if (res.status === 200) {
            dispatch({
              type: constants("cart").reducers.cart.AddToCart,
              payload: { cartItems: [...cart, res.data.data] },
            });
            navigate("/cart");
            toast.success("Item Added To Cart !");
          }
        });
      }
    } else {
      toast.error("Please Select Size !");
    }
  };

  // Add to Wishlist functionality
  const AddToWishlist = (data) => {
    const findData = wishlist.find(
      (element) =>
        Number(element?.attributes?.id_product) === Number(data?.id_product)
    );
    if (findData) {
      toast.success("Item Already In Wishlist!");
    } else {
      WISHLIST.addWishlistItems(data, authtoken).then((res) => {
        if (res.status === 200) {
          dispatch({
            type: constants("wishlist")?.reducers?.wishlist?.AddToWishlist,
            payload: { wishItems: [...wishlist, res?.data?.data] },
          });
        }
      });
    }
  };
  const updateProduct = (cartId, price, quantity) => {
    const data = { price, quantity };
    CARTDATA.updateCart(cartId, data, authtoken).then((res) => {
      if (res.status === 200) {
        const something = cart.filter((ele) => ele.id !== cartId);
        dispatch({
          type: constants("cart").reducers.cart.AddToCart,
          payload: { cartItems: [...something, res.data.data] },
        });
        toast.success("Item Added To Cart !");
      }
    });
  };

  // Review Form

  let validateForm = (data) => {
    const { rating, review, name, email } = data;
    data = {
      ...data,
      email: useremail,
      name: username,
    };
    if (rating === 0) {
      toast.error("Please add rating");
      return;
    }
    if (review.length <= 10) {
      toast.error("Your review must contain at least 5 words");
      return;
    } else {
      setShowReviewSection(false);
      REVIEW.addReview({ data }).then((res) => {
        if (res.status === 200) {
          toast.success("Thankyou for your review !");
          setReviewItems([...reviewItems, res.data.data]);
        } else {
          toast.error(res.data.error.message);
        }
      });
    }
  };

  const onChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const stripePromise = loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLISH_KEY}`
  );

  // const handlePayment = async () => {
  //   if (size !== "") {
  //     try {
  //       const stripe = await stripePromise;
  //       const data = {
  //         ...product,
  //         attributes: {
  //           ...product?.attributes,
  //           size: size,
  //           quantity: 1,
  //           image: product?.attributes.images.data[0].attributes.url,
  //         },
  //       };
  //       const res = await makePaymentRequest.post("/api/orders", {
  //         email: useremail,
  //         stripeId: "testId",
  //       });

  //       await stripe.redirectToCheckout({
  //         sessionId: res.data.stripeSession.id,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     toast.error("Please Select Size");
  //   }
  // };
  // Function to serialize an object to a JSON string
  const serializeObject = (obj) => JSON.stringify(obj);

  // Function to deserialize a JSON string to an object
  const deserializeObject = (str) => JSON.parse(str);

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(
      value
    )};expires=${expires.toUTCString()};path=/`;
  };
  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName.trim() === name) {
        return deserializeObject(decodeURIComponent(cookieValue));
      }
    }
    return null;
  };
  let validateCForm = (data) => {
    const { email, name, phone } = data;
    if (!name) {
      toast.error("Please Enter Name");
      return;
    }
    if (!email) {
      toast.error("Please Enter Email");
      return;
    }
    if (!phone) {
      toast.error("Please Enter Phone Number");
      return;
    } else {
      setSize("custom");
      setCsize(true);
      setCsShow(false);
    }
  };
  // Get Data of Product
  useEffect(() => {
    window
      .matchMedia("(max-width:700px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    window
      .matchMedia("(max-width:395px)")
      .addEventListener("change", (e) => setMmatches(e.matches));
    if (shopId) {
      fetch(
        `${process.env.REACT_APP_SERVERNAME}/api/products/${shopId}?populate=category,images,sizes`
      )
        .then((response) => response.json())
        .then((data) => setProduct(data.data));
    }
  }, [shopId]);
  const [imageShow, setImageShow] = useState("");
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  let wistItemsId = wishlist.map((element) =>
    Number(element?.attributes?.id_product)
  );
  const onCSChange = (e) => {
    setCustomData({ ...customdata, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (shopId) {
      fetch(
        `${process.env.REACT_APP_SERVERNAME}/api/ratings?filters[id_product]=${shopId}`
      )
        .then((response) => response.json())
        .then((data) => setReviewItems(data.data));
    }
  }, [shopId]);

  // Get Cart Items

  useEffect(() => {
    if (logged_in) {
      if (cart.length === 0) {
        CARTDATA.getCartItems(useremail, authtoken).then((res) => {
          if (res.status === 200) {
            dispatch({
              type: constants("cart").reducers.cart.AddToCart,
              payload: { cartItems: res.data.data },
            });
          } else {
            toast.error("Server Side Error");
          }
        });
      }
    }
  }, [useremail, authtoken, dispatch, cart.length, logged_in]);

  return (
    <>
      {Object.entries(product).length > 1 ? (
        <div className="ProductDescriptionBox" key={product?.id}>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              {/* <Modal.Title id="example-modal-sizes-title-lg">
                SIZE CHART
              </Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              <img
                src={sizeChart}
                width={`${matches ? 390 : 770}`}
                height={500}
              />
            </Modal.Body>
          </Modal>
          <Modal
            size="xl"
            show={csShow}
            onHide={() => setCsShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                CUSTOM SIZE
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="w-100 custom">
                <p
                  className="Custom-Size-Text"
                  style={{
                    width: "100%",
                    textAlign: "center",
                    margin: "0px 0px 40px 0px",
                  }}
                >
                  If you're unable to find your size in our standard chart, fill
                  in the measurements form below with all your details and your
                  order shall be processed accordingly.{" "}
                </p>
                <div className="Custom-Box-InnerBox">
                  <div className="Custom-Box3">
                    <div className="Custom-Box3-Box">
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Name
                        <input
                          name="name"
                          onChange={onCSChange}
                          type="text"
                          placeholder="Enter your name"
                          required
                        />
                      </label>
                    </div>
                    <div className="Custom-Box3-Box">
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Contact No.
                        <input
                          placeholder="Enter your phone number"
                          name="phone"
                          onChange={onCSChange}
                          type="text"
                          required
                        />
                      </label>
                    </div>
                    <div className="Custom-Box3-Box">
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Email
                        <input
                          placeholder="Enter your E-mail"
                          name="email"
                          onChange={onCSChange}
                          type="email"
                          required
                        />
                      </label>
                    </div>
                  </div>
                  <div className="Custom-Box3">
                    <div className="Custom-Box4-Box">
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Upper Bust
                        <input
                          name="upperbust"
                          onChange={onCSChange}
                          placeholder="Upper Bust"
                          type="number"
                        />
                      </label>
                    </div>
                    <div className="Custom-Box4-Box">
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Bust
                        <input
                          name="bust"
                          onChange={onCSChange}
                          placeholder="Bust"
                          type="number"
                        />
                      </label>
                    </div>
                    <div className="Custom-Box4-Box">
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Full Length
                        <input
                          name="fullLength"
                          onChange={onCSChange}
                          type="number"
                          placeholder="Full Length"
                        />
                      </label>
                    </div>
                    <div className="Custom-Box4-Box">
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        High Waist
                        <input
                          name="highwaist"
                          onChange={onCSChange}
                          placeholder="High Waist"
                          type="number"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="Custom-Box3">
                    <div className="Custom-Box4-Box">
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Waist
                        <input
                          name="waist"
                          onChange={onCSChange}
                          placeholder="Waist"
                          type="number"
                        />
                      </label>
                    </div>
                    <div className="Custom-Box4-Box">
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Hip
                        <input
                          name="hip"
                          onChange={onCSChange}
                          placeholder="Hip"
                          type="number"
                        />
                      </label>
                    </div>
                    <div className="Custom-Box4-Box">
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Pant/Skirt Length
                        <input
                          name="pantskirtLength"
                          onChange={onCSChange}
                          type="number"
                          placeholder="Full Length"
                        />
                      </label>
                    </div>
                    <div className="Custom-Box4-Box">
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Shoulder
                        <input
                          name="shoulder"
                          onChange={onCSChange}
                          placeholder="Shoulder"
                          type="number"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="Custom-Box3 pe-1">
                      <div className="Custom-Box7-Box">
                        <label
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          Armhole
                          <input
                            name="armhole"
                            onChange={onCSChange}
                            type="number"
                            placeholder="Armhole"
                          />
                        </label>
                      </div>
                      <div className="Custom-Box7-Box ">
                        <label
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          Sleeve Length
                          <input
                            name="sleevelength"
                            onChange={onCSChange}
                            type="number"
                            placeholder="Sleeve Length"
                          />
                        </label>
                      </div>
                      <div className="Custom-Box7-Box">
                        <label
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          Bicep
                          <input
                            name="bicep"
                            onChange={onCSChange}
                            type="number"
                            placeholder="Bicep"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="Custom-Box">
                    <div className="Custom-Box5-Box">
                      <button
                        className="Custom-Submit-Button"
                        onClick={() => validateCForm(customdata)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <div className="ProductDescriptionBox1">
            <div className="ProductDescriptionBox1-Box1 flex-column">
              <ImageZoom
                src={
                  imageShow.length > 0
                    ? `${process.env.REACT_APP_SERVERNAME}${imageShow}`
                    : `${process.env.REACT_APP_SERVERNAME}${product.attributes?.images?.data[0]?.attributes?.url}`
                }
                zoom="200"
                width={matches ? "360px" : "380px"}
                height="540px"
              />
              {matches ? (
                <div className="container">
                  <div className="row w-100">
                    {product?.attributes?.images?.data?.map((element) => (
                      <div key={element?.id} className="col-4">
                        <img
                          src={`${process.env.REACT_APP_SERVERNAME}${element?.attributes?.url}`}
                          alt="productImages"
                          style={{
                            height: "180px",
                            width: "120px",
                            cursor: "pointer",
                          }}
                          className="ps-2 pt-3"
                          onClick={() => setImageShow(element?.attributes?.url)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  {product?.attributes?.images?.data?.map((element) => (
                    <div key={element?.id} className="d-flex">
                      <img
                        src={`${process.env.REACT_APP_SERVERNAME}${element?.attributes?.url}`}
                        alt="productImages"
                        style={{
                          height: "180px",
                          width: "120px",
                          cursor: "pointer",
                        }}
                        className="ps-2 pt-3"
                        onClick={() => setImageShow(element?.attributes?.url)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="ProductDescriptionBox1-Box2">
              <h5
                style={{
                  fontFamily: "Abhaya",
                  fontWeight: "400",
                  fontSize: "24px",
                  color: "rbg(0,0,0)",
                }}
              >
                {product?.attributes?.title}
              </h5>
              <h6
                style={{
                  fontFamily: "Abhaya",
                  fontWeight: "700",
                  fontSize: "30px",
                  color: "rbg(0,0,0)",
                  marginTop: "20px",
                }}
              >
                ₹ {numberWithCommas(product?.attributes?.price)}
              </h6>

              <p className="sizeGuide">Size Guide</p>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setLgShow(true)}
              >
                <svg
                  width="32"
                  height="16"
                  viewBox="0 0 32 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0V16H32V0H0ZM2 2H5V9H7V2H9V6H11V2H13V9H15V2H17V6H19V2H21V9H23V2H25V6H27V2H30V14H2V2Z"
                    fill="#000000"
                  />
                </svg>
              </div>
              {mmatches ? (
                wistItemsId.includes(product?.id) ? (
                  <div className="heart">
                    <FavoriteIcon
                      style={{ color: "red" }}
                      onClick={() => {
                        DeleteFromWishlist(WishCartID(product?.id), authtoken);
                      }}
                    ></FavoriteIcon>
                  </div>
                ) : (
                  <div className="heart">
                    <FavoriteBorderIcon
                      onClick={() => {
                        AddToWishlist(
                          {
                            email: useremail,
                            title: product?.attributes?.title,
                            price: product?.attributes?.price,
                            category:
                              product?.attributes?.category?.data?.attributes
                                ?.category,
                            id_product: product.id,
                            image: `${product?.attributes?.images?.data[0]?.attributes?.url}`,
                            size: product?.attributes?.sizes?.data.map(
                              (element) => element?.attributes?.size
                            ),
                          },
                          authtoken
                        );
                      }}
                    ></FavoriteBorderIcon>
                  </div>
                )
              ) : (
                ""
              )}
              <p
                style={
                  mmatches
                    ? {
                        fontFamily: "poppins",
                        fontWeight: "300",
                        fontSize: "15px",
                        color: "rbg(0,0,0)",
                        display: "flex",
                        justifyContent: "flex-end",
                      }
                    : {
                        fontFamily: "poppins",
                        fontWeight: "300",
                        fontSize: "15px",
                        color: "rbg(0,0,0)",
                        margin: "24px 0px 8px 0px",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "50px",
                      }
                }
              >
                Available Size
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                }}
              >
                <button
                  // onClick={() => {
                  //   navigateToCustomePage();
                  // }}
                  onClick={() => setCsShow(true)}
                  className="C-Sizebox"
                  key="12345678646342"
                  style={{
                    backgroundColor: csize == true ? "#E2BF44" : "white",
                    border: csize == true ? "none" : "1px solid #0000000",
                    // width: "20%",
                    color: "black",
                  }}
                >
                  Custome Size
                </button>
                {product?.attributes?.sizes?.data?.map((element) => (
                  <button
                    onClick={() => setSize(element?.attributes?.size)}
                    className="Size-Box"
                    key={element?.id}
                    style={{
                      backgroundColor:
                        size === element?.attributes?.size
                          ? "#E2BF44"
                          : "white",
                      border:
                        size === element?.attributes?.size
                          ? "none"
                          : "1px solid #000000",
                      color: "black",
                    }}
                  >
                    {element?.attributes?.size}
                  </button>
                ))}
              </div>

              {logged_in ? (
                <div className="Shop-Button">
                  <button
                    onClick={() => {
                      AddToCart(
                        {
                          email: useremail,
                          title: product?.attributes?.title,
                          price: product?.attributes?.price,
                          category:
                            product?.attributes?.category?.data?.attributes
                              ?.category,
                          id_product: product?.id,
                          image: `${product?.attributes?.images?.data[0]?.attributes?.url}`,
                          quantity: 1,
                          size: size,
                        },
                        authtoken
                      );
                    }}
                    disabled={!product?.attributes?.instock}
                    className="Shop-AddToCart"
                  >
                    {!product?.attributes?.instock
                      ? "Out Of Stock"
                      : "Add To Cart"}
                  </button>
                  <button
                    disabled={!product?.attributes?.instock}
                    className="Buy-Button"
                    style={{
                      backgroundColor: !product?.attributes?.instock
                        ? "grey"
                        : "#E2BF44",
                    }}
                    onClick={() => {
                      BuyAddToCart(
                        {
                          email: useremail,
                          title: product?.attributes?.title,
                          price: product?.attributes?.price,
                          category:
                            product?.attributes?.category?.data?.attributes
                              ?.category,
                          id_product: product?.id,
                          image: `${product?.attributes?.images?.data[0]?.attributes?.url}`,
                          quantity: 1,
                          size: size,
                        },
                        authtoken
                      );
                    }}
                  >
                    {!product?.attributes?.instock ? "Out Of Stock" : "Buy Now"}
                  </button>
                  {!mmatches ? (
                    wistItemsId.includes(product?.id) ? (
                      <div className="heart">
                        <FavoriteIcon
                          style={{ color: "red" }}
                          onClick={() => {
                            DeleteFromWishlist(
                              WishCartID(product?.id),
                              authtoken
                            );
                          }}
                        ></FavoriteIcon>
                      </div>
                    ) : (
                      <div className="heart">
                        <FavoriteBorderIcon
                          onClick={() => {
                            AddToWishlist(
                              {
                                email: useremail,
                                title: product?.attributes?.title,
                                price: product?.attributes?.price,
                                category:
                                  product?.attributes?.category?.data
                                    ?.attributes?.category,
                                id_product: product.id,
                                image: `${product?.attributes?.images?.data[0]?.attributes?.url}`,
                                size: product?.attributes?.sizes?.data.map(
                                  (element) => element?.attributes?.size
                                ),
                              },
                              authtoken
                            );
                          }}
                        ></FavoriteBorderIcon>
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className="Shop-Button">
                  <button
                    onClick={() => {
                      AddToCartAfterLogin({
                        title: product?.attributes?.title,
                        price: product?.attributes?.price,
                        category:
                          product?.attributes?.category?.data?.attributes
                            ?.category,
                        id_product: product?.id,
                        image: `${product?.attributes?.images?.data[0]?.attributes?.url}`,
                        quantity: 1,
                        size: size,
                      });
                    }}
                    className="Shop-AddToCart"
                  >
                    {!product?.attributes?.instock
                      ? "Out Of Stock"
                      : "Add To Cart"}
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/login`);
                    }}
                    className="Buy-Button"
                    style={{
                      backgroundColor: !product?.attributes?.instock
                        ? "grey"
                        : "#E2BF44",
                    }}
                  >
                    {!product?.attributes?.instock ? "Out Of Stock" : "Buy Now"}
                  </button>
                  <div className="heart">
                    <FavoriteBorderIcon
                      onClick={() => {
                        navigate(`/login`);
                      }}
                    ></FavoriteBorderIcon>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="ProductDescriptionBox2">
            <div className="col-6"></div>
            <div className="ProductDescriptionBox2-ProductBox">
              <h5 style={{ margin: "46px 0px 25px 0px" }}>
                Product Description
              </h5>
              <div style={{ fontSize: "15px", fontFamily: "sans-serif" }}>
                {parse(`${product?.attributes?.description}`)}
              </div>
              <div
                className="container d-flex justify-content-between"
                style={{
                  width: "100%",
                  border: "1px solid rgb(222 217 217)",
                  borderRadius: "4px",
                  marginTop: "40px",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {reviewItems.length > 0 ? (
                  <div className="d-flex w-100 flex-column">
                    <div className="d-flex w-100">
                      <div className="col-8 d-flex justify-content-start">
                        <div
                          className="cR"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "Inter",
                            fontWeight: "400",
                            margin: "5px 0px",
                          }}
                        >
                          Customer Review
                        </div>
                      </div>
                      <div
                        className="w-50 d-flex justify-content-end pt-1"
                        style={{
                          fontFamily: "Inter",
                          fontSize: "15px",
                          fontWeight: "400",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <a
                          onClick={() =>
                            showReviewSection == false
                              ? setShowReviewSection(true)
                              : setShowReviewSection(false)
                          }
                        >
                          Write Review
                        </a>
                      </div>
                    </div>

                    {reviewItems?.map((element) => {
                      return (
                        <div className="row w-100 text-start">
                          <div className="w-100 col-12 d-flex flex-column justify-content-start">
                            <div className="d-flex">
                              <div className="Profile-Box-Text negativeMargin">
                                {element?.attributes?.name
                                  ?.slice(0, 1)
                                  .toUpperCase()}
                              </div>
                              <div
                                style={{
                                  fontFamily: "inter",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  color: "black",
                                  margin: "0px 0px 5px 0px",
                                }}
                              >
                                {element?.attributes?.name}
                              </div>
                            </div>
                            <div>
                              {
                                <Rating
                                  name="read-only"
                                  value={element?.attributes?.rating}
                                  readOnly
                                />
                              }
                            </div>
                            <p>{element?.attributes?.review}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="d-flex w-100 flex-column justufy-content-start text-start">
                    <div className="w-100">
                      <div
                        className="cR"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "Inter",
                          fontWeight: "400",
                          margin: "5px 0px",
                        }}
                      >
                        Customer Review
                      </div>
                    </div>
                    <div className="w-100 d-flex">
                      <div className="w-50">
                        <div
                          style={{
                            fontFamily: "Inter",
                            fontSize: "15px",
                            fontWeight: "400",
                            margin: "10px 0px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          No Reviews
                        </div>
                      </div>
                      <div className="w-50 text-end">
                        <div
                          className="text-end pt-2 d-flex justify-content-end"
                          style={{
                            fontFamily: "Inter",
                            fontSize: "15px",
                            fontWeight: "400",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <a
                            onClick={() =>
                              showReviewSection == false
                                ? setShowReviewSection(true)
                                : setShowReviewSection(false)
                            }
                          >
                            Write Review
                          </a>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>No Product Found</>
      )}

      {Object.entries(product)?.length > 1 ? (
        showReviewSection ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: "20px 0px 50px 0px",
            }}
          >
            <div style={{ width: "80%", fontFamily: "Inter", font: "500" }}>
              <div style={{ color: "black", fontWeight: "800" }}>
                PLEASE REVIEW "{product?.attributes?.title}"
              </div>
              <div style={{ margin: "10px 0px" }}>
                Your email address will not be published. Required fields are
                marked *
              </div>
              <div>
                <div style={{ width: "auto", margin: "0px 0px 10px 0px" }}>
                  <label style={{ display: "flex", flexDirection: "column" }}>
                    <p style={{ fontWeight: "600" }}>
                      Your Rating <span style={{ color: "red" }}>*</span>
                    </p>
                    <Box sx={{ "& > legend": { mt: 2 } }}>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(e, newValue) => {
                          setValue(newValue);
                          setReview({
                            ...review,
                            rating: Number(e.target.value),
                          });
                        }}
                      />
                    </Box>
                  </label>
                </div>

                <div style={{ width: "100%", margin: "0px 0px 10px 0px" }}>
                  <label style={{ display: "flex", flexDirection: "column" }}>
                    <p style={{ fontWeight: "600" }}>
                      Your Review <span style={{ color: "red" }}>*</span>
                    </p>
                    <textarea
                      className="review-Inputs"
                      type="text"
                      name="review"
                      rows="4"
                      onChange={onChange}
                      placeholder="Enter your review ..."
                    />
                  </label>
                </div>
              </div>
              <button
                className="Review-Button"
                onClick={() => {
                  validateForm(review);
                }}
              >
                Add Review
              </button>
            </div>
          </div>
        ) : (
          ""
        )
      ) : (
        <div
          style={{
            fontFamily: "Inter",
            fontSize: "20px",
            fontWeight: "600",
            margin: "30px 0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Please Wait !
        </div>
      )}

      <YouMayLike />
    </>
  );
}

const mapStateToProps = (state) => ({
  useremail: state?.auth?.user?.user?.email,
  username: state?.auth?.user?.user?.username,
  authtoken: state?.auth?.user?.jwt,
  logged_in: state?.auth?.logged_in,
  cart: state?.cart?.cartItems,
  wishlist: state?.wishlist?.wishItems,
});
export default connect(mapStateToProps)(memo(ShopId));
