"use client"; // Only if you're using this inside an App Router component

import { useState } from "react";
import Image from "next/image";

export default function HomeBanner() {
  const [isVisible, setIsVisible] = useState(false);

  const showBookingEngine = () => {
    setIsVisible(true);
  };

  return (
    <>
    {/* <section className="banner-section">
      <div className="banner-image">
        <img
          src="/images/banner.jpg"
          alt="banner image"
          className="banner-img mobile_img"
        />
        <img
          src="/images/banner.png"
          alt="banner image"
          className="banner-img desktop_img"
        />

        <div className="banner-search-btn">
          {!isVisible && (
            <a
              className="banner-search-btn-link"
              onClick={showBookingEngine}
              id="booking-engine-btn"
            >
              <Image
                src="/img/search-icon-white.svg"
                height={40}
                width={40}
                alt="search icon"
              />
            </a>
          )}
        </div>
      </div>
    </section> */}
    </>
  );
}
