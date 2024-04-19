import "./OtpVerification.css";
import SideImage from "../../Images/SDP05271.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Auth from "../../API/Auth";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import constants from "../../constants";
import emailjs from "@emailjs/browser";
import { useState, useEffect, useRef } from "react";
import OtpInput from "react-otp-input";
function OtpVerification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const buttonRRef = useRef(null);
  const [users, setUsers] = useState([]);

  const [iMacMatches, setIMacMatches] = useState(
    window.matchMedia("(min-width:2560px)").matches
  );
  const [ipadAirMatches, setIpadAirMatches] = useState(
    window.matchMedia("(max-width:820px)").matches
  );

  const SignupSchema = Yup.object().shape({
    otp: Yup.string().required("*OTP field is required!"),
  });
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  useEffect(() => {
    window
      .matchMedia("(min-width:2560px)")
      .addEventListener("change", (e) => setIMacMatches(e.matches));
    window
      .matchMedia("(max-width:820px)")
      .addEventListener("change", (e) => setIpadAirMatches(e.matches));
    let otp = getCookie("otp");
    setOtp(otp);
  }, []);
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      if (otp == values.otp) {
        toast.success("Otp Verification.");
        navigate("/resetPassword");
      } else {
        toast.error("Wrong Otp");
      }
      //   values = {
      //     email: values?.otp,
      //   };
      //   if (users?.length > 0) {
      //     let searchUser = users?.filter((item) => item.email == values?.email);
      //     if (searchUser?.length > 0) {
      //       setClientEmail(values?.otp);
      //     }
      //   }
    },
  });
  let myFunction = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <section
      className="LoginUp"
      style={{ width: "100%", height: "550px", margin: "50px 0px" }}
    >
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            className={
              iMacMatches
                ? "LoginImage   text-center"
                : "LoginImage   text-center"
            }
          >
            <img
              src={SideImage}
              alt="SideImage"
              style={{
                height: `${ipadAirMatches ? "80%" : "100%"}`,
                width: `${iMacMatches ? "60%" : "80%"}`,
                padding: `${iMacMatches ? "0px" : "20px"}`,
              }}
            />
          </div>
          <div className="LoginDetails">
            <div
              style={{
                fontFamily: "Abhaya Libre",
                fontSize: "40px",
                color: "#bd9334",
              }}
            >
              OTP Verification
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                width: "70%",
                margin: "50px 0px 10px 0px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    fontFamily: "Abhaya Libre",
                    fontWeight: "500",
                    fontSize: "20px",
                    color: "rbg(0,0,0)",
                  }}
                >
                  OTP
                </div>
                <input
                  name="otp"
                  type="Number"
                  placeholder="OTP"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.otp}
                  style={{ height: "40px", width: "100%" }}
                />
              </div>
              <div className="w-100">
                {formik.errors.otp && formik.touched.otp ? (
                  <div className="red_color">{formik.errors.otp}</div>
                ) : null}
              </div>
              <button className="Login-Button" onClick={formik.handleSubmit}>
                Submit
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                width: "70%",
              }}
            >
              <div className="Login-Heading2">Already have an account?</div>
              <Link
                to="/login"
                style={{ textDecoration: "none", margin: "0px 10px" }}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OtpVerification;
