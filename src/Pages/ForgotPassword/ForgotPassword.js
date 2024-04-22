import "./ForgotPassword.css";
import SideImage from "../../Images/SDP05271.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Auth from "../../API/Auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useRef } from "react";
function ForgotPassword() {
  const [iMacMatches, setIMacMatches] = useState(
    window.matchMedia("(min-width:2560px)").matches
  );
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width:700px)").matches
  );
  const [ipadAirMatches, setIpadAirMatches] = useState(
    window.matchMedia("(max-width:820px)").matches
  );
  const SignupSchema = Yup.object().shape({
    identifier: Yup.string()
      .email("*Enter a valid mail!")
      .required("*E-mail field is required!"),
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
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      values = {
        email: values.identifier,
      };
      Auth.forgotPassword({ data: values }).then((res) => {
        if (res.status === 200) {
          toast.success("Please Check Your E-mail For Reset Password Link.");
        } else {
          toast.error("Enter a valid E-mail ");
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
              Reset Your Password
            </div>
            <p>We will send you an e-mail to reset your password </p>
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
                  Enter Your Resgistered E-mail
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
              <button
                className="Login-Button"
                onClick={formik.handleSubmit}
                style={matches ? {marginTop: "20px"} : { marginTop: "50px" }}
              >
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

export default ForgotPassword;
