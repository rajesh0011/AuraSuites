"use client"

import { useState } from "react";
import { BookingEngineProvider } from "../context/BookingEngineContext";
import FilterBar from "../Booking_engine/Filterbar";


import Link from "next/link";
import BookingEnquiryPopup from "../Booking_engine/BookingEnquiryPopup";
 function handleMenuToggle() {
    setClose(!close);
  }

import Image from "next/image";

export default function Events() {
    const [isVisible, setIsVisible] = useState(false);

    let [showPopup, setShowPopup] = useState(false);
    const eventData = [
        {
            title: "Orbit Conference Hall",
            description:
                "If you want to host a business conference, our Orbit Conference Hall is one of the best conference halls in Dar es Salaam to facilitate it. It comes with a spacious event area that can comfortably accommodate up to 150 people, slick interiors, a large screen for presentation purposes, high-speed internet, power backup, and more. In a nutshell, it offers everything you can ask for in a conference hall. ",
            image: "/meeting-events/Orbit.JPG",
            reverse: false,
        },
        {
            title: "Celestial Grand",
            description:
                "Celestial Grand is our largest and grandest banquet hall with an area of 360 sq. m. and opulent interiors. It can accommodate between 160 to 320 people, depending on the type of seating arrangement (i.e. Cluster, Theatre, or Social). This makes it perfect for a wide range of corporate as well as private events.",
            image: "/meeting-events/Grand_Celestial.jpg",
            reverse: true,
        },
        {
            title: "Celestial",
            description:
                "Celestial is one of our smaller banquets with stunning interiors and an area of 140 sq. m. It can easily accommodate between 70 to 130 people, again depending on the type of seating arrangement. This makes it suitable for intimate events and gatherings like receptions, seminars, intimate wedding ceremonies, and more. ",
            image: "/images/Conference.jpg",
            reverse: false,
        },
        {
            title: "Galaxy",
            description:
                "The Galaxy banquet is also similar to Celestial in terms of size and interiors. It has an area of 130 sq. m., which makes it spacious enough to accommodate between 60 to 120 people. Like Celestial, the Galaxy banquet can also host board meetings, small conferences, or private parties.",
            image: "/meeting-events/Galaxy.jpg",
            reverse: true,
        },
    ];

    return (
        <>
            <BookingEngineProvider>
                <FilterBar />
            </BookingEngineProvider>

            <div className="container inner_content pb-4" data-aos="fade-up">
                <h1 className="heading inner_heading ">DISCOVER UNPARALLELED COMFORT IN DAR ES SALAAM</h1>
                <p className="suit_content">
                    Looking to host a memorable event in Tanzania? Aura Suites in Dar es Salaam has perfect meeting venues as well as wedding halls in Dar es Salaam to help you get the most out of your event. Whether you want to host a wedding, a conference, a business summit, a seminar or a board meeting, we have a venue to meet your needs. 
                </p>
            </div>
            <div className="event container-fluid p-0">
                {eventData.map((item, index) => (
                    <div key={index}>
                        
                            {item.reverse ? (
                                <>
                                <div className="row flex-column-reverse flex-lg-row">
                                    <div className="col-lg-5 col-12 p-0">
                                        <div className="left hero-content">
                                            <h2 className="heading">{item.title}</h2>
                                            <p className="description">{item.description}</p>
                                            <div className="text-left winter-box-btn">
                                                {/* <a href="#" className="box-btn know-more">Enquiry Now</a> */}

                                                                                        <button
                                            className="box-btn know-more mail-phone-desktop"
                                            onClick={() => setShowPopup(true)}
                                        >
                                           Enquiry Now
                                        </button>

                                                                        {/* Mobile - Call */}
                                            <Link
                                                href="tel:+255746941286"
                                                target="_blank"
                                                className="box-btn know-more mail-phone-mobile"
                                            >
                                                 Enquiry Now
                                            </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 col-12 p-0">
                                        <Image width={500} height={500} src={item.image} alt={item.title} />
                                    </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                 <div className="row">
                                    <div className="right col-lg-7 col-12 p-0">
                                        <Image  width={500} height={500}  src={item.image} alt={item.title} />
                                    </div>
                                    <div className="col-lg-5 col-12 p-0">
                                        <div className="left hero-content">
                                            <h2 className="heading">{item.title}</h2>
                                            <p className="description">{item.description}</p>
                                            <div className="text-left winter-box-btn">
                                                {/* <a href="#" className="box-btn know-more">Enquiry Now</a> */}

                                                <button
                                            className="box-btn know-more mail-phone-desktop"
                                            onClick={() => setShowPopup(true)}
                                        >
                                           Enquiry Now
                                        </button>

                                                                        {/* Mobile - Call */}
                                            <Link
                                                href="tel:+255746941286"
                                                target="_blank"
                                                className="box-btn know-more mail-phone-mobile"
                                            >
                                                 Enquiry Now
                                            </Link>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </>
                            )}
                        
                    </div>
                    
                ))}
                </div>


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
            )
}