import { useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import "./YouMayLike.css";
import { connect } from "react-redux";
function Like(props) {
  const navigate = useNavigate();

  const { products } = props;
  const shuffled = products?.sort(() => 0.5 - Math.random());
  let array = shuffled?.slice(0, 4);
  const [ipadMatches, setIpadMatches] = useState(
    window.matchMedia("(max-width:1024px)").matches
  );
  const [ipadAirMatches, setIpadAirMatches] = useState(
    window.matchMedia("(max-width:820px)").matches
  );
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width:700px)").matches
  );
  const [airPadRMatches, setAirIpadRRMatches] = useState(
    window.matchMedia("(max-width:1180px)").matches
  );
  const [iPadProRMatches, setIpadProRRMatches] = useState(
    window.matchMedia("(max-height:1024px)").matches
  );
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    window
      .matchMedia("(max-width:1024px)")
      .addEventListener("change", (e) => setIpadMatches(e.matches));
    window
      .matchMedia("(max-height:1024px)")
      .addEventListener("change", (e) => setIpadProRRMatches(e.matches));
    window
      .matchMedia("(max-width:700px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    window
      .matchMedia("(max-width:1180px)")
      .addEventListener("change", (e) => setAirIpadRRMatches(e.matches));
  }, []);
  return (
    <>
      {products?.length > 0 && (
        <section className="Like">
          <div className="container">
            <div
              className={matches ? "Card text-center" : ""}
              style={{
                fontFamily: "Abhaya Libre",
                fontSize: "40px",
                fontWeight: "400",
              }}
            >
              You may also like
            </div>
            {array?.length > 0 ? (
              <div className="row">
                {console.log(
                  ipadMatches,
                  ipadAirMatches,
                  airPadRMatches,
                  iPadProRMatches
                )}
                {array.map((element) => {
                  return (
                    <div
                      onClick={() => {
                        navigate(`/shop/${element?.id}`);
                      }}
                      className={
                        ipadMatches ||
                        ipadAirMatches ||
                        airPadRMatches ||
                        iPadProRMatches
                          ? "col-md-4 my-4"
                          : "col-md-3 my-3"
                      }
                      key={element?.id}
                    >
                      <div className={matches ? "Card text-center" : "Card"}>
                        <img
                          src={`${process.env.REACT_APP_SERVERNAME}${element?.attributes?.images?.data[0]?.attributes?.url}`}
                          onMouseOver={(e) =>
                            (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element?.attributes?.images?.data[1]?.attributes?.url}`)
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element?.attributes?.images?.data[0]?.attributes?.url}`)
                          }
                          alt="ProductImage"
                          style={
                            matches
                              ? { height: "95%", width: "80%" }
                              : ipadMatches
                              ? { height: "90%", width: "90%" }
                              : { height: "400px", width: "90%" }
                          }
                        />
                        <div>
                          <div className="Card-Title">
                            {element?.attributes?.title?.length > 25
                              ? `${element?.attributes?.title.slice(0, 25)}...`
                              : element?.attributes?.title}
                          </div>
                          <div className="Card-Category">
                            {
                              element?.attributes?.category?.data?.attributes
                                ?.category
                            }
                          </div>
                          <div className="Card-Description">
                            ₹ {numberWithCommas(element?.attributes?.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              "No Data"
            )}
          </div>
        </section>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.Products,
});
export default connect(mapStateToProps)(memo(Like));
