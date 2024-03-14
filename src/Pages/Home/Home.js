import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
// import Carousel from "react-multi-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import h1 from "../../Images/h1.png";
import h2 from "../../Images/h2.png";
import h3 from "../../Images/h3.png";
import h5 from "../../Images/h5.PNG";
import h6 from "../../Images/h6.PNG";
import h7 from "../../Images/h7.PNG";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

function Home(props) {
  const { products } = props;
  const data = products?.filter(
    (element) => element?.attributes?.bestseller === true
  );
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const navigate = useNavigate();

  let category = new Set([
    ...products.map(
      (element) => element?.attributes?.category?.data?.attributes?.category
    ),
  ]);
  category = [...category];
  const shuffled = category?.sort(() => 0.5 - Math.random());
  let array = shuffled.slice(0, 5);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const gotoShop = () => {
    navigate(`/shop?type=All`);
  };
  return (
    <section className="Home">
      <div className="Home-Box1 w-100">
        <Swiper
          navigation={true}
          className="mySwiper"
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop
          modules={[Autoplay, Navigation]}
        >
          <SwiperSlide>
            {" "}
            <div
              onClick={() => {
                gotoShop();
              }}
            >
              <img src={h1} className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div
              onClick={() => {
                gotoShop();
              }}
            >
              <img src={h2} className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div
              onClick={() => {
                gotoShop();
              }}
            >
              <img src={h3} className="w-100" />
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>
            {" "}
            <div
              onClick={() => {
                gotoShop();
              }}
            >
              <img src={h4} className="w-100" />
            </div>
          </SwiperSlide> */}
          <SwiperSlide>
            {" "}
            <div
              onClick={() => {
                gotoShop();
              }}
            >
              <img src={h5} className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div
              onClick={() => {
                gotoShop();
              }}
            >
              <img src={h6} className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div
              onClick={() => {
                gotoShop();
              }}
            >
              <img src={h7} className="w-100" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="Home-Box2">
        <div className="Home-Box2-Box1">BEST SELLERS</div>
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={2000}
          className="multi-carousel-container"
          infinite={true}
        >
          {data.map((element) => {
            return (
              <div
                style={{ position: "relative", cursor: "pointer" }}
                className=" Product-Small-Cards"
                key={element.id}
              >
                <div
                  style={{ width: "80%" }}
                  onClick={() => {
                    navigate(`/shop/${element.id}`);
                  }}
                >
                  <img
                    className="carousel-best-image"
                    src={`${process.env.REACT_APP_SERVERNAME}${element?.attributes?.images?.data[0]?.attributes?.url}`}
                    onMouseOver={(e) =>
                      (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element?.attributes?.images?.data[1]?.attributes?.url}`)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element?.attributes?.images?.data[0]?.attributes?.url}`)
                    }
                    alt="ProductImage"
                    style={{
                      filter: !element?.attributes?.instock
                        ? "grayscale(1)"
                        : "grayscale(0)",
                    }}
                  />

                  <div>
                    <div className="Card-Title">
                      {element?.attributes?.title?.length > 25
                        ? `${element?.attributes?.title?.slice(0, 25)}...`
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
        </Carousel>
      </div>

      <div className="Home-Box3">
        <div className="Home-Box3-Box1">Shop By Category</div>
        <div className="Home-Box3-Box1-Box">
          <div className="Home-Box3-Box1-Box-InnerBox1">
            {/* clothesTypesBox1 */}
            <div
              className="clothesTypesBox1"
              onClick={() => navigate("/shop?type=Dresses")}
            >
              {/* <div className="clothesTypesBox1-Box1">{array[0]}</div> */}
              <div></div>
              {/* <div
                onClick={() => {
                  navigate({
                    pathname: "/shop",
                    search: `?type=${array[0]}`,
                  });
                }}
                className="clothesTypes-Button"
                style={{ textDecoration: "none" }}
              >
                <input type="radio" name="category" value="men's clothing" />
                Button
              </div> */}
            </div>

            {/* clothesTypesBox2 */}
            <div
              className="clothesTypesBox2"
              onClick={() => navigate("/shop?type=Co-ordinates")}
            >
              {/* <div className="clothesTypesBox1-Box1">{array[1]}</div> */}
              <div></div>
              {/* <div
                onClick={() => {
                  navigate({
                    pathname: "/shop",
                    search: `?type=${array[1]}`,
                  });
                }}
                className="clothesTypes-Button"
                style={{ textDecoration: "none" }}
              >
                <input type="radio" name="category" value="men's clothing" />
                Button
              </div> */}
            </div>
          </div>

          {/* clothesTypesBox3 */}
          <div
            className="clothesTypesBox3"
            onClick={() => navigate("/shop?type=All")}
          >
            {/* <div className="clothesTypesBox1-Box1">{array[2]}</div> */}
            <div></div>
            {/* <div
              onClick={() => {
                navigate({
                  pathname: "/shop",
                  search: `?type=${array[2]}`,
                });
              }}
              className="clothesTypes-Button"
              style={{ textDecoration: "none" }}
            >
              <input type="radio" name="category" value="men's clothing" />
              Button
            </div> */}
          </div>

          <div className="Home-Box3-Box1-Box-InnerBox1 Home-Box3-Box1-Box-InnerBox1-ipad">
            {/* clothesTypesBox4 */}
            <div
              className="clothesTypesBox4"
              onClick={() => navigate("/shop?type=Shirts")}
            >
              {/* <div className="clothesTypesBox1-Box1">{array[3]}</div> */}
              <div></div>
              {/* <div
                onClick={() => {
                  navigate({
                    pathname: "/shop",
                    search: `?type=${array[3]}`,
                  });
                }}
                className="clothesTypes-Button"
                style={{ textDecoration: "none" }}
              >
                <input type="radio" name="category" value="men's clothing" />
                Button
              </div> */}
            </div>

            {/* clothesTypesBox5 */}
            <div
              className="clothesTypesBox5"
              onClick={() => navigate("/shop?type=Skirts")}
            >
              {/* <div className="clothesTypesBox1-Box1">{array[4]}</div> */}
              <div></div>
              {/* <div
                onClick={() => {
                  navigate({
                    pathname: "/shop",
                    search: `?type=${array[4]}`,
                  });
                }}
                className="clothesTypes-Button"
                style={{ textDecoration: "none" }}
              >
                <input type="radio" name="category" value="men's clothing" />
                Button
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.Products,
});
export default connect(mapStateToProps)(memo(Home));
