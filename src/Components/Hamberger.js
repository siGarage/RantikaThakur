import "./Hamberger.css";
import { Link } from "react-router-dom";
import { memo, useEffect, useMemo, useState } from "react";
import { connect, useDispatch } from "react-redux";
function NavScrollExample(props) {
  const dispatch = useDispatch();
  const [showCat, setShowCat] = useState(false);
  const { username, products, logged_in } = props;

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  // Set categories
  let category = new Set([
    ...products.map(
      (element) => element?.attributes?.category?.data?.attributes?.category
    ),
  ]);
  category = ["All", ...category];
  /* Set the width of the side navigation to 0 */
  const closeNav = (e) => {
    setShowCat(false);
    e.preventDefault();
    document.getElementById("mySidenav").style.width = "0";
  };
  const show = (e) => {
    e.preventDefault();
    if (showCat == true) {
      setShowCat(false);
    } else {
      setShowCat(true);
    }
  };
  const cross = (e) => {
    setShowCat(false);
    closeNav(e);
  };

  return (
    <>
      <div className="Hamburger" style={{ backgroundColor: "white" }}>
        <div
          id="mySidenav"
          className="sidenav"
          style={{ color: "#757575", opacity: "0.955", zIndex: "10" }}
        >
          <Link className="closebtn" onClick={cross}>
            &times;
          </Link>
          <div onClick={closeNav}>
            <Link to="/" style={{ color: "white", fontSize: "18px" }}>
              Home
            </Link>
          </div>
          <div onClick={show}>
            <Link style={{ color: "white", fontSize: "18px" }}>Category</Link>
          </div>
          {showCat
            ? category?.length > 0
              ? category?.map((cat) => {
                  return (
                    <div onClick={closeNav}>
                      <ul style={{ marginLeft: "20px", marginBottom:"0px"}}>
                        <li>
                          <Link
                          className="categoryham"
                            to={`/shop?type=${cat}`}
                            style={{
                              color: "white",
                              fontSize: "18px",
                              fontFamily: "Abhaya Libre !important"
                            }}
                          >
                            {cat}
                          </Link>
                        </li>
                      </ul>
                    </div>
                    // <div onClick={closeNav}>
                    //   <Link
                    //     to={`/shop?type=${cat}`}
                    //     style={{ color: "white", fontSize: "18px" }}
                    //   >
                    //     {cat}
                    //   </Link>
                    // </div>
                  );
                })
              : ""
            : ""}
          {/* <div onClick={closeNav}><Link  to="/customsize" style={{color:'white',fontSize:'18px',width:'250px'}}>Customize Size</Link></div> */}
          <div onClick={closeNav}>
            <Link to="/contact" style={{ color: "white", fontSize: "18px" }}>
              Contact
            </Link>
          </div>
        </div>

        {/* Use any element to open the sidenav  */}
        <button
          className="Hamburger-button"
          onClick={openNav}
          style={{ backgroundColor: "#FFFFF3", border: "0px" }}
        >
          <div
            style={{
              height: "2px",
              width: "20px",
              backgroundColor: "#E2BF44",
              margin: "3px",
            }}
          ></div>
          <div
            style={{
              height: "2px",
              width: "20px",
              backgroundColor: "#E2BF44",
              margin: "3px",
            }}
          ></div>
          <div
            style={{
              height: "2px",
              width: "20px",
              backgroundColor: "#E2BF44",
              margin: "3px",
            }}
          ></div>
        </button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.Products,
  logged_in: state.auth.logged_in,
  username: state?.auth?.user?.user?.username,
});
export default connect(mapStateToProps)(memo(NavScrollExample));
