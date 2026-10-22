"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
export default function Eventslider() {


  const slides = [
    {
      src: "/images/Grand-Celestial-Hall.png",
      alt: "Corporate-meetings-venue-aura-suites",
      title: "Celestial Grand",
      imgTitle:"Corporate Meeting Venue at Aura Suites with Professional Setup ",
      // subtitle: "",
      description: "Our largest banquet hall with a capacity to accommodate up to 320 guests. Perfect for grand weddings and large social gatherings."
    },
    {
      src: "/images/Celestial-Hall.png",
      alt: "corporate-venues-in tanzania-dar-es-salaam ",
      imgTitle:"Business Event Space at Leading Corporate Venues in Dar es Salaam, Tanzania ",
      title: "Celestial",
      // subtitle: "RECEPTIONS",
      description: "A spacious banquet hall with a capacity of up to 130 guests and all modern amenities. Suitable for weddings, parties, conferences, etc."
    },
    {
      src: "/images/Galaxy-conference-Hall.png",
      alt: "Private Parties",
        imgTitle:"Private Parties",
      title: "Galaxy",
      // subtitle: "GATHERINGS",
      description: "Another one of our versatile banquets suitable for parties, weddings, and conferences. Accommodates up to 120 guests."
    },
    {
      src: "/images/Orbit2.png",
      alt: "Corporate Parties",
        imgTitle:"Corporate Parties",
      title: "Orbit",
      // subtitle: "PARTIES",
      description: "A conference hall with all business-friendly features and a seating capacity of up to 150 guests for corporate events."
    }
  ];

  return (
    <>
      <section className="your-break meeting-n-event sec-padding pt-3">
        <div className="container">
          <div className="global-heading-sec pb-4" data-aos="fade-up">
            <h2 className="global-heading">meeting & events</h2>
            <p className="description dining_content">
              Whether you want to host a wedding, a social gathering, a corporate event, <br />
              or a meeting, Aura Suites has versatile meeting and event spaces available for your needs.
            </p>
          </div>
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
                        title={item.title}
                        height={500}
                        width={500}
                        className="w-100 primary-radius"
                      />
                      <div className="hover-text">
                        <h3>{item.title} <span>{item.subtitle}</span></h3>
                        <p>{item.description}</p>
                        <Link href="/event-venue-dar-es-salam-tanzania" className="explore-btn">EXPLORE MORE</Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}