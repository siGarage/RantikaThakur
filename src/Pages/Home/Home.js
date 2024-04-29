import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
// import Carousel from "react-multi-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselSingle from "react-bootstrap/Carousel";
import quotes from "../../Images/quotes.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import h1 from "../../Images/h1.png";
import h2 from "../../Images/h2.png";
import h5 from "../../Images/h5.jpeg";
import h6 from "../../Images/h6.PNG";
import h7 from "../../Images/h7.PNG";
import scissor from "../../Images/scissors.png";
import india from "../../Images/Made_In_India.png";
import luxury from "../../Images/luxury.png";
import time from "../../Images/Timeless_Design.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import dress from "../../Images/dresses.jpeg";
import coOrds from "../../Images/co-ords.jpeg";
import shirts from "../../Images/shirts.jpeg";
import skirts from "../../Images/skirts.jpeg";
import h4 from "../../Images/s_mid.PNG";

function Home(props) {
  const [testimonials, setTestimonials] = useState([]);
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
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width:700px)").matches
  );
  const [ipadMatches, setIpadMatches] = useState(
    window.matchMedia("(max-width:1024px)").matches
  );
  const [ipadAirMatches, setIpadAirMatches] = useState(
    window.matchMedia("(max-width:820px)").matches
  );
  const shuffled = category?.sort(() => 0.5 - Math.random());
  let array = shuffled.slice(0, 5);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const gotoShop = () => {
    navigate(`/shop?type=All`);
  };
  useEffect(() => {
    window
      .matchMedia("(max-width:700px)")
      .addEventListener("change", (e) => setMatches(e.matches));

    window
      .matchMedia("(max-width:820px)")
      .addEventListener("change", (e) => setIpadAirMatches(e.matches));
    window
      .matchMedia("(max-width:810px)")
      .addEventListener("change", (e) => setIpadAirMatches(e.matches));
    window
      .matchMedia("(max-width:1024px)")
      .addEventListener("change", (e) => setIpadMatches(e.matches));
    if (testimonials?.length == 0) {
      fetch(`${process.env.REACT_APP_SERVERNAME}/api/testiminials`)
        .then((response) => response.json())
        .then((data) => setTestimonials(data.data));
    }
  }, []);
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
          {/* <SwiperSlide>
            {" "}
            <div
              onClick={() => {
                gotoShop();
              }}
            >
              <img src={h3} className="w-100" />
            </div>
          </SwiperSlide> */}
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
        <div className="Home-Box2-Box1">- BEST SELLERS -</div>
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
        <div className="Home-Box3-Box1">- SHOP BY CATEGORY -</div>
        {matches || ipadMatches ? (
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <img
                src={dress}
                className={matches ? "widthFixForMImage" : "widthFixForPImage"}
                onClick={() => navigate("/shop?type=Dresses")}
              />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <img
                src={coOrds}
                className={matches ? "widthFixForMImage" : "widthFixForPImage"}
                onClick={() => navigate("/shop?type=Co-ord sets")}
              />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <img
                src={h4}
                className={matches ? "widthFixForMImage" : "widthFixForPImage"}
                onClick={() => navigate("/shop?type=All")}
              />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <img
                src={shirts}
                className={matches ? "widthFixForMImage" : "widthFixForPImage"}
                onClick={() => navigate("/shop?type=Shirts")}
              />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <img
                src={skirts}
                className={matches ? "widthFixForMImage" : "widthFixForPImage"}
                onClick={() => navigate("/shop?type=Skirts")}
              />
            </div>
          </div>
        ) : (
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
                onClick={() => navigate("/shop?type=Co-ord sets")}
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
        )}
      </div>
      <div className="Home-Box6">
        <div className="row text-center">
          {matches ? (
            <>
              <div className="col-6">
                <img
                  src={scissor}
                  width={matches ? 30 : ipadAirMatches ? 40 : 60}
                  height={matches ? 30 : ipadAirMatches ? 40 : 60}
                />
                <br />
                CUSTOMISE NOW
              </div>
              <div className="col-6">
                <img
                  src={india}
                  width={matches ? 30 : ipadAirMatches ? 40 : 60}
                  height={matches ? 30 : ipadAirMatches ? 40 : 60}
                />
                <br />
                MADE IN INDIA
              </div>
              <div className="col-6 pt-4">
                <img
                  src={luxury}
                  width={matches ? 30 : ipadAirMatches ? 40 : 60}
                  height={matches ? 30 : ipadAirMatches ? 40 : 60}
                />
                <br />
                AFFORDABLE LUXURY
              </div>
              <div className={matches ? "col-6 pt-4" : "col"}>
                <img
                  src={time}
                  width={matches ? 30 : ipadAirMatches ? 40 : 60}
                  height={matches ? 30 : ipadAirMatches ? 40 : 60}
                />
                <br />
                TIMELESS DESIGN
              </div>
            </>
          ) : (
            <>
              <div className="col ">
                <img
                  src={scissor}
                  width={matches ? 30 : ipadAirMatches ? 40 : 60}
                  height={matches ? 30 : ipadAirMatches ? 40 : 60}
                />
                <br />
                CUSTOMISE NOW
              </div>
              <div className="col">
                <img
                  src={india}
                  width={matches ? 30 : ipadAirMatches ? 40 : 60}
                  height={matches ? 30 : ipadAirMatches ? 40 : 60}
                />
                <br />
                MADE IN INDIA
              </div>
              <div className="col">
                <img
                  src={luxury}
                  width={matches ? 30 : ipadAirMatches ? 40 : 60}
                  height={matches ? 30 : ipadAirMatches ? 40 : 60}
                />
                <br />
                AFFORDABLE LUXURY
              </div>
              <div className={matches ? "col pt-2" : "col"}>
                <img
                  src={time}
                  width={matches ? 30 : ipadAirMatches ? 40 : 60}
                  height={matches ? 30 : ipadAirMatches ? 40 : 60}
                />
                <br />
                TIMELESS DESIGN
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className="Home-Box5 w-100 p-2"
        style={matches ? { height: "430px" } : { height: "400px" }}
      >
        <div className="Home-Box2-Box5">
          {matches ? "OUR TESTIMONIALS" : "- OUR TESTIMONIALS -"}
        </div>
        <CarouselSingle
          data-bs-theme="dark"
          indicators={false}
          controls={false}
        >
          {testimonials?.length !== 0
            ? testimonials?.map((item) => {
                return (
                  <CarouselSingle.Item>
                    <div className="row testimonial">
                      <div className="col d-flex justify-content-center flex-column">
                        <div className="row ">
                          <div className="col">
                            <br />
                            <img src={quotes} width={30} height={30} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-center">
                            <p>
                              <br />
                            </p>
                            <p>{item.attributes.Description}</p>
                            <p>
                              <br />
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-center">
                            <p>
                              <strong>- {item.attributes.Name}</strong>
                            </p>
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselSingle.Item>
                );
              })
            : ""}
        </CarouselSingle>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.Products,
});
export default connect(mapStateToProps)(memo(Home));
