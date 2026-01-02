"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Autoplay, Navigation } from 'swiper/modules';
import Lightbox from 'yet-another-react-lightbox';
import 'swiper/css';
import 'yet-another-react-lightbox/styles.css';
import "photoswipe/dist/photoswipe.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

const imagePairs = [
  ["/images/banner.jpg", "/images/banner2.png"],
  ["/images/Club.jpg", "/images/Deluxe.jpg"],
  ["/images/Metting.jpg", "/images/Metting1.jpg"],
  ["/images/gallery1.jpg", "/images/gallery8.jpg"],
  ["/images/gallery3.jpg", "/images/gallery4.jpg"],
  ["/images/gallery5.jpg", "/images/gallery6.jpg"],
];

export default function NewHotelSlider() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const flatImages = imagePairs.flat();

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className="global-heading-sec pb-4 hero-section home_page_slider">
        <h2 className="global-heading">The World of Aura Suites</h2>
        <div className="container mt-4 home_gallery position-relative">
          <div className="swiper-button-prev custom-nav"><FaArrowLeft /></div>
          <div className="swiper-button-next custom-nav"><FaArrowRight /></div>

          <Swiper
            modules={[Grid, Autoplay, Navigation]}
            speed={2000}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              1000: { slidesPerView: 4 },
            }}
          >
            {flatImages.map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={src}
                  alt={`Gallery ${index}`}
                  className="w-100"
                  width={300}
                  height={200}
                  quality={100}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImageClick(index)}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Lightbox Viewer */}
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={lightboxIndex}
            slides={flatImages.map((src) => ({ src }))}
          />
        </div>
      </section>
    </>

  );
}
