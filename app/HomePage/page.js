"use client";
import React from "react";
import Image from "next/image";
// import Hotelslider from "@/sliders/Hotelslider";
// import NearByHridwar from "@/sliders/NearByHridwar";
import Golftrip from "@/sliders/golftrip";
import Golfinfo from "@/sliders/golfinfo";
import TestimonialSection from "@/sliders/TestimonialSection";
import { useState } from "react";
import GolfCourseSelection from "@/components/GolfCourseSelection";
import BannerFormPopup from "@/components/BannerFormPopup";

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [showPopup1, setShowPopup1] = useState(false);

  const handleOpenPopup = () => {
    if (!destination || !duration) {
      alert('Please select both destination and duration.');
      return;
    }
    setShowPopup1(true);
  };



  return (
    <>
      {/* <section className="hero-banner position-relative">
        <Image
          src="/images/banner-img2.png"
          alt="Hero Banner"
          fill
          priority
          style={{ objectFit: "fill", objectPosition: "top" }}
        />

        <div className="banner-overlay position-absolute bg-white bottom-10 start-50 translate-middle text-center text-white p-3 bg-dark bg-opacity-80 rounded-5">

          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
            <select
              className="form-select border-0 border-end rounded-0 border-2 w-auto"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Select Destination</option>
              <option value="bangkok">Bangkok</option>
              <option value="pattaya">Pattaya</option>
              <option value="Hua">Hua Hin</option>
              <option value="Chiang">Chiang Mai</option>
              <option value="Krabi">Krabi</option>
              <option value="Phuket">Phuket</option>
            </select>

            <select
              className="form-select border-0 w-auto"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="">Select Duration</option>
              <option value="4 Days">4 Days</option>
              <option value="6 Days">6 Days</option>
            </select>

            <button className="book-now box-btn rounded-5 px-4 py-1 ylw-txt"
              onClick={handleOpenPopup}
            >
              Plan My Trip
            </button>
          </div>
        </div>
      </section> */}

      {/* Welcome Section */}
      <section className="your-break sec-padding" data-aos="fade-up" id="about-us">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">Looking for Golf Tours in Thailand?</h2>

                {/* <h4 className="global-heading2"> A space where comfort meets creativity.</h4> */}

                <div className="mb-2">
<p className="read-more1">
                  No other place offers a golfing experience like Thailand, and no one understands golf in Thailand like <strong>Golf Kindle.</strong> If you’re looking for a golfing retreat in the majestic golf courses of Phuket, Pattaya, Hua Hin, Chiang Mai, and Bangkok, we’ve got your back. Our golfing packages, combined with luxurious accommodation and stunning golf courses in Thailand, allow you to experience golf like never before. We call it the Golf Kindle Advantage,which is derived from 3 key factors: local knowledge,
</p>
                  {isExpanded || (
                    <>
                    <p className="read-less">
                                          
                        <> industry partnerships, and personalised service. Local knowledge of Thailand allows us to identify the best golf courses,luxury accommodations, and other hidden gems of Thai culture according to your needs. Industry partnerships, on the other hand, allow us to secure the best tee times, hotels, transport options, caddies, and other services at super competitive rates for your Thailand golf vacation.
                          Finally, personalised services allow us to understand your golfing preferences and craft an experience that’s in line with your expectations. We handle everything from your arrival till your departure, provide you with guided cultural tours by professionals skilled in your language, and manage all other logistical aspects of your trip. <strong>Come and discover the Thai way of golfing with us!</strong>
                        </>
                    </p>
                    </>
                  )}
                  <span className={isExpanded ? "read-toggle expanded readmore" : "read-toggle readmore"}
                  
                    onClick={toggleReadMore}
                  >
                    {isExpanded ? " Read more" : " Read less"}
                  </span>
                </div>
                {/* <a href="#" className="box-btn know-more p-2 bg_green mt-2 color-white">
                  Know More
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our golftrip Section */}
      <div className="golf-banner-wrapper" >
        <Image
          src="/images/strip.png" // replace with your image path
          alt="Golf Trip Banner"
          width={1920}
          height={500}
          className="w-100 img-fluid"
        />
      </div>
      <section className="your-break sec-padding bg_gray" id="golf-holiday">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">Golf Holiday</h2>
                {/* <p className="global-heading2">
                Each stay, a story waiting to be lived.

                </p> */}
                <p className="mb-2">Our carefully curated Thailand golf packages cater to the needs of every kind of golfer. Whether you’re a seasoned golfing professional or a casual golfer looking to explore this game of strategy and precision, we understand your needs and provide carefully curated golfing packages and services to deliver an unforgettable golfing experience. We offer corporate packages, individual packages, as well as packages for group golf sessions with your friends and family in Thailand.


                </p>
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <Golftrip />

            </div>
          </div>
        </div>
      </section>


      <section className="golf-selection-sec py-5" id="golf-course">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-md-9 text-center">
              <h2 className="global-heading">Golf Course</h2>
              <p className=" mt-3 mb-2">Enjoy golfing in some of the best golf courses in the world. Our Thailand golf courses offer exceptional course conditions, creative layouts with different levels of complexity, beautiful landscapes, and best-in-class amenities for an unparalleled golfing experience.

              </p>
            </div>
          </div>
          <GolfCourseSelection></GolfCourseSelection>
        </div>
      </section>

      <TestimonialSection />


      <section className="your-break sec-padding" data-aos="fade-up" id="golf-info">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">Blogs and News</h2>
                {/* <p className="global-heading2">
                Each stay, a story waiting to be lived.

                </p> */}
                <p className="mb-2">Discover the new stuff happening in the world of Golf Kindle!

                </p>
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <Golfinfo />
              {/* <Hotelslider />
              <NearByHridwar/> */}
            </div>
          </div>
        </div>
      </section>

      {showPopup1 && (
        <BannerFormPopup
          showPopup1={showPopup1}
          closePopupp={() => setShowPopup1(false)}
          destination={destination}
          duration={duration}
        />
      )}


    </>
  );
}
