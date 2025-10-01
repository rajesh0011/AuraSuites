"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Parallax, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { useRef } from "react";

const ImageSlider = () => {
  const swiperRef = useRef(null);

  const slides = [
    {
      title: "NEW OPENINGS",
      link: "#",
      image: "/img/n-hotel-1.jpg",
    },
    {
      title: "LIVING PALACES",
      link: "#",
      image: "/img/n-hotel-2.jpg",
    },
    {
      title: "CITY HOTELS",
      link: "#",
      image: "/img/n-hotel-3.jpg",
    },
  ];

  return (
    <div className="slider-container">
      <Swiper
        ref={swiperRef}
        modules={[EffectFade, Autoplay, Parallax, Navigation]}
        effect="fade"
        speed={1200}
        parallax={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={true}
        className="swiper-container"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="slide-content">
              <img
                data-swiper-parallax="-50%"
                src={slide.image}
                alt={slide.title}
                className="slide-image"
              />
              <div className="slide-overlay">
                <h2 data-swiper-parallax="-100%" className="slide-title">
                  {slide.title}
                </h2>
                <a href={slide.link} className="slide-link">
                  MORE &gt;
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination"></div>
    </div>
  );
};

export default ImageSlider;
