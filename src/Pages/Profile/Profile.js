import "./Profile.css";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { memo, useState } from "react";
import USERAPI from "../../API/User";
import { toast } from "react-toastify";
import constants from "../../constants";
import img from "./profile.jpg";
import svgimg from "../../Images/fluent_camera-add-48-filled.svg";
function Profile(props) {
  let dispatch = useDispatch();
  const logOut = () => {
    localStorage.clear();
    window.location.reload("/login");
  };

  let user = props.user;
  let username = props.user.user.username;
  let userid = user.user.id;
  let token = user.jwt;

  // const [data,setData]=useState({'username':user.user.username,'address':user.user.address,'phone':user.user.phone,'email':user.user.email})
  const [data, setData] = useState({
    address: user.user.address,
    phone: user.user.phone,
  });
  const [edit, setEdit] = useState(false);
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const ToggleEditButton = (edit) => {
    setEdit(!edit);
  };

  let submitForm = (data, userid, token) => {
    USERAPI.setUserData(data, userid, token).then((res) => {
      if (res.status === 200) {
        toast.error("Your data is updated successfully !");
        dispatch({
          type: constants("auth").reducers.login.success,
          payload: { data: { ...user, user: { ...user.user, ...data } } },
        });
      } else {
        toast.error(res.data.error.message);
      }
    });
  };
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
      <div className="col-lg-6 col-sm-12 profileSection_col align-center d-flex justify-content-center pb-5 ">
        <div className="profileSection ">
          <div>
            {/* <div className="text-center align center w-100 pt-5 pe-5 pb-3">
              <img src={img} className="profileImg"></img>
              <p>User Name</p>
            </div> */}
            <div className="text-center align center w-100 pt-5 pe-5 pb-3">
              <div class="image-container">
                <img src={img} alt="Image" className="profileImg" />
                <div class="edit-logo">
                  <img src={svgimg} alt="Edit" />
                </div>
              </div>
              <p>User Name</p>
            </div>
            <div>
              <div className="d-flex ps-5 pb-3">
                <div className="titleWeight">Name</div>
                <div className="textWeight ps-4">Test Name</div>
              </div>
              <div className="d-flex ps-5 pb-3">
                <div className="titleWeight">Address</div>
                <div className="textWeight ps-4">Test Address</div>
              </div>
              <div className="d-flex ps-5 pb-3">
                <div className="titleWeight">Phone No.</div>
                <div className="textWeight ps-3">0987654321</div>
              </div>
              <div className="d-flex ps-5 pb-3">
                <div className="titleWeight">E-Mail Address</div>
                <div className="textWeight ps-3">qwer@gmail.com</div>
              </div>
            </div>
            <div className="editSection d-flex ps-5 pt-5 pb-4 justify-content-between textWeight5">
              <div className="editText">Add Address</div>
              <div className="pe-3">
                <div className="editButton">Edit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-sm-12 ">
        <div></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(memo(Profile));
