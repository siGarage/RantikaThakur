import { Link, useNavigate } from "react-router-dom";
import "./Order.css";
import { connect } from "react-redux";
import { memo, useEffect, useState } from "react";
import ORDER from "../../API/Order";
import moment from "moment";
import { toast } from "react-toastify";
import { blue } from "@mui/material/colors";
function Order(props) {
  const { authtoken, useremail } = props;

  let [order, setOrder] = useState([]);
  const navigate = useNavigate();
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
    ORDER.getOrder(useremail, authtoken).then((res) => {
      if (res.status === 200) {
        setOrder(res.data.data);
      } else {
        toast.error("Server Side Error");
      }
    });
  }, [authtoken, useremail]);
  return (
    <section className="Order">
      <div className="row w-100 p-5">
        <div className="col order-table-container d-flex justify-content-start pb-lg-3 pb-md-3">
          Order
        </div>
      </div>
      <div className="row w-100 ps-5 pe-5 ">
        <table class="borderless">
          <tr className="d-flex justify-content-between pb-4">
            <td>Orders Id</td>
            <td>Price</td>
            <td>Order Number</td>
            <td>Order Date</td>
            <td>Delivery Date</td>
          </tr>
          {order?.map((order) => {
            return (
              <tr className="d-flex justify-content-between pb-4">
                <td>{order.id}</td>
                <td>₹ {order?.attributes?.Order_Amount}</td>
                <td>
                  {" "}
                  <a
                    onClick={() => {
                      navigate(`/order/${order?.id}`);
                    }}
                    style={{color:"blue",cursor:"pointer"}}
                  >
                    {order?.attributes?.Payment_id}
                  </a>
                </td>
                <td>
                  {moment(order?.attributes?.createdAt).format("DD MMMM, YYYY")}
                </td>
                <td>Delivery Date</td>
              </tr>
              // <li>
              //   <div class="product-info">
              //     <span
              //       class="product-name"
              //       onClick={() => {
              //         navigate(`/order/${order?.id}`);
              //       }}
              //     >
              //       {order?.attributes?.Payment_id}
              //     </span>
              //     <span class="product-name">
              //       {order?.attributes?.Order_status}
              //     </span>
              //     <span class="product-price">
              //       ₹ {order?.attributes?.Order_Amount}
              //     </span>
              //   </div>
              // </li>
            );
          })}
        </table>
        <hr />
      </div>
      {/* <div className="Order2" style={{ width: "100%", margin: "20px 0px" }}>
        <div className="Order-Main-Box">
          <div className="Order-Main-Box1">
            <div className="row w-50">
              <div className="col-12 order-list-Container">
                <div class="order-summary">
                  <h2> Your Orders</h2>
                  <ol class="order-list">
                    {order?.map((order) => {
                      console.log(order);
                      return (
                        <li>
                          <div class="product-info">
                            <span
                              class="product-name"
                              onClick={() => {
                                navigate(`/order/${order?.id}`);
                              }}
                            >
                              {order?.attributes?.Payment_id}
                            </span>
                            <span class="product-name">
                              {order?.attributes?.Order_status}
                            </span>
                            <span class="product-price">
                              ₹ {order?.attributes?.Order_Amount}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Order5">
        <Link to="/shop?type=All" className="Order5Button">
          <button style={{ backgroundColor: "transparent", border: "none" }}>
            Continue Shopping
          </button>
        </Link>
      </div> */}
    </section>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
  useremail: state.auth.user.user.email,
  authtoken: state.auth.user.jwt,
});
export default connect(mapStateToProps)(memo(Order));
