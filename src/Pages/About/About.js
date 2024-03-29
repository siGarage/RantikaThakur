import "./About.css";
import SideImage from "../../Images/IMG_2973.jpeg";
import Video from "../../Images/rantika-thakur.mp4";
import { useEffect, useState } from "react";
function About() {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width:2560px)").matches
  );
  useEffect(() => {
    window
      .matchMedia("(min-width:2560px")
      .addEventListener("change", (e) => setMatches(e.matches));
    var video = document.getElementById("myVideo");
    video.oncanplaythrough = function () {
      video.muted = true;
      video.play();
    };
  }, []);

  return (
    <section className="About">
      <div className="About-Box1">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "95%",
            height: "100%",
            borderBottom: "1px solid #BD9334",
            padding: "52px 0px",
          }}
        >
          <div
            className={
              matches ? "About-Box1-Box1 text-center" : "About-Box1-Box1"
            }
          >
            <img
              src={SideImage}
              alt="SideImage"
              style={{ height: "100%", width: `${matches ? "58%" : "84%"}` }}
            />
          </div>
          <div className="About-Box1-Box2">
            <div
              style={{
                fontFamily: "Abhaya Libre",
                fontWeight: "400",
                fontSize: "30px",
                color: "#BD9334",
                margin: "0px 0px 10px 0px",
                textAlign: "center",
              }}
            >
              ~We are Rantika Thakur Clothing ~
            </div>
            <div
              style={{
                fontFamily: "Abhaya Libre",
                fontWeight: "400",
                fontSize: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                textAlign: "left",
              }}
            >
              Rantika Thakur Clothing was established on 2022 by our founder
              Rantika wanting to create a brand for girls just like her.
              Designer clothes were always so pricey, and she felt a strong
              desire to change that.
              <br />
              <br /> That's why she started her own fashion brand, bringing the
              latest runway trends to you at guilt-free prices. So, with rantika
              thakur clothing, you can now stay on trend and be the prettiest
              version of yourself without breaking the bank. We are all about
              making fashion fun, affordable, and accessible for everyone.
              <br />
              <br /> Now you can enjoy the latest fashion without feeling guilty
              about the price tag, ensuring you look your best whenever you
              want!
            </div>
          </div>
        </div>
      </div>

      <div className="About-Box2">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              fontFamily: "Abhaya Libre",
              fontWeight: "400",
              fontSize: "30px",
              color: "#BD9334",
              margin: "0px 0px 30px 0px",
            }}
          >
            ~About The founder~
          </div>
          <div className="row w-100">
            <div
              className={
                matches
                  ? "col-lg-6 col-sm-12 col-xs-12 text-center"
                  : "col-lg-6 col-sm-12 col-xs-12"
              }
            >
              <video autoplay muted loop controls id="myVideo">
                <source src={Video} type="video/mp4" />
              </video>
            </div>
            <div className="col-lg-6 col-sm-12 col-xs-12">
              <div
                style={{
                  fontFamily: "Abhaya Libre",
                  fontWeight: "400",
                  fontSize: "24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  textAlign: "left",
                  marginLeft: `${matches ? "-100px" : ""}`,
                }}
              >
                Founded by Rantika Thakur, who's a blogger turned entrepreneur.
                <br />
                <br /> Professionally Rantika started her career in fashion at
                18, as a blogger while pursuing her degree in fashion. Soon
                after completing her Masters in fashion Rantika Thakur Clothing
                was born.
                <br />
                <br />
              </div>{" "}
            </div>
          </div>
          {/* <div style={{ width: "100%", height: "500px", margin: "50px 18px" }}>
            <img
              src={SideImage}
              alt="SideImage"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div
            style={{
              fontFamily: "Abhaya Libre",
              fontWeight: "400",
              fontSize: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              textAlign: "left",
            }}
          >
            Founded by Rantika Thakur, who's a blogger turned entrepreneur.
            <br />
            <br /> Professionally Rantika started her career in fashion at 18,
            as a blogger while pursuing her degree in fashion. Soon after
            completing her Masters in fashion Rantika Thakur Clothing was born.
            <br />
            <br />
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default About;
