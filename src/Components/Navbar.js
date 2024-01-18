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

  const onChange = (e) => {
    setQuery(e.target.value);
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

  const handleClickClose = (event) => {
    setIsShown(false);
  };

  // Set categories
  let category = new Set([
    ...products.map(
      (element) => element?.attributes?.category?.data?.attributes?.category
    ),
  ]);
  category = ["All", ...category];

  useEffect(() => {
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
        AVAIL 5% OFF ON PREPAID ORDERS.
      </Marquee>
      <section className="Navbar">
        <div className="Navbar-box1">
          <div>
            <Hamberger />
          </div>
          <div className="Navbar-box1-box">
            <div
              style={{
                height: "35px",
                width: "100%",
                borderRadius: "7px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #B0B0B0",
                margin: "0px 6px",
                padding: "2px 5px",
              }}
            >
              <div style={{ height: "25px", width: "20%" }}>
                <img
                  src={SearchImage}
                  style={{ height: "20px" }}
                  alt="search"
                />
              </div>
              <input
                type="text"
                placeholder="Search Products"
                onClick={handleClick}
                onChange={onChange}
                style={{
                  height: "28px",
                  border: "none",
                  backgroundColor: "#FFFFF3",
                }}
              />
            </div>
            <Link
              className="Navbar-link"
              to="/cart"
              style={{ textDecoration: "none", color: "#757575" }}
            >
              <div style={{ height: "30px", width: "30px", margin: "0px 6px" }}>
                <img src={CartImage} alt="cart" />
              </div>
            </Link>
            <Link
              className="Navbar-link"
              to="/wishlist"
              style={{ textDecoration: "none", color: "#757575" }}
            >
              <div style={{ height: "30px", width: "30px", margin: "0px 6px" }}>
                <img src={HeartImage} alt="wishlist" />
              </div>
            </Link>
            {!logged_in ? (
              <Link
                className="Navbar-link"
                to="/profile"
                style={{ textDecoration: "none", color: "#757575" }}
              >
                <div
                  style={{ height: "30px", width: "30px", margin: "0px 6px" }}
                >
                  <img src={ProfileImage} alt="profile" />
                </div>
              </Link>
            ) : (
              <Link
                className="Navbar-link"
                to="/profile"
                style={{ textDecoration: "none" }}
              >
                <div className="Profile-Box-Text">
                  {username.slice(0, 1).toUpperCase()}
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="Navbar-box2" style={{ margin: "14px 0px" }}>
          <img src={RantikaLogo} alt="Logo" />
        </div>
        <div
          className="Navbar-box3"
          style={{ fontFamily: "Abhaya Libre", fontSize: "30px" }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "#757575" }}>
            <div style={{ margin: "0px 35px" }}>Home</div>
          </Link>
          <div class="dropdown">
            <button
              class="dropbtn"
              style={{ color: "#757575", backgroundColor: "#FFFFF3" }}
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
            style={{ textDecoration: "none", color: "#757575" }}
          >
            <div style={{ margin: "0px 35px" }}>Contact</div>
          </Link>
        </div>
      </section>

      {isShown && (
        <div className="SearchBox">
          <div onClick={handleClickClose} className="close"></div>
          <div className="row" style={{ width: "100%", height: "100%" }}>
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
                        src={`${process.env.REACT_APP_SERVERNAME}${element?.attributes.images.data[0]?.attributes.url}`}
                        onMouseOver={(e) =>
                          (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[1].attributes.url}`)
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element?.attributes.images.data[0]?.attributes.url}`)
                        }
                        alt="ProductImage"
                        style={{
                          height: "258px",
                          width: "100%",
                          filter: !element.attributes.instock
                            ? "grayscale(1)"
                            : "grayscale(0)",
                        }}
                      />
                      <div>
                        <div className="Card-Title" style={{ color: "white" }}>
                          {element?.attributes.title.length > 25
                            ? `${element?.attributes.title.slice(0, 25)}...`
                            : element.attributes.title}
                        </div>
                        <div
                          className="Card-Category"
                          style={{ color: "white" }}
                        >
                          {
                            element?.attributes.category.data?.attributes
                              .category
                          }
                        </div>
                        <div
                          className="Card-Description"
                          style={{ color: "white" }}
                        >
                          Rs. {element?.attributes.price}
                        </div>
                      </div>
                    </div>

                    {!element?.attributes.instock && (
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
          </div>
        </div>
      )}

      <div id="whatsapp-button">
        {/* <div>
          
          
        </div> */}
        <div class="nav_container">
          <div class="el">
            <a
              href="https://api.whatsapp.com/send?phone=9041999489"
              target="_blank"
              aria-describedby="a11y-new-window-external-message"
              rel="null noopener"
            >
              Hey Beautiful ! Need Help?
              <br /> Let's Chat...
            </a>
          </div>
        </div>
        <a href="https://wa.me/9041999489" target="_blank" rel="noreferrer">
          <span>
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
