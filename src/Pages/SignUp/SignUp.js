import "./SignUp.css";
import SideImage from "../../Images/SDP05271.png";
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Auth from "../../API/Auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from '@react-oauth/google';
import { useState, useEffect, useRef, Profiler } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import constants from "../../constants";
function SignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonRRef = useRef(null);
  const [clientMessage, setClientMessage] = useState("");
  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("*Name is required"),
    email: Yup.string()
      .email("*Your email is invalid!")
      .required("*Email field is required!"),
    password: Yup.string().required("*Password field is required!"),
  });

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_f4cfons", "template_wcv0rxr", form.current, {
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
  useEffect(() => {
    console.log("kartik")
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  useEffect(() => {
    var firstWord = profile?.name?.replace(/ .*/, "");
    setClientMessage(firstWord);
    if (profile && firstWord) {
      let values = {
        username: profile?.name,
        email: profile?.email,
        password: firstWord,
        confirmed: true,
      };
      Auth.signup({ data: values }).then((res) => {
        if (res.status === 200) {
          buttonRRef.current.click();
          toast.success("Check Your E-mail");
          navigate("/login");
        } else {
          toast.error(res.data.error.message);
        }
      });
    }
  }, [profile]);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      Auth.signup({ data: values }).then((res) => {
        if (res.status === 200) {
          toast.success("Account Created Successfully!");
          navigate("/login");
        } else {
          toast.error(res.data.error.message);
        }
      });
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
    <section className="SignUp">
      <form ref={form} onSubmit={sendEmail} style={{ display: "none" }}>
        <label>Name</label>
        <input type="text" name="user_name" value="" />
        <label>Email</label>
        <input
          type="email"
          name="user_email"
          value={profile?.email ? profile?.email : ""}
        />
        <label>Message</label>
        <textarea name="message" value={clientMessage ? clientMessage : ""} />

        <input type="submit" value="Send" ref={buttonRRef} />
      </form>
      <div className="SignUp-Box1">
        <div className="SignUp-Box1-innerBox">
          <div className="SignUp-Box1-innerBox-Box1">
            <img src={SideImage} alt="SideImage" />
          </div>
          <div className="SignUp-Box1-innerBox-Box2">
            <div className="SignUp-Box1-innerBox-Box2-innerBox1">Sign Up</div>
            <div className="SignUp-Box1-innerBox-Box2-innerBox2">
              <div className="SignUp-Box1-innerBox-Box2-innerBox2-innerBox">
                <div className="SignUp-Box1-innerBox-Box2-innerBox2-innerBox-box">
                  Name
                </div>
                <input
                  className="signup-input"
                  name="username"
                  placeholder="Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  type="text"
                />
              </div>
              <div className="w-100">
                {formik.errors.username && formik.touched.username ? (
                  <div className="red_color">{formik.errors.username}</div>
                ) : null}
              </div>
              <div className="SignUp-Box1-innerBox-Box2-innerBox2-innerBox">
                <div className="SignUp-Box1-innerBox-Box2-innerBox2-innerBox-box">
                  Email Address
                </div>
                <input
                  className="signup-input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className="w-100">
                {formik.errors.email && formik.touched.email ? (
                  <div className="red_color">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="SignUp-Box1-innerBox-Box2-innerBox2-innerBox">
                <div className="SignUp-Box1-innerBox-Box2-innerBox2-innerBox-box">
                  Set Password
                </div>
                <input
                  className="signup-input"
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div className="w-100">
                {formik.errors.password && formik.touched.password ? (
                  <div className="red_color">{formik.errors.password}</div>
                ) : null}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                <input
                  type="checkbox"
                  style={{ margin: "10px 10px" }}
                  onClick={() => {
                    myFunction();
                  }}
                />
                Show Password
              </div>
              {/* <div className="d-flex justify-content-between"> */}
              <button className="SignUp-Button" onClick={formik.handleSubmit}>
                Sign Up
              </button>
              {/* <button className="Login-Button margin-top-neg" onClick={login}>
                {" "}
                Google Login{" "}
              </button> */}

              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse,"credentialResponse")
                  setUser(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              {console.log(user,"user")}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
