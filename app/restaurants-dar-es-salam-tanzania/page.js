"use client"
import { useState } from "react";


import { BookingEngineProvider } from "../context/BookingEngineContext";
import FilterBar from "../Booking_engine/Filterbar";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";


 const slides = [
    { id: 1, img: "/dining/(1).jpg", alt: "dining One" },
    { id: 2, img: "/dining/(2).jpg", alt: "dining Two" },
    { id: 3, img: "/dining/(3).jpg", alt: "dining Three" },
    { id: 4, img: "/dining/(4).jpg", alt: "dining Four" },
    { id: 5, img: "/dining/(5).jpg", alt: "dining Five" },
  ];

  
const slidesForno = [
  { id: 1, img: "/ferno/img1.jpg", alt: "Ferno Image 1" },
  { id: 6, img: "/ferno/img6.jpg", alt: "Ferno Image 6" },
  { id: 7, img: "/ferno/img7.jpg", alt: "Ferno Image 7" },
  { id: 8, img: "/ferno/img8.jpg", alt: "Ferno Image 8" },
  { id: 9, img: "/ferno/img9.jpg", alt: "Ferno Image 9" },
  { id: 10, img: "/ferno/img10.jpg", alt: "Ferno Image 10" },
  { id: 11, img: "/ferno/img11.jpg", alt: "Ferno Image 11" },
  { id: 12, img: "/ferno/img12.jpg", alt: "Ferno Image 12" },
  { id: 13, img: "/ferno/img13.jpg", alt: "Ferno Image 13" },
  { id: 14, img: "/ferno/img14.jpg", alt: "Ferno Image 14" },
  { id: 15, img: "/ferno/img15.jpg", alt: "Ferno Image 15" },
  { id: 16, img: "/ferno/img16.jpg", alt: "Ferno Image 16" },
  { id: 17, img: "/ferno/img17.jpg", alt: "Ferno Image 17" },
  { id: 18, img: "/ferno/img18.jpg", alt: "Ferno Image 18" },
  { id: 19, img: "/ferno/img19.jpg", alt: "Ferno Image 19" },
  { id: 20, img: "/ferno/img20.jpg", alt: "Ferno Image 20" },
  { id: 21, img: "/ferno/img21.jpg", alt: "Ferno Image 21" },
  { id: 22, img: "/ferno/img22.jpg", alt: "Ferno Image 22" },
  { id: 23, img: "/ferno/img23.jpg", alt: "Ferno Image 23" },
  { id: 24, img: "/ferno/img24.jpg", alt: "Ferno Image 24" },
  { id: 25, img: "/ferno/img25.jpg", alt: "Ferno Image 25" },
  { id: 26, img: "/ferno/img26.jpg", alt: "Ferno Image 26" },
  { id: 27, img: "/ferno/img27.jpg", alt: "Ferno Image 27" },
  { id: 28, img: "/ferno/img28.jpg", alt: "Ferno Image 28" },
  { id: 29, img: "/ferno/img29.jpg", alt: "Ferno Image 29" },
  { id: 30, img: "/ferno/img30.jpg", alt: "Ferno Image 30" },
  { id: 2, img: "/ferno/img2.jpg", alt: "Ferno Image 2" },
  { id: 3, img: "/ferno/img3.jpg", alt: "Ferno Image 3" },
  { id: 4, img: "/ferno/img4.jpg", alt: "Ferno Image 4" },
  { id: 5, img: "/ferno/img5.jpg", alt: "Ferno Image 5" },
];

export default function dining() {
  
const [showPdf, setShowPdf] = useState(false);
const [showPdfKenya, setShowPdfKenya] = useState(false);
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
        <Link
          href="#"
          className="box-btn book-now"
          onClick={() => setShowPdf(true)}
        >
          Explore Our Menu
        </Link>
       
        
         <Link
          href="https://kinaya.co.tz/"
          className="box-btn book-now"
        >
          Explore Now
        </Link>

       <Link
        href="https://www.swiftbook.io/inst/#home?propertyId=683MjQtJhLD4VkO2NM3U6SC7gypDrc6S6Y6NjieOzNTM=&JDRN=Y"
        target="_blank"
        className="box-btn book-now mail-phone-desktop"
      >
        Reservation
      </Link>

         <Link
          href="https://www.swiftbook.io/inst/#home?propertyId=683MjQtJhLD4VkO2NM3U6SC7gypDrc6S6Y6NjieOzNTM=&JDRN=Y"
          className="box-btn book-now mail-phone-mobile"
        >
          Reservation
        </Link>
        </div>
      </section>




       <section className="container my-5 pb-4 forno-bakery">
        <div className='global-heading-sec'>
        <h2 className="text-center mb-4 global-heading">Forno Bakery</h2>
        </div>
        <p className="mb-3">
          Forno Bakery is defined by the aroma of freshly baked sourdough and the delicate lamination of handmade viennoiseries. Every item is crafted daily using traditional techniques and the finest organic flours, ensuring artisanal quality in every bite. It is a sophisticated destination for those who appreciate the mastery of heritage grain loaves and the rich flavor of our signature dark chocolate croissants.
        </p>
        <p className="mb-3">
          The bakery’s warm, contemporary atmosphere provides a tranquil setting for a quiet morning coffee or an elegant afternoon treat. With a rotating selection of seasonal fruit galettes and traditional breads, the experience at Forno seamlessly blends refined culinary craftsmanship with a welcoming, modern aesthetic.
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
        {slidesForno.map((slide, index) => (
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
        <Link
          href="#"
          className="box-btn book-now"
          onClick={() => setShowPdfKenya(true)}
        >
          Explore Our Menu
        </Link>


       <Link
        href="https://www.swiftbook.io/inst/#home?propertyId=683MjQtJhLD4VkO2NM3U6SC7gypDrc6S6Y6NjieOzNTM=&JDRN=Y"
        target="_blank"
        className="box-btn book-now mail-phone-desktop"
      >
        Reservation
      </Link>

         <Link
          href="https://www.swiftbook.io/inst/#home?propertyId=683MjQtJhLD4VkO2NM3U6SC7gypDrc6S6Y6NjieOzNTM=&JDRN=Y"
          className="box-btn book-now mail-phone-mobile"
        >
          Reservation
        </Link>
        </div>
      </section>



    </div>






    <style>
      {
        `
        .forno-bakery .global-heading-sec{
          margin-top: 100px;
        }
       
              
         .mail-phone-desktop{
          display:inline
         }

         .mail-phone-mobile{
          display:none
         }

         .pdf-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .pdf-content {
          background: white;
          width: 80%;
          height: 80%;
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          border: none;
          background: black;
          color: white;
          cursor: pointer;
        }

         @media(max-width: 768px){
            .mail-phone-desktop{
              display:none
            }

            .mail-phone-mobile{
              display:inline
            }

             .winter-box-btn {
                display: flex;
                align-items: revert;
                flex-direction: row;
                justify-content: center;
            }
         }
        `
      }
    </style>

    {showPdf && (
      <div className="pdf-modal">
        <div className="pdf-content">

          <button
            className="close-btn"
            onClick={() => setShowPdf(false)}
          >
            ✕
          </button>

          <iframe
            src="/kenya-menu.pdf"
            width="100%"
            height="500px"
          ></iframe>

        </div>
      </div>
    )}

     {showPdfKenya && (
      <div className="pdf-modal">
        <div className="pdf-content">

          <button
            className="close-btn"
            onClick={() => setShowPdfKenya(false)}
          >
            ✕
          </button>

          <iframe
            src="/forno-bakery-pastry.pdf"
            width="100%"
            height="500px"
          ></iframe>

        </div>
      </div>
    )}


    </>

)
}