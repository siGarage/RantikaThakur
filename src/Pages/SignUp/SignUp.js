import "./SignUp.css";
import SideImage from "../../Images/SDP05271.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Auth from "../../API/Auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import constants from "../../constants";
function SignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("*Username is required"),
    email: Yup.string()
      .email("*Your email is invalid!")
      .required("*Email field is required!"),
    password: Yup.string().required("*Password field is required!"),
  });

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
                  UserName
                </div>
                <input
                  className="signup-input"
                  name="username"
                  placeholder="Username"
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
              <button className="SignUp-Button" onClick={formik.handleSubmit}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
