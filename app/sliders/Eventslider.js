"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
export default function Eventslider() {


  const slides = [
    {
      src: "/images/Metting.jpg",
      alt: "Corporate Events",
      title: "Celestial Grand",
      // subtitle: "",
      description: "Our largest banquet hall with a capacity to accommodate up to 320 guests. Perfect for grand weddings and large social gatherings."
    },
    {
      src: "/images/Metting1.jpg",
      alt: "Weddings",
      title: "Celestial",
      // subtitle: "RECEPTIONS",
      description: "A spacious banquet hall with a capacity of up to 130 guests and all modern amenities. Suitable for weddings, parties, conferences, etc."
    },
    {
      src: "/images/Conference.jpg",
      alt: "Private Parties",
      title: "Galaxy",
      // subtitle: "GATHERINGS",
      description: "Another one of our versatile banquets suitable for parties, weddings, and conferences. Accommodates up to 120 guests."
    },
    {
      src: "/images/orbit.jpg",
      alt: "Corporate Parties",
      title: "Orbit",
      // subtitle: "PARTIES",
      description: "A conference hall with all business-friendly features and a seating capacity of up to 150 guests for corporate events."
    }
  ];

  return (
    <>
      <div className="container mt-4  position-relative">
        <div className="swiper-button-prev custom-nav"><FaArrowLeft /></div>
        <div className="swiper-button-next custom-nav"><FaArrowRight /></div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          speed={2000}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          pagination={false}
          loop={false}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {slides.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="winter-box">
                <div className="image-overlay-container">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    height={500}
                    width={500}
                    className="w-100 primary-radius"
                  />
                  <div className="hover-text">
                    <h3>{item.title} <span>{item.subtitle}</span></h3>
                    <p>{item.description}</p>
                    <a href="/events/" className="explore-btn">EXPLORE MORE</a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}