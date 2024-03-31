import { memo, useEffect, useId, useState, useRef } from "react";
import "./Cart.css";
import { connect, useDispatch } from "react-redux";
import constants from "../../constants";
import { toast } from "react-toastify";
import YouMayLike from "../YouMayLike/YouMayLike";
import emailjs from "@emailjs/browser";
import PAYMENT from "../../API/Payment";
import ORDER from "../../API/Order";
import CARTDATA from "../../API/Cart";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
function Cart(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let address = props.user.user.address;
  const buttonRef = useRef(null);
  const [lgShow, setLgShow] = useState(false);
  const [price, setPrice] = useState(0);
  const [ids, setIds] = useState([]);
  const form = useRef();
  // const client = new SMTPClient({
  //   user: "user",
  //   password: "password",
  //   host: "smtp.your-email.com",
  // });
  let userid = props.user.user.id;
  let username = props.user.user.name;
  const [addressList, setAddressList] = useState([address || ""]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [full_Address, setAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [order_final_address, setOrderFinalAddress] = useState("");
  const [order_final_phone, setOrderFinalPhone] = useState("");
  const [order_final_pin, setOrderFinalPin] = useState("");
  const [order_final_name, setOrderFinalName] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  const [customCart, setCustomCart] = useState("");
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_f4cfons", "template_x7kla0g", form.current, {
        publicKey: "ZCGsvRJF6uxDcjRLo",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  const { cart, useremail, authtoken } = props;
  // Function to handle changes in the radio selection
  const handleOptionChange = (event) => {
    // setSelectedOption(event.target.value);
    let final_address = full_Address.filter(
      (item) => item.attributes.address == event.target.value
    );
    setSelectedOption(event.target.value);
    setOrderFinalAddress(final_address[0].attributes.address);
    setOrderFinalPhone(final_address[0].attributes.phone);
    setOrderFinalPin(final_address[0].attributes.pin);
    setOrderFinalName(final_address[0].attributes.name);
  };

  const handleNewAddressChange = () => {
    navigate("/profile");
  };

  const handleFinalPayment = (e) => {
    buttonRef.current.click();
    if (selectedOption?.length > 0) {
      let data = {
        amount: price * 100.0,
        currency: "INR",
      };
      const res = ORDER.order(data, authtoken).then((res) => {
        if (res.status === 200) {
          const order = res.data;
          var options = {
            key: "rzp_live_91L6FV1TyEcyhT", // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: order.currency,
            name: "Rantika Thakur Clothing", //your business name
            description: "Test Transaction",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
              const body = {
                ...response,
                address: order_final_address,
                phone: order_final_phone,
                pin: order_final_pin,
                name: order_final_name,
                amount: price,
                ids: ids,
                email: useremail,
              };
              const validateRes = PAYMENT.payment(body, authtoken).then(
                (res) => {
                  setLgShow(false);
                  ids.map(async (id) => {
                    CARTDATA.deleteCartItems(id, authtoken).then((res) => {
                      if (res.status === 200) {
                        window.location.href = "/order";
                      }
                    });
                  });
                }
              );
            },
            // prefill: {
            //   //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            //   name: "Web Dev Matrix", //your customer's name
            //   email: "webdevmatrix@example.com",
            //   contact: "9000000000", //Provide the customer's phone number for better conversion rates
            // },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
          var rzp1 = new window.Razorpay(options);
          rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
          });
          rzp1.open();
        } else {
          toast.error("Server Side Error");
        }
      });
      try {
      } catch (err) {
        console.log(err);
      }
    } else {
      if (full_Address?.length > 0) {
        toast.error("Choose Shipping Address .");
      } else {
        navigate("/profile");
      }
    }
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  // Delete Items From Cart
  const DeleteFromCart = (id, authtoken) => {
    CARTDATA.deleteCartItems(id, authtoken).then((res) => {
      if (res.status === 200) {
        const cartdata = cart.filter((ele) => ele.id !== id);
        dispatch({
          type: constants("cart").reducers.cart.AddToCart,
          payload: { cartItems: cartdata },
        });
        toast.success("Item Deleted Successfully !");
      }
    });
  };

  // Update
  const Increment = (cartId, priceold, quantityold) => {
    const priceofone = priceold / quantityold;
    const price = Number(priceold) + Number(priceofone);
    setPrice(price < 5000 ? price + 99 : price);
    const quantity = Number(quantityold) + 1;
    const data = { price, quantity };
    const cartData = cart.map((element) => {
      if (cartId === element.id) {
        return {
          ...element,
          attributes: {
            ...element?.attributes,
            ...data,
          },
        };
      }
      return element;
    });

    CARTDATA.updateCart(cartId, data, authtoken).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: constants("cart").reducers.cart.AddToCart,
          payload: { cartItems: cartData },
        });
      }
    });
  };

  const Decrement = (cartId, priceold, quantityold) => {
    const priceofone = priceold / quantityold;
    const price =
      quantityold > 1
        ? Number(priceold) - Number(priceofone)
        : Number(priceofone);
    setPrice(price < 5000 ? price + 99 : price);
    const quantity = quantityold > 1 ? Number(quantityold) - 1 : 1;
    const data = { price, quantity };
    const cartData = cart.map((element) => {
      if (cartId === element.id) {
        return {
          ...element,
          attributes: {
            ...element?.attributes,
            ...data,
          },
        };
      }
      return element;
    });
    if (quantity >= 1) {
      CARTDATA.updateCart(cartId, data, authtoken).then((res) => {
        if (res.status === 200) {
          dispatch({
            type: constants("cart").reducers.cart.AddToCart,
            payload: { cartItems: cartData },
          });
        }
      });
    }
  };
  // Get Cart Items

  useEffect(() => {
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
    if (cart.length > 0) {
      let finalPrice = cart
        .map((element) => Number(element?.attributes.price))
        .reduce((accumulator, currentValue) => accumulator + currentValue);
      setPrice(finalPrice < 5000 ? finalPrice + 99 : finalPrice);
      let datacustomId = cart.filter(
        (item) => item.attributes.size == "custom"
      );
      if (datacustomId.length > 0) {
        fetch(
          `${process.env.REACT_APP_SERVERNAME}/api/custom-sizes?filters[cart_id]=${datacustomId[0]?.id}`
        )
          .then((response) => response.json())
          .then((data) => {
            let mainData = data.data;
            setClientMessage(`
            Dear ${username}, thank you for shopping at The Rantika Thakur Clothing! Your order has confirmed.
            Product Name:${datacustomId[0].attributes.title}
            Sizes
            Armhole:${mainData[0]?.attributes?.armhole}
            High-waist:${mainData[0]?.attributes?.highwaist}
            Full-length:${mainData[0]?.attributes?.fullLength}
            Hip:${mainData[0]?.attributes?.hip}
            Pant-Skir-Length:${mainData[0]?.attributes?.pantskirtLength}
            Shoulder:${mainData[0]?.attributes?.shoulder}
            Sleeve-length:${mainData[0]?.attributes?.sleevelength}
            Upper-bust: ${mainData[0]?.attributes?.upperbust}
            Waist:${mainData[0]?.attributes?.waist}
            Bicep:${mainData[0]?.attributes?.bicep}
            Bust:${mainData[0]?.attributes?.bust}
            `);
          });
      } else {
        setClientMessage(`Dear ${username}, thank you for shopping at The Rantika Thakur Clothing! Your order has confirmed.
        Product Name:${cart[0].attributes.title}
        Price:${finalPrice} `);
      }
    }
    if (cart.length > 0) {
      const newValues = cart.map((item) => item.id);
      setIds((prevArray) => [...prevArray, ...newValues]);
    }
    if (userid) {
      fetch(
        `${process.env.REACT_APP_SERVERNAME}/api/users-shipping-details?filters[userId]=${userid}`
      )
        .then((response) => response.json())
        .then((data) => setAddress(data.data));
    }
  }, [useremail, authtoken, dispatch, cart.length, userid]);

  const handlePayment = async (e) => {
    if (cart.length > 0) {
      setLgShow(true);
    } else {
      toast.error("Add products in the cart.");
    }
  };

  return (
    <section className="Cart" style={{ width: "100%", margin: "30px 0px" }}>
      <form ref={form} onSubmit={sendEmail} style={{ display: "none" }}>
        <label>Name</label>
        <input type="text" name="user_name" value={username ? username : ""} />
        <label>Email</label>
        <input
          type="email"
          name="user_email"
          value={useremail ? useremail : ""}
        />
        <label>Message</label>
        <textarea name="message" value={clientMessage ? clientMessage : ""} />
        <input type="submit" value="Send" ref={buttonRef} />
      </form>
      <div className="Cart-Main-Box">
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              ADD ADDRESS
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="address-form-container">
              {full_Address?.length > 0 ? (
                <>
                  <p>Choose Shipping Address:</p>
                  <div>
                    {full_Address?.map((item, index) => {
                      return (
                        <>
                          <div className="d-flex  w-100">
                            <input
                              type="radio"
                              className="me-2"
                              id={index}
                              name={item.attributes.address}
                              value={item.attributes.address}
                              checked={
                                selectedOption === item.attributes.address
                              }
                              onChange={handleOptionChange}
                            />
                            <div className="row d-flex justify-content-center flex-column mb-3">
                              <div className="col">{item.attributes.name}</div>
                              <div className="col">
                                {item.attributes.address}
                                {item.attributes.pin}
                              </div>
                              <div className="col">{item.attributes.phone}</div>
                            </div>
                          </div>
                          <div className="divider"></div>
                        </>
                      );
                    })}

                    {/* Display the selected option */}
                    {/* <p>Selected option: {selectedOption}</p> */}
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-between">
                <button
                  onClick={() => handleFinalPayment()}
                  className="submit-button"
                >
                  Use Selected Address
                </button>
                <button
                  onClick={handleNewAddressChange}
                  className="submit-button"
                >
                  Add New Address
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div className="Cart-Main-Box1">
          {cart?.length !== 0 ? (
            cart.map((element) => {
              return (
                <div
                  className="cartCard"
                  key={element.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Comfortaa",
                    fontWeight: "500",
                    fontSize: "20px",
                    margin: "0px 0px 50px 0px",
                  }}
                >
                  <div
                    onClick={() => {
                      navigate(`/shop/${element?.attributes.id_product}`);
                    }}
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      className="cartCardImage"
                      src={`${process.env.REACT_APP_SERVERNAME}${element?.attributes.image}`}
                      alt="ProductImage"
                    />
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      margin: "0px 10px",
                    }}
                  >
                    <div
                      className="Cart-Product-Detail"
                      onClick={() => {
                        navigate(`/shop/${element?.attributes.id_product}`);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <p style={{ margin: "0px 0px" }}>
                        {element?.attributes.title.length > 25
                          ? `${element?.attributes.title.slice(0, 25)}...`
                          : element?.attributes.title}
                      </p>
                      <p style={{ margin: "0px 0px" }}>
                        ₹ {numberWithCommas(element?.attributes?.price)}
                      </p>
                      <p style={{ margin: "0px 0px" }}>
                        Category: {element?.attributes.category}
                      </p>
                      <p style={{ margin: "0px 0px" }}>
                        Selected Size: {element?.attributes.size}
                      </p>
                    </div>
                    <div className="input-group">
                      <button
                        disable={
                          Number(element?.attributes.quantity === 1)
                            ? "true"
                            : "false"
                        }
                        id="decrement"
                        onClick={() => {
                          Decrement(
                            element.id,
                            element?.attributes.price,
                            element?.attributes.quantity
                          );
                        }}
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          border: "none",
                          backgroundColor: "rgb(226, 191, 68)",
                        }}
                      >
                        -
                      </button>
                      <input
                        id="input"
                        value={Number(element?.attributes.quantity)}
                        readOnly
                        style={{
                          width: "50px",
                          margin: "0px 10px",
                          padding: "0px 0px 0px 15px",
                        }}
                      />
                      <button
                        id="increment"
                        onClick={() => {
                          Increment(
                            element.id,
                            element?.attributes.price,
                            element?.attributes.quantity
                          );
                        }}
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          border: "none",
                          backgroundColor: "rgb(226, 191, 68)",
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{ margin: "0px 20px", cursor: "pointer" }}
                        className="material-symbols-outlined cartDeleteButton"
                        onClick={() => {
                          DeleteFromCart(element.id, authtoken);
                        }}
                      >
                        delete
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontFamily: "Comfortaa",
                color: "#737373",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              No Item In Cart
            </div>
          )}
        </div>
        <div className="Cart-Main-Box2">
          <div
            style={{
              borderBottom: "1px solid black",
              padding: "20px 0px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                margin: "20px 0px 0px 0px",
              }}
            >
              <div>Order Value</div>
              <div>
                {cart.map((element) => {
                  return (
                    <p key={element.id} style={{ margin: "0px" }}>
                      {element?.attributes.price}
                    </p>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div>Delivery</div>
              <div>{price < 5000 ? "99" : "Free"}</div>
            </div>
          </div>

          <div style={{ padding: "20px 0px", width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div>Total</div>
              <div>{cart.length !== 0 ? price : "0"}</div>
            </div>
          </div>

          <button
            style={{
              padding: "10px 0px",
              width: "100%",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#E2BF44",
              height: "auto",
              fontSize: "20px",
              fontWeight: "400",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
            onClick={() => handlePayment()}
          >
            Continue To Checkout
          </button>
          {/* <GooglePayButton
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "example",
                      gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "BCR2DN4T5G3NF5Y7",
                merchantName: "Silicon Garage",
              },
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                totalPrice: price.toString(),
                currencyCode: "INR",
                countryCode: "IN",
              },
              shippingAddressRequired: true,
              callbackIntents: ["PAYMENT_AUTHORIZATION"],
            }}
            onLoadPaymentData={(paymentRequest) => {
              console.log(paymentRequest);
            }}
            onPaymentAuthorized={(paymentData) => {
              console.log("paymentData " + paymentData);
              return { transactionState: "SUCCESS" };
            }}
            existingPaymentMethodRequired="false"
            buttonColor="default"
            buttonType="buy"
            buttonSizeMode="fill"
          ></GooglePayButton> */}
        </div>
      </div>
      {/* <button
        style={{
          padding: "10px 0px",
          width: "100%",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#E2BF44",
          height: "auto",
          fontSize: "20px",
          fontWeight: "400",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
        onClick={() => handlePayment()}
      >
        Continue To Checkout
      </button> */}
      <YouMayLike />
    </section>
  );
}
const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
  useremail: state.auth.user.user.email,
  authtoken: state.auth.user.jwt,
  user: state.auth.user,
});
export default connect(mapStateToProps)(memo(Cart));
