import { useNavigate, useSearchParams } from "react-router-dom";
import "./Success.css";
import { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import ORDER from "../../API/Order";
const stripe = require("stripe")(`${process.env.REACT_APP_STRIPE_STRIPE_KEY}`);

const Success = (props) => {
  const [order, setOrder] = useState({});
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get(`session_id`);
  const navigate = useNavigate();

  const { useremail } = props;
  useEffect(() => {
    if (session_id) {
      const some = async () => {
        const order = await stripe.checkout.sessions.retrieve(session_id, {
          expand: ["line_items"],
        });
        setOrder(order);
      };
      some();
    }
  }, [session_id]);

  const fetchName = (String) => {
    const regex = /^(.*?),\s*Size:\w+/;
    const match = String.match(regex);
    return match[1];
  };

  const fetchSize = (String) => {
    const regex = /Size:(\w+)/;
    const match = String.match(regex);
    return match[1];
  };
  const nav = () => {
    navigate("/");
  };
  useEffect(() => {
    // if (Object.keys(order).length > 0) {
    //   ORDER.setOrder({
    //     email: useremail,
    //     address: order?.customer_details,
    //     products: order?.line_items?.data,
    //     stripeId: session_id,
    //   }).then((res) => {
    //     if (res.status === 200) {
    //       console.log("order successful!");
    //     } else {
    //       console.log("error");
    //     }
    //   });
    // }
  }, [order, useremail, session_id]);
  return (
    <div className="w-100 d-flex justify-content-center mt-5 mb-5">
      <div className="card col-md-4 bg-white shadow-md p-5">
        <div class="mb-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-success"
            width="75"
            height="75"
            fill="currentColor"
            className="bi bi-check-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>
        </div>
        <div class="text-center">
          <h1>Thank You so much for your order!!</h1>
          <p>
           I hope you enjoy your new purchase!{" "}
          </p>
          <button class="btn btn-outline-success" onClick={() => nav()}>
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  useremail: state.auth.user.user.email,
});
export default connect(mapStateToProps)(memo(Success));
