import "./Login.css";
import SideImage from "../../Images/SDP05271.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Auth from "../../API/Auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import constants from "../../constants";
import { useState } from "react";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    identifier: Yup.string().email("*Enter a valid mail!").required("*Email field is required!"),
    password: Yup.string().required("*Password field is required!"),
  });

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
          <div className="LoginImage">
            <img
              src={SideImage}
              alt="SideImage"
              style={{ height: "100%", width: "100%" }}
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
                    color: "#757575",
                  }}
                >
                  Email 
                </div>
                <input
                  name="identifier"
                  type="text"
                  placeholder="email"
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
                    color: "#757575",
                  }}
                >
                  Password
                </div>
                <input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  style={{ height: "40px", width: "100%" }}
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
              <button className="Login-Button" onClick={formik.handleSubmit}>
                Login
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

export default Login;
