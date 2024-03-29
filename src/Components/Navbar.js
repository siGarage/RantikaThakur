import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import CartImage from "../Images/Cart.png";
import HeartImage from "../Images/heart.png";
import ProfileImage from "../Images/profileicon.png";
import RantikaLogo from "../Images/Rantika.png";
import SearchImage from "../Images/Search.png";
import Whatsapp from "../Images/whatsapp.png";
import { connect, useDispatch } from "react-redux";
import { memo, useEffect, useMemo, useState } from "react";
import PRODUCTDATA from "../API/Product";
import constants from "../constants";
import { toast } from "react-toastify";
import Hamberger from "./Hamberger";
import Marquee from "react-fast-marquee";

function Navbar(props) {
  const { username, products, logged_in } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showWhatsappCloud, setshowWhatsappCloud] = useState(true);
  const [logoStyle, setLogoStyle] = useState({ marginLeft: "150px" });
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width:700px)").matches
  );

  const closeWCloud = () => {
    setshowWhatsappCloud(false);
  };
  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const searchInputButton = () => {
    setShowSearchInput(true);
    setLogoStyle({ marginLeft: "350px" });
  };
  const filteredItems = products.filter(
    (element) =>
      element?.attributes?.title.toLowerCase().indexOf(query.toLowerCase()) !==
      -1
  );

  const filterData = useMemo(() => {
    if (products.length > 0) {
      if (query) {
        const filteredProducts = filteredItems;
        return filteredProducts;
      } else {
        return [];
      }
    }
  }, [products, filteredItems, query]);

  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    setIsShown(true);
  };
  const logOut = () => {
    localStorage.clear();
    window.location.reload("/login");
  };
  const handleClickClose = (event) => {
    setIsShown(false);
    setShowSearchInput(false);
    setLogoStyle({ marginLeft: "150px" });
  };

  // Set categories
  let category = new Set([
    ...products.map(
      (element) => element?.attributes?.category?.data?.attributes?.category
    ),
  ]);
  category = ["All", ...category];

  const goToHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    window
      .matchMedia("(max-width:700px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    if (products.length === 0) {
      PRODUCTDATA.fetchProduct().then((res) => {
        if (res.status === 200) {
          dispatch({
            type: constants("product").reducers.product.AddToProducts,
            payload: { Products: res.data.data },
          });
        } else {
          toast.error("Server Side Error");
        }
      });
    }
  }, [dispatch, products]);
  return (
    <>
      <Marquee
        style={{
          height: "45px",
          fontSize: "16px",
          fontFamily: "Inter",
          fontWeight: "100",
          backgroundColor: "black",
          color: "white",
        }}
      >
        AVAIL 10% OFF ON YOUR FIRST PURCHASE.
      </Marquee>
      <section className="Navbar">
        <div className="Navbar-box1">
          <div>
            <Hamberger />
          </div>
          <div className="Navbar-box2" style={{ margin: "14px 0px" }}>
            {matches && (
              <img
                src={RantikaLogo}
                onClick={() => goToHome()}
                alt="Logo"
                className="rantika-logo"
                style={{ marginLeft: "0px" }}
              />
            )}
            {!matches && (
              <img
                src={RantikaLogo}
                onClick={() => goToHome()}
                alt="Logo"
                className="rantika-logo"
                style={logoStyle}
              />
            )}
          </div>
          <div className="Navbar-box1-box">
            <div style={{ height: "25px" }} onClick={handleClick}>
              <img
                src={SearchImage}
                style={{ height: "30px", width: "30px" }}
                alt="search"
              />
            </div>
            <Link
              className="Navbar-link"
              to="/cart"
              style={{ textDecoration: "none", color: "rbg(0,0,0)" }}
            >
              <div style={{ height: "30px", width: "30px", margin: "0px 6px" }}>
                <img src={CartImage} alt="cart" />
              </div>
            </Link>
            <Link
              className="Navbar-link"
              to="/wishlist"
              style={{ textDecoration: "none", color: "rbg(0,0,0)" }}
            >
              <div style={{ height: "30px", width: "30px", margin: "0px 6px" }}>
                <img src={HeartImage} alt="wishlist" />
              </div>
            </Link>
            {!logged_in ? (
              <Link
                className="Navbar-link"
                to="/profile"
                style={{ textDecoration: "none", color: "rbg(0,0,0)" }}
              >
                <div
                  style={{ height: "30px", width: "30px", margin: "0px 6px" }}
                >
                  <img src={ProfileImage} alt="profile" />
                </div>
              </Link>
            ) : (
              // <div className="dropdown" onMouseLeave={handleMouseLeave}>
              //   <button
              //     className="custom-dropdown-button"
              //     onClick={toggleDropdown}
              //   >
              //     <div className="Profile-Box-Text" >
              //       {username.slice(0, 1).toUpperCase()}
              //     </div>
              //   </button>
              //   {isOpen && (
              //     <ul className="dropdown-menu">
              //       <li>
              //         <Link
              //           className="Navbar-link"
              //           to="/profile"
              //           style={{ textDecoration: "none" }}
              //         >
              //           Profile
              //         </Link>
              //       </li>
              //       <li>
              //         <Link
              //           className="Navbar-link"
              //           to="/order"
              //           style={{ textDecoration: "none" }}
              //         >
              //           Orders
              //         </Link>
              //       </li>
              //       <li>
              //         <Link
              //           className="Navbar-link"
              //           onClick={() => logOut()}
              //           style={{ textDecoration: "none" }}
              //         >
              //           Logout
              //         </Link>
              //       </li>
              //     </ul>
              //   )}
              // </div>
              <div
                className="dropdown rightMenu"
                onMouseLeave={handleMouseLeave}
                style={{ float: "right" }}
              >
                <div className="Profile-Box-Text" onClick={toggleDropdown}>
                  {username.slice(0, 1).toUpperCase()}
                </div>
                {isOpen && (
                  <ul className="dropdown-menu right-drop-menu">
                    <li>
                      <Link
                        className="Navbar-link"
                        to="/profile"
                        style={{ textDecoration: "none !important" }}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="Navbar-link"
                        to="/order"
                        style={{ textDecoration: "none !important" }}
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="Navbar-link"
                        onClick={() => logOut()}
                        style={{ textDecoration: "none !important" }}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          className="Navbar-box3"
          style={{ fontFamily: "Abhaya Libre", fontSize: "30px" }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "rbg(0,0,0)" }}>
            <div style={{ margin: "0px 35px" }}>Home</div>
          </Link>
          <div class="dropdown">
            <button
              class="dropbtn"
              style={{ color: "rbg(0,0,0)", backgroundColor: "#FFFFF3" }}
            >
              Category
            </button>
            {category?.length > 0 ? (
              <div class="dropdown-content">
                {category.map((cat) => {
                  return <a href={`/shop?type=${cat}`}>{cat}</a>;
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          {/* <Link
            to="/shop?type=All"
            style={{ textDecoration: "none", color: "#757575" }}
          >
            <div style={{ margin: "0px 35px" }}>Shop</div>
          </Link>
          <Link
            to="/customsize"
            style={{ textDecoration: "none", color: "#757575" }}
          >
            <div style={{ margin: "0px 35px" }}>Customize Size</div>
          </Link> */}
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "rbg(0,0,0)" }}
          >
            <div style={{ margin: "0px 35px", color: "rbg(0,0,0)" }}>
              Contact
            </div>
          </Link>
        </div>
      </section>

      {isShown && (
        <>
          <div className="SearchBox">
            <div onClick={handleClickClose} className="close"></div>
            <div className="d-flex flex-column w-100 align-items-center">
              <input
                type="text"
                placeholder="Search Products"
                onChange={onChange}
                className="searchInput"
                list="browsers"
              />
              {/* <div className="row" style={{ width: "100%", height: "100%" }}>
              {filterData?.length > 0 ? (
                filterData.map((element) => {
                  return (
                    <div
                      onClick={() => {
                        navigate(`/shop/${element.id}`);
                        setIsShown(false);
                      }}
                      className="col-md-3 my-3   Product-Small-Cards"
                      key={element.id}
                    >
                      <div className="Card">
                        <img
                          src={`${process.env.REACT_APP_SERVERNAME}${element?.attributes?.images?.data[0]?.attributes?.url}`}
                          onMouseOver={(e) =>
                            (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element.attributes?.images?.data[1]?.attributes?.url}`)
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element?.attributes?.images?.data[0]?.attributes?.url}`)
                          }
                          alt="ProductImage"
                          style={{
                            height: "258px",
                            width: "100%",
                            filter: !element?.attributes?.instock
                              ? "grayscale(1)"
                              : "grayscale(0)",
                          }}
                        />
                        <div>
                          <div
                            className="Card-Title"
                            style={{ color: "white" }}
                          >
                            {element?.attributes?.title?.length > 25
                              ? `${element?.attributes?.title?.slice(0, 25)}...`
                              : element?.attributes?.title}
                          </div>
                          <div
                            className="Card-Category"
                            style={{ color: "white" }}
                          >
                            {
                              element?.attributes?.category?.data?.attributes?.category
                            }
                          </div>
                          <div
                            className="Card-Description"
                            style={{ color: "white" }}
                          >
                            Rs. {element?.attributes?.price}
                          </div>
                        </div>
                      </div>

                      {!element?.attributes?.instock && (
                        <div
                          style={{
                            position: "absolute",
                            fontSize: "22px",
                            fontFamily: "Inter",
                            color: "white",
                            fontWeight: "800",
                          }}
                        >
                          OUT OF STOCK
                        </div>
                      )}
                    </div>
                  );
                })
              ) : query.length === 0 ? (
                <div
                  className="search-text"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "600",
                  }}
                >
                  Search For Products &nbsp;{" "}
                  <span
                    style={{ fontWeight: "600" }}
                    className="material-symbols-outlined search-text"
                  >
                    search
                  </span>
                </div>
              ) : (
                <div
                  className="search-text"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "600",
                  }}
                >
                  No Product Found
                </div>
              )}
            </div> */}
            </div>
          </div>

          <div className="resultList">
            <ul>
              {filterData?.length > 0 ? (
                filterData?.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        navigate(`/shop/${item.id}`);
                        setIsShown(false);
                      }}
                    >
                      <li>
                        <img
                          src={`${process.env.REACT_APP_SERVERNAME}${item?.attributes?.images?.data[0]?.attributes?.url}`}
                          className="w-10 h-10"
                        />
                        {item?.attributes?.title}
                      </li>
                    </div>
                  );
                })
              ) : (
                <li>No Product!</li>
              )}
            </ul>
          </div>
        </>
      )}

      <div id="whatsapp-button">
        {/* <div>
          
          
        </div> */}
        {showWhatsappCloud ? (
          <div class="nav_container">
            <div class="el d-flex">
              <a
                href="https://api.whatsapp.com/send?phone=8146351843"
                target="_blank"
                aria-describedby="a11y-new-window-external-message"
                rel="null noopener"
              >
                Hey Beautiful ! Need Help?
                <br /> Let's Chat...
              </a>
              <div onClick={closeWCloud} className="wclose"></div>
            </div>
          </div>
        ) : (
          ""
        )}
        <a href="https://wa.me/8146351843" target="_blank" rel="noreferrer">
          <span className="d-flex justify-content-end">
            <img
              src={Whatsapp}
              alt="whatsapp"
              style={{ height: "50px", width: "50px" }}
            />
          </span>
        </a>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.Products,
  logged_in: state.auth.logged_in,
  username: state?.auth?.user?.user?.username,
});

export default connect(mapStateToProps)(memo(Navbar));
