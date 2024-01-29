import "./Footer.css";
import image1 from "../Images/image1.svg";
import image2 from "../Images/image2.svg";
import mii from "../Images/made-in-india.png";
import si from "../Images/scissors.png";
import re from "../Images/png_clipart_semicircle_arrow_clockwise_arrows_circle_arrows_circle.png";
import rm from "../Images/image-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <section className="Footer">
        <div className="Footer-inner-box">
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                color: "white",
                margin: "20px 0px 20px 0px",
              }}
            >
              <div style={{ width: "32%" }}>
                <div style={{ margin: "0px 0px 18px 0px", fontSize: "16px" }}>
                  QUICK LINKS
                </div>
                <Link
                  to="/shop/?type=All"
                  onClick={window.scrollTo(0, 0)}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      margin: "8px 0px",
                      color: "white",
                    }}
                  >
                    Shop
                  </div>
                </Link>
                <Link to="/about" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      margin: "8px 0px",
                      color: "white",
                    }}
                  >
                    About
                  </div>
                </Link>
                <Link to="/customsize" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      margin: "8px 0px",
                      color: "white",
                    }}
                  >
                    Customize Size
                  </div>
                </Link>
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      margin: "8px 0px",
                      color: "white",
                    }}
                  >
                    Contact Us
                  </div>
                </Link>
              </div>

              <div style={{ width: "32%" }}>
                <div
                  style={{
                    margin: "0px 0px 18px 0px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  USEFUL LINKS
                </div>
                <Link to="/privacypolicy" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      margin: "8px 0px",
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    Privacy Policy
                  </div>
                </Link>
                <Link to="/exchangepolicy" style={{ textDecoration: "none" }}>
                  {" "}
                  <div
                    style={{
                      fontSize: "14px",
                      margin: "8px 0px",
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    Exchange Policy
                  </div>
                </Link>
                <Link
                  to="/termsandcondition"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <div
                    style={{
                      fontSize: "14px",
                      margin: "8px 0px",
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    Terms and Conditions
                  </div>
                </Link>
              </div>

              <div style={{ width: "32%" }}>
                <div
                  style={{
                    margin: "0px 0px 18px 0px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  SHOP
                </div>
                <div
                  onClick={() => {
                    navigate({
                      pathname: "/shop",
                      search: `?type=${"Shirts"}`,
                    });
                    window.scrollTo(0, 0);
                  }}
                  style={{
                    fontSize: "14px",
                    margin: "8px 0px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Shirts
                </div>

                <div
                  onClick={() => {
                    navigate({
                      pathname: "/shop",
                      search: `?type=${"Skirts"}`,
                    });
                    window.scrollTo(0, 0);
                  }}
                  style={{
                    fontSize: "14px",
                    margin: "8px 0px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Skirts
                </div>
                <div
                  onClick={() => {
                    navigate({
                      pathname: "/shop",
                      search: `?type=${"Tops"}`,
                    });
                    window.scrollTo(0, 0);
                  }}
                  style={{
                    fontSize: "14px",
                    margin: "8px 0px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Tops
                </div>
                <div
                  onClick={() => {
                    navigate({
                      pathname: "/shop",
                      search: `?type=${"Dresses"}`,
                    });
                    window.scrollTo(0, 0);
                  }}
                  style={{
                    fontSize: "14px",
                    margin: "8px 0px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Dresses
                </div>
              </div>

              <div style={{ width: "10%" }}>
                <div className="v1"></div>
              </div>
              <div style={{ width: "32%" }} className="mdi">
                <div>
                  <div className="pb-2 d-flex">
                    <img src={mii} width={40} height={40} />
                    <div className="ps-5">Made In India</div>
                  </div>
                  <div className="pb-2 d-flex ">
                    <img src={si} width={40} height={40} />
                    <div className="ps-5">Customise Now</div>
                  </div>
                  <div className="pb-2 d-flex ">
                    <img src={re} width={40} height={40} />
                    <div className="ps-5">Easy Return</div>
                  </div>
                  <div className="pb-2 d-flex ">
                    <img src={rm} width={40} height={40} />
                    <div className="ps-5">Affordable Luxury</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "20%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItem: "center",
                justifyContent: "space-between",
                width: "50%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px 0px 20px 0px",
                }}
              >
                <a
                  href="https://www.instagram.com/rantikathakurclothing?igsh=bmNjem5pNzQ5bzJw"
                  target="blank"
                >
                  <div style={{ margin: "0px 10px" }}>
                    <img
                      src={image1}
                      style={{ height: "25px", width: "25px" }}
                      alt="Twitter"
                    />
                  </div>
                </a>
                <a
                  href="https://www.facebook.com/Rantikathakurclothing"
                  target="blank"
                >
                  <div style={{ margin: "0px 10px" }}>
                    <img
                      src={image2}
                      style={{ height: "25px", width: "25px" }}
                      alt="Facebook"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "95%",
            height: "20%",
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Roboto",
              color: "white",
            }}
          >
            © 2024 Developed by{" "}
            <a href="http://silicongarage.in/"> Silicon Garage</a>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "40%",
              fontWeight: "500",
              fontFamily: "Roboto",
              color: "white",
            }}
          >
            All rights reserved
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
