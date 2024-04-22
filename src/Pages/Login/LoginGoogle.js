import "./Login.css";
import SideImage from "../../Images/SDP05271.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Auth from "../../API/Auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import constants from "../../constants";
import eye from "../../Images/eye-svgrepo-com.svg";
import { useState, useEffect } from "react";
import axios from "axios";
function LoginGoogle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth, setAuth] = useState();
  const [googleLogin, setLoginGoogle] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (!location) {
      return;
    }
    const { search } = location;
    // console.log(googleLogin,"googleLogin")
    axios({
      method: "GET",
      url: `http://localhost:1337/api/auth/google/callback${search}`,
    })
      .then((res) => {
        dispatch({
          type: constants("auth").reducers.login.success,
          payload: { data: res.data },
        });
        toast.success("Login successful!");
        // setLoginGoogle(false);
        navigate("/shop?type=All");
      })
      .then(setAuth);
  }, [location]);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width:700px)").matches
  );
  const [iMacMatches, setIMacMatches] = useState(
    window.matchMedia("(min-width:2560px)").matches
  );
  const [ipadAirMatches, setIpadAirMatches] = useState(
    window.matchMedia("(max-width:820px)").matches
  );
  const SignupSchema = Yup.object().shape({
    identifier: Yup.string()
      .email("*Enter a valid mail!")
      .required("*E-mail field is required!"),
    password: Yup.string().required("*Password field is required!"),
  });

  useEffect(() => {
    window
      .matchMedia("(max-width:700px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    window
      .matchMedia("(min-width:2560px)")
      .addEventListener("change", (e) => setIMacMatches(e.matches));
    window
      .matchMedia("(max-width:820px)")
      .addEventListener("change", (e) => setIpadAirMatches(e.matches));
  }, []);
  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      Auth.login({ data: values }).then((res) => {
        if (res.status === 200) {
          dispatch({
            type: constants("auth").reducers.login.success,
            payload: { data: res.data },
          });
          toast.success("Login successful!");
          navigate("/shop?type=All");
        } else {
          toast.error("Enter a valid E-mail & Password.");
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
  let forgotPassword = () => {
    navigate("/forgotPassword");
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
              Login
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
                  Email
                </div>
                <input
                  name="identifier"
                  type="text"
                  placeholder="E-mail"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.identifier}
                  style={{ height: "40px", width: "100%" }}
                />
              </div>
              <div className="w-100">
                {formik.errors.identifier && formik.touched.identifier ? (
                  <div className="red_color">{formik.errors.identifier}</div>
                ) : null}
              </div>
              <div
                class="password-input-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "space-between",
                  width: "100%",
                  // marginTop: "20px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    fontFamily: "Abhaya Libre",
                    fontWeight: "500",
                    fontSize: "20px",
                    color: "rbg(0,0,0) !important",
                  }}
                >
                  Password
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  style={{ height: "40px", width: "100%" }}
                  value={formik.values.password}
                />
                <img
                  class="password-icon"
                  src={eye}
                  alt="Lock Icon"
                  width={20}
                  height={20}
                  onClick={() => {
                    myFunction();
                  }}
                />
              </div>
              <div className="w-100">
                {formik.errors.password && formik.touched.password ? (
                  <div className="red_color">{formik.errors.password}</div>
                ) : null}
              </div>
              <div
                className={
                  matches
                    ? "d-flex flex-column w-100 "
                    : "d-flex justify-content-between w-100"
                }
              >
                <div
                  onClick={() => forgotPassword()}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password ?
                </div>
              </div>
              <button className="Login-Button" onClick={formik.handleSubmit}>
                Login
              </button>
              <button
                class="login-btn google"
                onClick={() =>
                  (window.location = "http://localhost:1337/api/connect/google")
                }
              >
                <img src="google_logo.png" alt="Google Logo" />
                <span>Login with Google</span>
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
              <div className="Login-Heading2">Does not have account?</div>
              <Link
                to="/signup"
                style={{ textDecoration: "none", margin: "0px 10px" }}
              >
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginGoogle;
