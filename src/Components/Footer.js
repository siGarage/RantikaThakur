import "./Footer.css";
import image1 from "../Images/image1.svg";
import image2 from "../Images/image2.svg";
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
                margin: "20px 0px 0px 0px",
              }}
            >
              <div className="col">
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
              <div className="col">
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

                <Link to="/shippingpolicy" style={{ textDecoration: "none" }}>
                  {" "}
                  <div
                    style={{
                      fontSize: "14px",
                      margin: "8px 0px",
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    Shipping Policy
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
              <div className="col">
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
              <div className="col">
                <div
                  style={{
                    margin: "0px 0px 18px 0px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  FOLLOW US OUT THERE
                </div>

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
          </div>
        </div>
        <div className="row w-100">
          <div className="col">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "500",
                fontFamily: "Roboto",
                color: "white",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              Rantika Thakur Clothing All Rights Reserved © 2024 <br />
              Developed by &nbsp;
              <a href="http://silicongarage.in/" className="silicon-garage">
                {" "}
                Silicon Garage
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
