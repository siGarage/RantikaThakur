import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { memo, useState } from "react";
import USERAPI from "../../API/User";
import ADDRESSAPI from "../../API/Address";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import constants from "../../constants";
import img from "../../Images/userLogo.png";
import svgimg from "../../Images/fluent_camera-add-48-filled.svg";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
function Profile(props) {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let [full_address, setAddress] = useState({});
  const logOut = () => {
    localStorage.clear();
    window.location.reload("/login");
  };
  const [ipadAirMatches, setIpadAirMatches] = useState(
    window.matchMedia("(max-width:820px)").matches
  );
  const [mobileRMatches, setMobileRMatches] = useState(
    window.matchMedia("(max-width:896px)").matches
  );
  let user = props.user;
  let username = props.user.user.username;
  let address = props.user.user.address;
  let phone = props.user.user.phone;
  let userid = user.user.id;
  let token = user.jwt;

  // const [data,setData]=useState({'username':user.user.username,'address':user.user.address,'phone':user.user.phone,'email':user.user.email})
  const [data, setData] = useState({
    address: user.user.address,
    phone: user.user.phone,
  });
  useEffect(() => {
    window
      .matchMedia("(max-width:820px)")
      .addEventListener("change", (e) => setIpadAirMatches(e.matches));
    window
      .matchMedia("(max-width:896px)")
      .addEventListener("change", (e) => setMobileRMatches(e.matches));
    if (userid) {
      fetch(
        `${process.env.REACT_APP_SERVERNAME}/api/users-shipping-details?filters[userId]=${userid}`
      )
        .then((response) => response.json())
        .then((data) => setAddress(data.data));
    }
  }, [userid]);
  const [edit, setEdit] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [adShow, setAdShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const ToggleEditButton = (edit) => {
    setEdit(!edit);
  };
  const SignupSchema = Yup.object().shape({
    phone: Yup.number().required("*Phone is required!"),
    address: Yup.string().required("*Full Address is required!"),
    pin: Yup.number().required("*Pin is required!"),
  });
  const formik = useFormik({
    initialValues: {
      name: username || "",
      address: address || "",
      phone: phone || "",
      pin: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      if (adShow) {
        let data = {
          ...values,
          userId: userid,
        };
        ADDRESSAPI.addAddress({ data }).then((res) => {
          if (res.status === 200) {
            toast.success("Shipping Address added succesfully !");
            setAddress([...full_address, res.data.data]);
            setAdShow(false);
          } else {
            toast.error(res.data.error.message);
          }
        });
      } else {
        values = {
          name: values?.name,
          address: values?.address,
          phone: values?.phone,
        };
        USERAPI.setUserData(values, userid, token).then((res) => {
          if (res.status === 200) {
            toast.success("Your data is updated successfully!");
            dispatch({
              type: constants("auth").reducers.login.success,
              payload: { data: { ...user, user: { ...user.user, ...values } } },
            });
          } else {
            toast.error(res.data.error.message);
          }
        });
        setShowEdit(false);
      }
    },
  });

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);

    try {
      const response = await axios.post(
        "https://admin.rantikathakur.com/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
      // USERAPI.setUserData(values, userid, token).then((res) => {
      //   if (res.status === 200) {
      //     toast.success("Your data is updated successfully!");
      //     dispatch({
      //       type: constants("auth").reducers.login.success,
      //       payload: { data: { ...user, user: { ...user.user, ...values } } },
      //     });
      //   } else {
      //     toast.error(res.data.error.message);
      //   }
      // });
      setShowEdit(false);
      // Handle success: redirect, show a message, etc.
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error: show an error message, retry, etc.
    }
  };
  let submitForm = (data, userid, token) => {};
  return (
    // <>
    //   <section className="profile">
    //     <div className="profileBox1">
    //       <div className="Avatar">{username.slice(0, 1).toUpperCase()}</div>
    //       <div className="Profile-Username">{user.user.username}</div>
    //     </div>
    //     <div className="profileBox2">
    //       <div className="profileBox2-Box" style={{ width: "50%" }}>
    //         <div className="ProfileDetailsHeading">User Name</div>
    //         <div className="ProfileDetails">{user.user.username}</div>
    //         {/* {!edit?<div   className='ProfileDetails'>{user.user.username}</div>:<input name='username' type='text' value={data.username} onChange={onChange}/>} */}
    //         <div className="ProfileDetailsHeading">Address</div>
    //         {!edit ? (
    //           <div className="ProfileDetails">{user.user.address}</div>
    //         ) : (
    //           <input
    //             name="address"
    //             type="text"
    //             value={data.address}
    //             onChange={onChange}
    //           />
    //         )}
    //         <div className="ProfileDetailsHeading">Phone</div>
    //         {!edit ? (
    //           <div className="ProfileDetails">{user.user.phone}</div>
    //         ) : (
    //           <input
    //             name="phone"
    //             type="number"
    //             value={data.phone}
    //             onChange={onChange}
    //           />
    //         )}
    //         <div className="ProfileDetailsHeading">Email Address</div>
    //         <div className="ProfileDetails">{user.user.email}</div>
    //         {/* {!edit?<div   className='ProfileDetails'>{user.user.email}</div>:<input name='email' type='text' value={data.email}  onChange={onChange}/>} */}

    //         <div>
    //           {edit && (
    //             <button
    //               style={{
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //                 width: "86px",
    //                 margin: "10px 0px",
    //                 height: "37px",
    //                 backgroundColor: "#E2BF44",
    //                 color: "white",
    //                 fontFamily: "Poppins",
    //                 borderRadius: "72px",
    //                 border: "none",
    //               }}
    //               onClick={() => {
    //                 submitForm(data, userid, token);
    //                 ToggleEditButton(edit);
    //               }}
    //             >
    //               Submit
    //             </button>
    //           )}
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           width: "50%",
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "space-between",
    //           alignItems: "flex-end",
    //           padding: "0px 50px",
    //         }}
    //       >
    //         {!edit ? (
    //           <button
    //             style={{
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //               width: "86px",
    //               height: "37px",
    //               backgroundColor: "#E2BF44",
    //               color: "white",
    //               fontFamily: "Poppins",
    //               borderRadius: "72px",
    //               border: "none",
    //             }}
    //             onClick={() => ToggleEditButton(edit)}
    //           >
    //             Edit
    //           </button>
    //         ) : (
    //           <button
    //             style={{
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //               width: "150px",
    //               height: "37px",
    //               backgroundColor: "#E2BF44",
    //               color: "white",
    //               fontFamily: "Poppins",
    //               borderRadius: "72px",
    //               border: "none",
    //             }}
    //             onClick={() => {
    //               ToggleEditButton(edit);
    //             }}
    //           >
    //             Cancel Edit
    //           </button>
    //         )}
    //       </div>
    //     </div>

    //     <div>
    //       <button
    //         style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           width: "150px",
    //           margin: "0px 0px 40px 0px",
    //           height: "40px",
    //           backgroundColor: "#E2BF44",
    //           color: "white",
    //           fontFamily: "Poppins",
    //           borderRadius: "72px",
    //           border: "none",
    //         }}
    //         onClick={() => {
    //           logOut();
    //         }}
    //       >
    //         LogOut
    //       </button>
    //     </div>
    //   </section>
    //   <section
    //     className="profile2"
    //     style={{
    //       width: "40%",
    //       display: "flex",
    //       justifyContent: "flex-start",
    //       alignItems: "flex-start",
    //     }}
    //   >
    //     <Link
    //       to="/order"
    //       onClick={() => {
    //         window.scrollTo(0, 0);
    //       }}
    //       className="profile2Button"
    //     >
    //       <p style={{ margin: "0" }}>Orders</p>
    //       <p style={{ margin: "0" }}>&gt;</p>
    //     </Link>
    //   </section>
    // </>
    <div className="row w-100">
      <Modal
        size="lg"
        show={adShow}
        onHide={() => setAdShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            ADD SHIPING ADDRESS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="container">
            <form onSubmit={formik.handleSubmit}>
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter name please"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="red_color">{formik.errors.name}</div>
                ) : null}
              </div>
              <div class="form-group">
                <label for="adderess">
                  Full Address(House No., City, State)
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  name="address"
                  placeholder="Enter full address please"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                {formik.errors.address && formik.touched.address ? (
                  <div className="red_color">{formik.errors.address}</div>
                ) : null}
              </div>
              <div class="form-group">
                <label for="pin">Pin Code</label>
                <input
                  type="number"
                  class="form-control"
                  id="pin"
                  name="pin"
                  placeholder="Enter pin please."
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.pin}
                />
                {formik.errors.pin && formik.touched.pin ? (
                  <div className="red_color">{formik.errors.pin}</div>
                ) : null}
              </div>
              <div class="form-group">
                <label for="phone">Phone No.</label>
                <input
                  type="number"
                  class="form-control"
                  id="phone"
                  name="phone"
                  placeholder="Enter phone please."
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="red_color">{formik.errors.phone}</div>
                ) : null}
              </div>
              <button type="submit" class="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="example-modal-sizes-title-lg">
                SIZE CHART
              </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button type="submit" className="col-4">
                Upload Image
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="col-lg-6 col-sm-12 profileSection_col align-center d-flex justify-content-center pb-5 ">
        <div className="profileSection">
          <div>
            <div className="text-center align center w-100 pt-5 pe-5 pb-3">
              <div class="image-container">
                <img src={img} alt="Image" className="profileImg" />
                <div class="edit-logo">
                  <img
                    src={svgimg}
                    alt="Edit"
                    onClick={() => setLgShow(true)}
                  />
                </div>
              </div>
              <p>{username}</p>
            </div>
            <div>
              <div className="d-flex ps-5 pb-3">
                <div className="titleWeight">Name</div>
                <div className="textWeight ps-4">
                  {showEdit ? (
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  ) : (
                    username
                  )}
                </div>
              </div>
              <div className="d-flex ps-5 pb-3">
                <div className="titleWeight">Address</div>
                <div className="textWeight ps-4">
                  {" "}
                  {showEdit ? (
                    <input
                      name="address"
                      type="text"
                      placeholder="Enter your address"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.address}
                    />
                  ) : (
                    address
                  )}
                </div>
              </div>
              <div className="d-flex ps-5 pb-3">
                <div className="titleWeight">Phone No.</div>
                <div className="textWeight ps-3">
                  {showEdit ? (
                    <input
                      name="phone"
                      type="number"
                      placeholder="Enter your phone"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                  ) : (
                    phone
                  )}
                </div>
              </div>
              <div className="d-flex ps-5 pb-3">
                <div className="titleWeight">E-Mail Address</div>
                <div className="textWeight ps-3">{user.user.email}</div>
              </div>
            </div>
            <div className="editSection d-flex ps-5 pt-5 pb-4 justify-content-between textWeight5">
              {/* <div className="editText">Add Address</div> */}
              <div className="pe-3">
                {showEdit ? (
                  <div className="editButton" onClick={formik.handleSubmit}>
                    update
                  </div>
                ) : (
                  <div
                    className="editButton"
                    onClick={() => {
                      setShowEdit(true);
                    }}
                  >
                    Edit
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          ipadAirMatches || mobileRMatches
            ? "col-md-12 col-lg-12 col-sm-6 d-flex justify-content-center mb-3"
            : "col col-sm-6 d-flex justify-content-center mb-3 h-100"
        }
      >
        <div className="profileSection">
          <h3 className="text-center mt-2">Shipping Address</h3>
          <div className="p-4">
            {full_address?.length > 0
              ? full_address?.map((item, index) => {
                  return (
                    <div className="row d-flex justify-content-center flex-column mb-3">
                      <div className="col">
                        {index + 1}.Name:&nbsp;{item.attributes.name}
                      </div>
                      <div className="col">
                        &nbsp;&nbsp;&nbsp;Full Address:&nbsp;
                        {item.attributes.address}
                      </div>
                      <div className="col">
                        &nbsp;&nbsp;&nbsp;Pin:&nbsp;{item.attributes.pin}
                      </div>
                      <div className="col">
                        &nbsp;&nbsp;&nbsp;Phone:&nbsp;{item.attributes.phone}
                      </div>
                    </div>
                  );
                })
              : ""}
            <button onClick={() => setAdShow(true)} className="editButton aba">
              Add Shiping Address
            </button>
          </div>
        </div>
        {/* <div onClick={() => logOut()}>LogOut</div>
        <div onClick={() => navigate("/order")}>Order</div> */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(memo(Profile));
