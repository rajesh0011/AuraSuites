"use client";

import { useState } from "react";
import { BookingEngineProvider } from "../context/BookingEngineContext";
import FilterBar from "../Booking_engine/Filterbar";
import Amenities from "../Booking_engine/Amenities";
import Link from "next/link";
import BookingEnquiryPopup from "../Booking_engine/BookingEnquiryPopup";
 function handleMenuToggle() {
    setClose(!close);
  }

export default function Suits() {

  let [showPopup, setShowPopup] = useState(false);
  let [less, more] = useState({});
  function readmore(index) {
    more(function (prev) {
      return {
        ...prev,
        [index]: !prev[index],
      };
    });
  }
  let details = [
    {
      id: 0,
      image: "/images/Deluxe.jpg",
      title: "Deluxe Suite",
      description:
        "With one bedroom and 91 sq. m. of space, the Deluxe Suites at Aura Suites are perfect for individual travellers or couples looking for a luxury stay in Tanzania. Each Deluxe Suite comes with a plush bed,",
      content:
        "a private balcony overlooking the city skyline, a dining table, a work desk, a couch, a coffee table, and a kitchen. The interiors of these suites exude minimalist luxury and make you want to stay a little longer. We have 30 of these suites at our property.",
      button: "Book Now",
      roomType: "Deluxe suite (1 Bedroom):",
      roomPrice: "USD 110",
      extraPerson:"",
      extraPrice:"",
      link: "#",
    },
    {
      id: 1,
      image: "/images/club.jpg",
      title: "Club Suite",
      description:
        "Designed to provide a comfortable and luxurious stay experience for up to 4 guests, the Club Suite comes with two bedrooms and a 115 sq. m. living area. It comes with a larger dining table, a bigger couch",
      content:
        "a private balcony, a kitchen, plush beds, a work desk in each bedroom, and more. There are 20 of these suites in our inventory, and they’re our most booked category of suites, so they get filled pretty fast.",
      button: "Book Now",
      roomType: "Club suite (2 Bedroom):",
      roomPrice: "USD 175 (for 3 pax)",
      extraPerson: "Extra person:",
      extraPrice: "USD 30 per person",
      link: "#",
    },
    {
      id: 2,
      image: "/images/Platinum.jpg",
      title: "Platinum Suite",
      description:
        "Our top-tier offering, the Platinum Suite, offers three bedrooms and a living area of 151 sq. m. for a relaxed stay of up to 6 guests. Each of these suites is equipped with a separate dining area consisting of",
      content:
        "a dining table and work desk, a large private balcony, a kitchen, a couch, and top-of-the-line amenities. Just like Club Suites, these are also limited in numbers, with only 20 such suites at our hotel in Dar es Salaam, Tanzania.",
      button: "Book Now",
      roomType: "Platinum suite (3 Bedroom):",
      roomPrice: "USD 220 (for 4 pax)",
      extraPerson: "Extra person:",
      extraPrice: "USD 30 per person",
      link: "#",
    },
  ];
  return (
    <>
      <BookingEngineProvider>
        <FilterBar />
      </BookingEngineProvider>
      <div className="container inner_content pb-4">
        <h1 className="heading inner_heading">
          Best Tanzania Suites in Dar es Salaam
        </h1>
        <p className="description mb-3 suit_content">
          Few all-suite hotels in Tanzania understand the needs of a luxury stay
          experience like we do. We offer the best suites with spacious bedrooms
          and luxury amenities to provide an unparalleled living experience in
          Tanzania’s economic capital.
        </p>
      </div>
      <div className="text-justify container my-5 global-heading-sec pb-4">
        <h2 className="text-center mb-4 global-heading">
          Suites at Aura Suites in Dar es Salaam
        </h2>
        <p className="description mb-3 suit_content">
          Our Tanzania suites in Dar es Salaam come in three categories to meet
          the preferences of every kind of traveller to Tanzania.
        </p>
        <div className="row">
          {details.map((detail, index) => {
            return (
              <div
                key={detail.id}
                className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3 winter-box"
              >
                <img
                  alt={`${detail.title} image`}
                  loading="lazy"
                  width="500"
                  height="500"
                  decoding="async"
                  data-nimg="1"
                  className="w-100 primary-radius"
                  src={detail.image}
                ></img>
                <div className="winter-box-content suit_slider">
                  <h3 className="text-left winter-box-heading">
                    {detail.title}
                  </h3>
                  <p className="text-justify description w-100">
                    {detail.description}
                  </p>
                  {less[index] && (
                    <p className="text-justify description w-100">
                      {detail.content}
                    </p>
                  )}

                  <div className="my-4 price-rate-suits">
                     <p className="w-100 text-left"> <strong>{detail.roomType}</strong> <span> {detail.roomPrice}</span></p>
                     <p className="w-100"> <strong>{detail.extraPerson} </strong> <span>{detail.extraPrice}</span> </p>
                  </div>
                  <div className="rooms-card-btn">
                    <button className="readmore1" onClick={() => readmore(index)}>
                        {" "}
                        {less[index] ? "Read Less" : "Read More"}
                    </button>
                    {/* <div className="winter-box-btn">
                        <a href={detail.link} className="box-btn book-now">
                        {detail.button}
                        </a>
                    </div> */}



                    

            <div className="winter-box-btn">
              {/* Desktop - Email */}
                      

             <Link
                href="https://www.swiftbook.io/inst/#home?propertyId=683MjQtJhLD4VkO2NM3U6SC7gypDrc6S6Y6NjieOzNTM=&JDRN=Y"
                target="_blank"
                className="box-btn book-now mail-phone-desktop"
              >
                Book Now
              </Link>

              {/* Mobile - Call */}
              <Link
                href="https://www.swiftbook.io/inst/#home?propertyId=683MjQtJhLD4VkO2NM3U6SC7gypDrc6S6Y6NjieOzNTM=&JDRN=Y"
                target="_blank"
                className="box-btn book-now mail-phone-mobile"
              >
                Book Now
              </Link>
            </div>


                  </div>
                 
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Amenities />
   

{showPopup && (
  <BookingEnquiryPopup
    propertyName="Aura Suites"
    mode="header"
    onClose={() => setShowPopup(false)}
  />
)}

        <style>
      {
        `
       
              
         .mail-phone-desktop{
          display:inline
         }

         .mail-phone-mobile{
          display:none
         }

         @media(max-width: 768px){
            .mail-phone-desktop{
              display:none
            }

            .mail-phone-mobile{
              display:inline
            }

            //  .winter-box-btn {
            //     display: flex;
            //     align-items: revert;
            //     flex-direction: row;
            //     justify-content: center;
            // }
         }
        `
      }
    </style>
    </>
  );
}
