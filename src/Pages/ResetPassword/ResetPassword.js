import "./ResetPassword.css";
import SideImage from "../../Images/SDP05271.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Auth from "../../API/Auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import constants from "../../constants";
import { useState, useEffect } from "react";
function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [iMacMatches, setIMacMatches] = useState(
    window.matchMedia("(min-width:2560px)").matches
  );
  const [ipadAirMatches, setIpadAirMatches] = useState(
    window.matchMedia("(max-width:820px)").matches
  );
  const SignupSchema = Yup.object().shape({
    password: Yup.string().required("*Password field is required!"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("*Confirm Password field is required!"),
  });

  useEffect(() => {
    window
      .matchMedia("(min-width:2560px)")
      .addEventListener("change", (e) => setIMacMatches(e.matches));
    window
      .matchMedia("(max-width:820px)")
      .addEventListener("change", (e) => setIpadAirMatches(e.matches));
    // fetch(`${process.env.REACT_APP_SERVERNAME}/api/users/5`)
    //   .then((response) => response.json())
    //   .then((data) => setUsers(data));
  }, []);
  const forgot = () => {
    navigate("/forgotPassword");
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
      code: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      // let id = 5;
      // let data = {
      //   ...users,
      //   password: values.password,
      // };
      let data = {
        ...values,
        code: code,
      };
      Auth.resetPassword({ data: data }).then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          toast.success("Reset Password successful!");
          navigate("/login");
        } else {
          toast.error("Error");
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
          }}
        >
          <div class="card custom-card">
            <div class="card-body">
              <div className="LoginDetails">
                <div
                  style={{
                    fontFamily: "Abhaya Libre",
                    fontSize: "40px",
                    color: "#bd9334",
                  }}
                >
                  Reset Password
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
                      New Password
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
                    {formik.errors.identifier && formik.touched.identifier ? (
                      <div className="red_color">
                        {formik.errors.identifier}
                      </div>
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
                        color: "rbg(0,0,0)",
                        marginTop:"20px"
                      }}
                    >
                      Confirm Password
                    </div>
                    <input
                      name="passwordConfirmation"
                      type="text"
                      id="passwordConfirmation"
                      placeholder="Confirm Password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      style={{ height: "40px", width: "100%" }}
                      value={formik.values.passwordConfirmation}
                    />
                  </div>
                  <div className="w-100">
                    {formik.errors.passwordConfirmation &&
                    formik.touched.passwordConfirmation ? (
                      <div className="red_color">
                        {formik.errors.passwordConfirmation}
                      </div>
                    ) : null}
                  </div>
                  <button
                    className="Login-Button"
                    onClick={formik.handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
