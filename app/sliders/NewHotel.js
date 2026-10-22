"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Autoplay, Navigation } from 'swiper/modules';
import Lightbox from 'yet-another-react-lightbox';
import 'swiper/css';
import 'yet-another-react-lightbox/styles.css';
import "photoswipe/dist/photoswipe.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import 'swiper/css/navigation';
import Image from 'next/image';

const imagePairs = [
  [
    { src: "/images/banner.jpg", alt: "Hotel Banner", title: "Aura Suites Banner" },
    { src: "/images/banner2.png", alt: "Luxury Room View", title: "Aura Suites Room" }
  ],
  [
    { src: "/images/Club.jpg", alt: "Club Room", title: "Club Room Interior" },
    { src: "/images/Deluxe.jpg", alt: "Deluxe Room", title: "Deluxe Room Interior" }
  ],
  [
    { src: "/images/Metting.jpg", alt: "Meeting Room", title: "Conference Space" },
    { src: "/images/Metting1.jpg", alt: "Meeting Hall", title: "Business Meeting Area" }
  ],
  [
    { src: "/images/gallery1.jpg", alt: "Hotel Lobby", title: "Main Lobby" },
    { src: "/images/gallery8.jpg", alt: "Reception Area", title: "Reception Desk" }
  ],
  [
    { src: "/images/gallery3.jpg", 
      alt: "Comfortable-gym-area-in-hotel-in-dar-es-salaam-with-modern-fitness-equipment", 
      title: "Well-Appointed Corporate Suites at Aura Suites Dar es Salaam " },
      
    { src: "/images/gallery4.jpg", alt: "Buffet Setup", title: "Buffet Area" }
  ],
  [
    { src: "/images/gallery5.jpg", alt: "Exterior View", title: "Hotel Exterior" },
    { src: "/images/gallery6.jpg", 
      alt: "Comfortable-gym-area-in-hotel-in-dar-es-salaam-with-modern-fitness-equipment", 
      title: "well equipped gym area in a hotel in Dar es Salaam " }
  ],
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
            {flatImages.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  title={img.title}
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
            slides={flatImages.map((img) => ({ src: img.src }))}
          />
        </div>
      </section>
    </>
  );
}