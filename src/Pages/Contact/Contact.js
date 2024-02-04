import "./Contact.css";
import SideImage from "../../Images/SDP05271.png";
// import { toast } from 'react-toastify';
import { useState } from "react";
import { toast } from "react-toastify";
import CONTACT from "../../API/Contact";
import fb from "../../Images/fb.jpg";
import inst from "../../Images/inst.jpg";
import whts from "../../Images/whts.png";

function Contact() {
  const [contactdata, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  let validateForm = (data) => {
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
      CONTACT.message({ data: data }).then((res) => {
        if (res.status === 200) {
          toast.success("Your Message Is Sent SuccessFully ! ");
        } else {
          toast.error(res.data.error.message);
        }
      });
    }
  };

  const onChange = (e) => {
    setContactData({ ...contactdata, [e.target.name]: e.target.value });
  };

  return (
    <section className="Contact">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div className="Contact-Box">
          <div className="Contact-Box-Box1">
            <img src={SideImage} alt="SideImage" className="contactImg" />
          </div>
          <div className="Contact-Box-Box2">
            <div className="Contact-Heading">Contact Us</div>
            <div className="contactUsContainer">
              <div className="Contact-Input-Box">
                <div className="Contact-Box-Label">Full Name</div>
                <input
                  type="text"
                  name="name"
                  onChange={onChange}
                  className="Contact-Input"
                  placeholder="Enter your name"
                />
              </div>
              <div className="Contact-Input-Box">
                <div className="Contact-Box-Label">Email Address</div>
                <input
                  type="email"
                  name="email"
                  onChange={onChange}
                  className="Contact-Input"
                  placeholder="Enter valid E-mail"
                />
              </div>
              <div className="Contact-Input-Box">
                <div className="Contact-Box-Label">Phone No.</div>
                <input
                  type="number"
                  name="phone"
                  onChange={onChange}
                  placeholder="Enter phone number"
                  className="Contact-Input"
                />
              </div>
              <div className="Contact-Input-Box">
                <div className="Contact-Box-Label">Your Message</div>
                <textarea
                  type="text"
                  style={{ height: "80px" }}
                  name="message"
                  onChange={onChange}
                  placeholder="Message"
                  className="Contact-Input"
                />
              </div>
              <div className="Contact-Submit">
                <button
                  className="Contact-Submit-Button"
                  onClick={() => {
                    validateForm(contactdata);
                  }}
                  style={{height:"40px"}}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "80%",
            height: "40%",
            borderTop: "1px solid #000000; ",
            margin: "0px 50px 50px 50px",
          }}
        >
          <hr class="new3"></hr>
          <div className="letsConnect">
            <p>Let's Connect</p>
          </div>
          <div className="row align-items-baseline">
            <div className="col-sm-12 col-xs-12 col-md-4 title justify-content-start flex-column mob">
              <p class="d-flex justify-content-center mA ">E-mail Address</p>
              <p className="mobt">contactrantikathakurclothing@gmail.com</p>
            </div>
            <div className="col-sm-12 col-xs-12 col-md-4 title justify-content-center flex-column mob">
              <p className="d-flex justify-content-center mA">Social Media</p>
              <div className="d-flex">
                <a href="https://www.facebook.com/Rantikathakurclothing">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#3F51B5"
                      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                    ></path>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/rantikathakurclothing?igsh=bmNjem5pNzQ5bzJw"
                  target="blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 48 48"
                  >
                    <radialGradient
                      id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                      cx="19.38"
                      cy="42.035"
                      r="44.899"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#fd5"></stop>
                      <stop offset=".328" stop-color="#ff543f"></stop>
                      <stop offset=".348" stop-color="#fc5245"></stop>
                      <stop offset=".504" stop-color="#e64771"></stop>
                      <stop offset=".643" stop-color="#d53e91"></stop>
                      <stop offset=".761" stop-color="#cc39a4"></stop>
                      <stop offset=".841" stop-color="#c837ab"></stop>
                    </radialGradient>
                    <path
                      fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                    ></path>
                    <radialGradient
                      id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                      cx="11.786"
                      cy="5.54"
                      r="29.813"
                      gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#4168c9"></stop>
                      <stop
                        offset=".999"
                        stop-color="#4168c9"
                        stop-opacity="0"
                      ></stop>
                    </radialGradient>
                    <path
                      fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                    ></path>
                    <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                    <path
                      fill="#fff"
                      d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                    ></path>
                  </svg>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=8146351843"
                  target="_blank"
                  aria-describedby="a11y-new-window-external-message"
                  rel="null noopener"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#fff"
                      d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                    ></path>
                    <path
                      fill="#cfd8dc"
                      d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                    ></path>
                    <path
                      fill="#40c351"
                      d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                    ></path>
                    <path
                      fill="#fff"
                      fill-rule="evenodd"
                      d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="col-sm-12 col-xs-12 col-md-4 title justify-content-end flex-column mob">
              <p className="d-flex justify-content-center mA">Contact No.</p>
              <p className="mobt">+91 8146351843</p>
            </div>
          </div>
          {/* <div className="Contact-Detail">
            <a
              href="mailto:contactrantikathakurclothing@gmail.com"
              style={{ textDecoration: "none", color: "#000000; " }}
            >
              Our Mail :{" "}
              <span style={{ fontSize: "20px" }}>
                contactrantikathakurclothing@gmail.com
              </span>
            </a>
          </div>
          <div className="Contact-Detail">Social Media</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <a href="https://www.instagram.com/rantikathakur/" target="blank">
              <div style={{ margin: "0px 18px" }}>
                <img
                  src={image4}
                  style={{ height: "35px", width: "35px", color: "#2c2c2c" }}
                  alt="Twitter"
                />
              </div>
            </a>
            <a
              href="https://www.facebook.com/Rantikathakurclothing/"
              target="blank"
            >
              <div style={{ margin: "0px 10px" }}>
                <img
                  src={image3}
                  style={{ height: "35px", width: "35px", color: "#2c2c2c" }}
                  alt="Facebook"
                />
              </div>
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Contact;
