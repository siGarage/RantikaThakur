import { connect, useDispatch } from "react-redux";
import { memo, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Shop.css";
import WISHLIST from "../../API/Wishlist";
import { toast } from "react-toastify";
import constants from "../../constants";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import rupees from "../../Images/rupee-sign.svg";

function Shop(props) {
  // state variables of shop
  const [searchParams, setSearchParams] = useSearchParams();
  const { authtoken, products, logged_in } = props;
  const [priceFilter, setPriceFilter] = useState(0);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width:700px)").matches
  );
  const [ipadMatches, setIpadMatches] = useState(
    window.matchMedia("(max-width:1024px)").matches
  );
  const [ipadAirMatches, setIpadAirMatches] = useState(
    window.matchMedia("(max-width:820px)").matches
  );
  const [iMacMatches, setIMacMatches] = useState(
    window.matchMedia("(min-width:2560px)").matches
  );
  const [mobileRMatches, setMobileRMatches] = useState(
    window.matchMedia("(max-width:896px)").matches
  );
  const [airPadRMatches, setAirIpadRRMatches] = useState(
    window.matchMedia("(max-width:1180px)").matches
  );
  const [OSPadRMatches, setOSAirpadRRMatches] = useState(
    window.matchMedia("(width:1080px)").matches
  );

  const [sort, setSort] = useState("");
  const type = searchParams.get("type");
  const dispatch = useDispatch();
  let wishlist = props.wishlist;
  let { useremail } = props;

  const navigate = useNavigate();

  // Set categories
  let category = new Set([
    ...products.map(
      (element) => element?.attributes?.category?.data?.attributes?.category
    ),
  ]);

  category = ["All", ...category];

  let filter = [...category];

  //set price
  const price = [1000, 2000, 3000, 4000];

  // Add to Wishlist functionality
  const AddToWishlist = (data) => {
    const findData = wishlist.find(
      (element) =>
        Number(element?.attributes?.id_product) === Number(data?.id_product)
    );
    if (findData) {
      toast.success("Item Already In Wishlist!");
    } else {
      WISHLIST.addWishlistItems(data, authtoken).then((res) => {
        if (res.status === 200) {
          dispatch({
            type: constants("wishlist")?.reducers?.wishlist?.AddToWishlist,
            payload: { wishItems: [...wishlist, res?.data?.data] },
          });
        }
      });
    }
  };

  //filter by the fiter Items
  const filterItems = (value) => {
    navigate(`/shop?type=${value}`);
  };

  //sort by the fiter Items
  const sortItems = (value) => {
    setSort(value);
  };

  function compare(a, b) {
    if (a.attributes.title < b.attributes.title) {
      return -1;
    }
    if (a.attributes.title > b.attributes.title) {
      return 1;
    }
    return 0;
  }

  // Filter products data on the basis of category and price
  const filterData = useMemo(() => {
    if (products?.length > 0) {
      if (type !== "All") {
        if (sort?.length > 0) {
          let filtervalues = products?.filter(
            (element) =>
              element?.attributes?.category?.data?.attributes?.category === type
          );
          if (sort == "Alphabatically,A-Z") {
            return filtervalues.sort((a, b) => {
              let fa = a?.attributes?.title.toLowerCase(),
                fb = b?.attributes?.title.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            });
          }
          if (sort == "Alphabatically,Z-A") {
            return filtervalues.sort((a, b) => {
              let fa = a?.attributes?.title.toLowerCase(),
                fb = b?.attributes?.title.toLowerCase();
              if (fa > fb) {
                return -1;
              }
              if (fa < fb) {
                return 1;
              }
              return 0;
            });
          }
          if (sort == "Price,Low-High") {
            return filtervalues.sort(
              (firstItem, secondItem) =>
                firstItem?.attributes?.price - secondItem?.attributes?.price
            );
          }
          if (sort == "Price,High-Low") {
            return filtervalues
              .sort(
                (firstItem, secondItem) =>
                  firstItem?.attributes?.price - secondItem?.attributes?.price
              )
              .reverse();
          }
        } else {
          return products?.filter(
            (element) =>
              element?.attributes?.category?.data?.attributes?.category == type
          );
        }
      } else {
        let filtervalues2 = products;
        if (sort?.length > 0) {
          if (sort == "Alphabatically,A-Z") {
            return filtervalues2.sort((a, b) => {
              let fa = a?.attributes?.title.toLowerCase(),
                fb = b?.attributes?.title.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            });
          }
          if (sort == "Alphabatically,Z-A") {
            return filtervalues2.sort((a, b) => {
              let fa = a?.attributes?.title.toLowerCase(),
                fb = b?.attributes?.title.toLowerCase();
              if (fa > fb) {
                return -1;
              }
              if (fa < fb) {
                return 1;
              }
              return 0;
            });
          }
          if (sort == "Price,Low-High") {
            return filtervalues2.sort(
              (firstItem, secondItem) =>
                firstItem?.attributes?.price - secondItem?.attributes?.price
            );
          }
          if (sort == "Price,High-Low") {
            return filtervalues2
              .sort(
                (firstItem, secondItem) =>
                  firstItem?.attributes?.price - secondItem?.attributes?.price
              )
              .reverse();
          }
        } else {
          return filtervalues2;
        }
      }
    } else {
      return [];
    }
  }, [products, priceFilter, type, sortItems]);

  // Get Wishlist Data
  useEffect(() => {
    window
      .matchMedia("(max-width:700px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    window
      .matchMedia("(max-width:1024px)")
      .addEventListener("change", (e) => setIpadMatches(e.matches));
    window
      .matchMedia("(max-width:820px)")
      .addEventListener("change", (e) => setIpadAirMatches(e.matches));
    window
      .matchMedia("(min-width:2560px)")
      .addEventListener("change", (e) => setIMacMatches(e.matches));
    window
      .matchMedia("(max-width:896px)")
      .addEventListener("change", (e) => setMobileRMatches(e.matches));
    window
      .matchMedia("(max-width:1180px)")
      .addEventListener("change", (e) => setAirIpadRRMatches(e.matches));
    window
      .matchMedia("(width:1080px)")
      .addEventListener("change", (e) => setOSAirpadRRMatches(e.matches));

    if (logged_in) {
      if (wishlist.length === 0) {
        WISHLIST.getWishlistItems(useremail, authtoken).then((res) => {
          if (res.status === 200) {
            dispatch({
              type: constants("wishlist").reducers?.wishlist?.AddToWishlist,
              payload: { wishItems: res?.data?.data },
            });
          } else {
            toast.error("Server Side Error");
          }
        });
      }
    }
  }, [useremail, authtoken, dispatch, logged_in, wishlist?.length]);

  let wistItemsId = wishlist.map((element) =>
    Number(element?.attributes?.id_product)
  );

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const WishCartID = (id) => {
    for (let item of wishlist) {
      if (Number(item?.attributes?.id_product) === Number(id)) {
        return Number(item?.id);
      }
    }
  };

  const DeleteFromWishlist = (id, authtoken) => {
    WISHLIST.deleteWishlistItems(id, authtoken).then((res) => {
      if (res?.status === 200) {
        const wishdata = wishlist.filter((ele) => ele?.id !== id);
        dispatch({
          type: constants("wishlist")?.reducers?.wishlist?.AddToWishlist,
          payload: { wishItems: wishdata },
        });
      }
    });
  };

  return (
    <>
      <h1 className="d-flex justify-content-center ">{type}</h1>
      <hr className="new2"></hr>
      <div
        className={
          matches ? "filter-menu d-flex justify-content-center" : "filter-menu"
        }
      >
        <lable className="filter_class">FILTER BY:</lable>
        <select
          className="filterSelect"
          onChange={(e) => {
            filterItems(e.target.value);
          }}
        >
          <option value="All">Select Category</option>
          {filter.length > 0 ? (
            filter.map((fil) => {
              return (
                <option key={fil} value={fil}>
                  {fil?.toUpperCase()}
                </option>
              );
            })
          ) : (
            <option>No Filter</option>
          )}
        </select>
        <lable className="sort_class">SORT BY:</lable>
        <select
          className="filterSelect"
          onChange={(e) => {
            sortItems(e.target.value);
          }}
        >
          <option value="Alphabatically,A-Z">Sort Name & Price</option>
          <option value="Alphabatically,A-Z">Alphabatically,A-Z</option>
          <option value="Alphabatically,Z-A">Alphabatically,Z-A</option>
          <option value="Price,Low-High">Price,Low-High</option>
          <option value="Price,High-Low">Price,High-Low</option>
        </select>
      </div>

      <section className="Shop">
        {/* <div className="category">
          <div style={{ margin: "10px 0px" }}>
            <div style={{ fontWeight: "800" }}>Category</div>
            {category.map((element) => {
              return (
                <div key={element} className="Category-Filter">
                  <input
                    type="radio"
                    checked={element === type}
                    onChange={() => {
                      setSearchParams(`?type=${element}`);
                    }}
                    value={element}
                  />{" "}
                  {element}
                </div>
              );
            })}
          </div>

          <div style={{ margin: "10px 0px" }}>
            <div style={{ fontWeight: "800" }}>Prices</div>

            {price.map((element) => {
              return (
                <div key={element} className="Price-Filter">
                  <input
                    type="radio"
                    checked={element === priceFilter}
                    onChange={() => {
                      setPriceFilter(element);
                    }}
                    value={element}
                    key={element}
                  />{" "}
                  Over ₹{element}
                </div>
              );
            })}
          </div>
        </div> */}

        {products?.length === 0 ? (
          <div
            className="Product-Container"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <span className="loader"></span>
          </div>
        ) : (
          <div
            className="container"
            style={{
              width: matches ? "70%" : ipadAirMatches ? "" : "80%",
              paddingLeft: matches ? "0px" : ipadAirMatches ? "" : "50px",
            }}
          >
            <div className="row">
              {products?.length > 0 ? (
                <>
                  {filterData.map((element) => {
                    return (
                      <div
                        style={{ position: "relative", cursor: "pointer" }}
                        className={
                          ipadMatches
                            ? "col-md-6 my-4   Product-Small-Cards"
                            : "col-md-4 my-4   Product-Small-Cards"
                        }
                        key={element.id}
                      >
                        <div className="Card">
                          <div
                            onClick={() => {
                              navigate(`/shop/${element.id}`);
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_SERVERNAME}${element?.attributes?.images?.data[0]?.attributes?.url}`}
                              onMouseOver={(e) =>
                                (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element?.attributes?.images?.data[1]?.attributes?.url}`)
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element?.attributes?.images?.data[0]?.attributes?.url}`)
                              }
                              width={
                                matches
                                  ? "300px"
                                  : OSPadRMatches
                                  ? "250px"
                                  : mobileRMatches
                                  ? "300px"
                                  : ipadMatches
                                  ? "300spx"
                                  : airPadRMatches
                                  ? "280px"
                                  : "342px"
                              }
                              height={
                                ipadMatches
                                  ? "450px"
                                  : OSPadRMatches
                                  ? "375px"
                                  : "480px"
                              }
                              alt="ProductImage"
                              style={{
                                filter: !element?.attributes?.instock
                                  ? "grayscale(1)"
                                  : "grayscale(0)",
                                objectFit: "fill",
                              }}
                            />
                          </div>
                          <div className="d-flex pe-1">
                            <div
                              className="col-10"
                              onClick={() => {
                                navigate(`/shop/${element.id}`);
                              }}
                            >
                              <div className="Card-Title">
                                {element?.attributes?.title?.length > 25
                                  ? `${element?.attributes?.title.slice(
                                      0,
                                      25
                                    )}...`
                                  : element?.attributes?.title}
                              </div>
                              <div className="Card-Category">
                                {
                                  element?.attributes?.category?.data
                                    ?.attributes?.category
                                }
                              </div>
                              <div className="Card-Description">
                                ₹ {numberWithCommas(element?.attributes?.price)}
                              </div>
                            </div>
                            {iMacMatches ? (
                              <div
                                className="d-flex col-2"
                                style={{ marginLeft: "-11px" }}
                              >
                                {logged_in ? (
                                  wistItemsId.includes(element?.id) ? (
                                    <div>
                                      <FavoriteIcon
                                        style={{ color: "red" }}
                                        onClick={() => {
                                          DeleteFromWishlist(
                                            WishCartID(element?.id),
                                            authtoken
                                          );
                                        }}
                                      ></FavoriteIcon>
                                    </div>
                                  ) : (
                                    <div>
                                      <FavoriteBorderIcon
                                        onClick={() => {
                                          AddToWishlist(
                                            {
                                              email: useremail,
                                              title: element?.attributes?.title,
                                              price: element?.attributes?.price,
                                              category:
                                                element?.attributes?.category
                                                  ?.data?.attributes?.category,
                                              id_product: element.id,
                                              image: `${element?.attributes?.images?.data[0]?.attributes?.url}`,
                                              size: element?.attributes?.sizes?.data.map(
                                                (element) =>
                                                  element?.attributes?.size
                                              ),
                                            },
                                            authtoken
                                          );
                                        }}
                                      ></FavoriteBorderIcon>
                                    </div>
                                  )
                                ) : (
                                  <div>
                                    <FavoriteBorderIcon
                                      onClick={() => {
                                        navigate(`/login`);
                                      }}
                                    ></FavoriteBorderIcon>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="d-flex col-2 ps-3">
                                {logged_in ? (
                                  wistItemsId.includes(element?.id) ? (
                                    <div>
                                      <FavoriteIcon
                                        style={{ color: "red" }}
                                        onClick={() => {
                                          DeleteFromWishlist(
                                            WishCartID(element?.id),
                                            authtoken
                                          );
                                        }}
                                      ></FavoriteIcon>
                                    </div>
                                  ) : (
                                    <div>
                                      <FavoriteBorderIcon
                                        onClick={() => {
                                          AddToWishlist(
                                            {
                                              email: useremail,
                                              title: element?.attributes?.title,
                                              price: element?.attributes?.price,
                                              category:
                                                element?.attributes?.category
                                                  ?.data?.attributes?.category,
                                              id_product: element.id,
                                              image: `${element?.attributes?.images?.data[0]?.attributes?.url}`,
                                              size: element?.attributes?.sizes?.data.map(
                                                (element) =>
                                                  element?.attributes?.size
                                              ),
                                            },
                                            authtoken
                                          );
                                        }}
                                      ></FavoriteBorderIcon>
                                    </div>
                                  )
                                ) : (
                                  <div>
                                    <FavoriteBorderIcon
                                      onClick={() => {
                                        navigate(`/login`);
                                      }}
                                    ></FavoriteBorderIcon>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {!element?.attributes?.instock && (
                          <div className="out-of-stock">OUT OF STOCK</div>
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                "No Data Found"
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state?.product?.Products,
  useremail: state?.auth?.user?.user?.email,
  authtoken: state?.auth?.user.jwt,
  logged_in: state?.auth?.logged_in,
  wishlist: state?.wishlist?.wishItems,
});
export default connect(mapStateToProps)(memo(Shop));
