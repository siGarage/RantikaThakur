import { Link, useParams } from "react-router-dom";
import "./OrderId.css";
import { connect } from "react-redux";
import { memo, useEffect, useState } from "react";
import ORDER from "../../API/Order";
import checkMark from "../../Images/checkmark.png";
import box from "../../Images/box.png";
import truck from "../../Images/delivery-truck.png";
import copy from "../../Images/file_12230090.png";
import pin from "../../Images/pin.png";
import suits from "../../Images/suits.png";
import moment from "moment";
import { toast } from "react-toastify";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
function Order(props) {
  const { authtoken, useremail } = props;
  let username = props.user.user.username;
  let phone = props.user.user.phone;
  const [OSPadRMatches, setOSAirpadRRMatches] = useState(
    window.matchMedia("(height:1080px)").matches
  );
  const [ipadAirMatches, setIpadAirMatches] = useState(
    window.matchMedia("(width:820px)").matches
  );
  const [thirteenMatches, set13Matches] = useState(
    window.matchMedia("(height: 844px)").matches
  );

  const { orderId } = useParams();
  let [order, setOrder] = useState([]);
  let [orderDetails, setOrderDetails] = useState();
  console.log(orderDetails, "orderDetails");
  const fetchSize = (String) => {
    const regex = /Size:(\w+)/;
    const match = String.match(regex);
    return match[1];
  };

  const fetchName = (String) => {
    const regex = /^(.*?),\s*Size:\w+/;
    const match = String.match(regex);
    return match[1];
  };

  useEffect(() => {
    window
      .matchMedia("(height:1080px)")
      .addEventListener("change", (e) => setOSAirpadRRMatches(e.matches));
    window
      .matchMedia("(width:820px)")
      .addEventListener("change", (e) => setIpadAirMatches(e.matches));
    window
      .matchMedia("(height: 844px)")
      .addEventListener("change", (e) => set13Matches(e.matches));
    if (orderId) {
      fetch(
        `${process.env.REACT_APP_SERVERNAME}/api/order-confirmations/${orderId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setOrder(data.data);
          setOrderDetails(
            JSON.parse(
              data?.data?.attributes?.Order_Details?.replaceAll("\\\\", "")
            )
          );
        });
    }
  }, [authtoken, useremail, orderId]);
  return (
    <section className="Order">
      <div className="row d-flex justify-content-center w-100">
        <div className="col-lg-8 p-5 order-detail-box">
          <div className="row w-100">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="row">
                <div className="col total-amount">
                  Total Amount
                  <br /> ₹ {order?.attributes?.Order_Amount}
                  <br />
                  <p>
                    Paid By
                    <br /> UPI
                  </p>
                </div>
                <div className="col total-amount d-flex justify-content-end">
                  <p>
                    {moment(order?.attributes?.createdAt).format(
                      "DD MMMM, YYYY"
                    )}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div
                  className="col order-detail-link"
                  style={{ cursor: "pointer" }}
                >
                  Delivery <br />
                  Address
                </div>
                <div
                  className="col d-flex justify-content-end order-detail-link"
                  style={{ cursor: "pointer" }}
                >
                  View <br />
                  Details
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row w-100 pt-5 pb-5 d-flex justify-content-center">
          <div className={thirteenMatches ? "col-10" : "col-8"}>
            <ProgressBar
              percent={
                order?.attributes?.Order_status == "Confirmed"
                  ? 10
                  : order?.attributes?.Order_status == "Packed"
                  ? 40
                  : order?.attributes?.Order_status == "Shipped"
                  ? 70
                  : order?.attributes?.Order_status == "Delivering"
                  ? 100
                  : 0
              }
              filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
            >
              <Step transition="scale">
                {({ accomplished }) => (
                  <div className="d-flex flex-column checkmark">
                    <img
                      style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                      width="35"
                      src={checkMark}
                    />
                    <p className="pt-2">Confirmed</p>
                  </div>
                )}
              </Step>
              <Step transition="scale">
                {({ accomplished }) => (
                  <div className="d-flex flex-column">
                    <img
                      style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                      width="35"
                      src={box}
                    />
                    <p className="pt-2">Packed</p>
                  </div>
                )}
              </Step>
              <Step transition="scale">
                {({ accomplished }) => (
                  <div className="d-flex flex-column">
                    <img
                      style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                      width="35"
                      src={truck}
                    />
                    <p className="pt-2">Shipped</p>
                  </div>
                )}
              </Step>

              <Step transition="scale">
                {({ accomplished }) => (
                  <div className="d-flex flex-column">
                    <img
                      style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                      width="35"
                      src={pin}
                    />
                    <p className="pt-2">Delivering</p>
                  </div>
                )}
              </Step>
            </ProgressBar>
          </div>
        </div>

        <div className="row w-100 pb-5 d-flex justify-content-center">
          <div className="col-8">
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col ">
                    <p className="delivery-partner">
                      Delivery Partner <br /> Tracking ID
                    </p>
                  </div>
                  <div className="col">
                    <p className="delivery-partner-details">
                      {order?.attributes?.Delivery_Partner.length > 0
                        ? order?.attributes?.Delivery_Partner
                        : ""}
                      <br />
                      <p className="d-flex">
                        {order?.attributes?.Order_Track_Id.length > 0
                          ? order?.attributes?.Order_Track_Id
                          : ""}
                        <img
                          className="mt-2"
                          src={copy}
                          width={20}
                          height={20}
                          onClick={() => {
                            navigator.clipboard.writeText(
                              order?.attributes?.Order_Track_Id.length > 0
                                ? order?.attributes?.Order_Track_Id
                                : ""
                            );
                          }}
                        />
                      </p>
                    </p>
                  </div>
                </div>
              </div>
              {order?.attributes?.Order_Track_Link !== null ? (
                <div className="col d-flex justify-content-end text-center align-item-center">
                  <button className="track-order h-50 ps-2 pe-2">
                    Track Order
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="row w-100 pb-3 d-flex justify-content-center">
          <div className="col-8">
            {orderDetails?.length > 0
              ? orderDetails?.map((item) => {
                  return (
                    <div className="row">
                      <div className="col">
                        <div className="row">
                          <div
                            className={
                              OSPadRMatches || ipadAirMatches
                                ? "col-5"
                                : "col-lg-3 col-md-3 col-sm-12 col-xs-12"
                            }
                          >
                            <img
                              src={`${process.env.REACT_APP_SERVERNAME}${item.image}`}
                              width="180px"
                              height="270px"
                            />
                          </div>
                          <div
                            className={
                              OSPadRMatches || ipadAirMatches
                                ? "col-5"
                                : "col-lg-9 col-md-9 col-sm-12 co-xs-12 order-brief-detail"
                            }
                          >
                            {item?.title}
                            <br />
                            <p className="pt-3"> ₹ {item?.price}</p>
                          </div>
                        </div>
                      </div>
                      {/* <div
                        className="col d-flex justify-content-end cancel-button"
                        style={{ cursor: "pointer" }}
                      >
                        Cancel
                      </div> */}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div className="row w-100 pb-5 d-flex justify-content-center">
          <div className="col-8">
            <div className="row">
              <div className="col">
                <div className="deliverTo">Deliver to:</div>
                <div className="name">
                  {username}
                  <br />
                  {/* <p className="col-3 address mt-3"> */}
                  {order?.attributes?.Order_Address}
                  {/* </p> */}
                </div>
                {/* <p className="col-lg-3 col-12 phone mt-1"> */}
                <div className="col-lg-3 col-12 phone ">
                  Phone : {order?.attributes?.Order_Phone}
                </div>
                {/* </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
  useremail: state.auth.user.user.email,
  user: state.auth.user,
  authtoken: state.auth.user.jwt,
});
export default connect(mapStateToProps)(memo(Order));
