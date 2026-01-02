"use client"

import React from 'react';
import { useState } from "react";
import { BookingEngineProvider } from "../context/BookingEngineContext";
import FilterBar from "../Booking_engine/Filterbar";
import Amenities from "../Booking_engine/Amenities";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";


 const slides = [
    { id: 1, img: "/dining/(1).jpg", alt: "dining One" },
    { id: 2, img: "/dining/(2).jpg", alt: "dining Two" },
    { id: 3, img: "/dining/(3).jpg", alt: "dining Three" },
    { id: 4, img: "/dining/(4).jpg", alt: "dining Four" },
    { id: 5, img: "/dining/(5).jpg", alt: "dining Five" },
  ];

export default function dining() {
return (
    <>
      <BookingEngineProvider>
                    <FilterBar />
        </BookingEngineProvider>
    <div className="container inner_content dining_content">
      {/* Page Heading */}
      <section className="text-center mb-5">
        <h1 className="heading inner_heading">Best Restaurant in Dar es Salaam, Tanzania</h1>
        <p className="dining_content">
          Enjoy delicious meals and beverages from across the world at our best-in-class restaurant and bar in Aura Suites, Dar es Salaam, Tanzania.
        </p>
      </section>

      {/* Kinaya Restaurant Overview */}
      <section className="container my-5 pb-4">
        <div className='global-heading-sec'>
        <h2 className="text-center mb-4 global-heading">Kinaya – The Multicuisine Restaurant and Bar</h2>
        </div>
        <p className="mb-3">
          Located on the 16th floor of our hotel, Kinaya rooftop restaurant aims to provide an exceptional dining experience to all guests at Aura Suites. With serene views of Dar es Salaam’s skyline, a carefully curated menu, and dishes skillfully cooked by our chefs, it serves not just food but a dining retreat that you would want to experience again and again.
        </p>
        <p className="mb-3">
          We serve the choicest dishes from Indian, Continental, Oriental, and African cuisines to meet everyone’s dining preferences. Each meal is prepared with organic and fresh ingredients procured daily from local farms. You can check out our cooking processes at Kinaya’s Interactive Show Kitchen.
        </p>
        <p className="mb-3">
          At the same time, our bar offers some of the best cocktails and mocktails to complete the package. Whether you want the finest wine in town or a soft drink, Kinaya can serve it for you at any time of the day.
        </p>
      </section>
      
      <div className="diining-images mb-4">
        <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 0, // no delay, continuous
          disableOnInteraction: false,
        }}
        speed={4000} // smooth speed
        loop={true}
        freeMode={true} // makes it smooth flow
        grabCursor={true}
        slidesPerView={2}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="zigzag-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="card shadow border-0 h-100">
              <Image
                src={slide.img}
                alt={slide.alt}
                width={400}
                height={250}
                className="card-img-top img-fluid"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

      {/* CTA Buttons */}
      <section className="flex flex-col sm:flex-row items-center gap-4 mt-8 mb-5">
        <div className='winter-box-btn'>
        <a 
          href="#"
          className="box-btn book-now"
        >
          Explore Our Menu
        </a>
        <a
          href="#"
          rel="noopener noreferrer"
          className="box-btn book-now"
        >
          Visit Kinaya Website
        </a>
        <a
          href="#"
          className="box-btn book-now"
        >
          Reservation
        </a>
        </div>
      </section>
    </div>
    </>

)
}