import "./shipingPolicy.css";
import SideImage from "../../Images/IMG_2973.jpeg";
import Video from "../../Images/rantika-thakur.mp4";
import { useEffect, useState } from "react";
function shipingPolicy() {
  return (
    <section className="ShipingPolicy pb-5 ps-lg-5 ps-md-5 p-2">
      <div class="row w-100">
        <div className="col">
          <p className="shipping-policy-title">
            Rantika Thakur Clothing - Shipping Policy
          </p>
        </div>
        <div className="row">
          <div className="col">
            <p className="thank-you">
              Thank you for your interest in Rantika Thakur Clothing!
            </p>
            <p className="small-text">
              We are excited to ship your new pieces to you.
            </p>
            <p className="thank-you">Processing and Shipping Times:</p>
            <ul>
              <li>
                Please note that all orders are subject to processing time in
                addition to shipping time.
              </li>
              <li>Orders are typically processed within 1-2 business days.</li>
              <li>
                Once your order is processed, it will be shipped via our trusted
                shipping partners.
              </li>
              <li>
                Shipping usually takes 10-15 business days to arrive, depending
                on your location.
              </li>
            </ul>
            <p className="thank-you">Important Note:</p>
            <ul>
              <li>
                While we strive to ensure these timelines are met, please be
                aware that shipping times may vary depending on factors beyond
                our control, such as customs clearance and carrier delays.
              </li>
              <li>
                We will keep you updated on the status of your order via email.
              </li>
            </ul>
            <p className="thank-you">Additional Information:</p>
            <ul>
              <li>We currently offer shipping within India only.</li>
              <li>
                Shipping costs will be calculated at checkout based on the
                weight of your order and your chosen shipping method.
              </li>
              <li>
                You can track your order by logging into your account on our
                website,<span>https://rantikathakur.com </span> , or by clicking
                on the tracking link provided in your shipping confirmation
                email.
              </li>
            </ul>
            <p className="small-text">
              For any questions or concerns regarding our shipping policy,
              please don't hesitate to contact us at
              contactrantikathakurclothing@gmail.com
            </p>
            <p className="thank-you">
              Thank you for your understanding!
              <br />
              Rantika Thakur Clothing Team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default shipingPolicy;
