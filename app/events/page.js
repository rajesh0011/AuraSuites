"use client"

import { useState } from "react";
import { BookingEngineProvider } from "../context/BookingEngineContext";
import FilterBar from "../Booking_engine/Filterbar";

import Image from "next/image";

export default function events() {
    const [isVisible, setIsVisible] = useState(false);
    const eventData = [
        {
            title: "Board Rooms",
            description:
                "Our professionally designed boardrooms, equipped with high-tech facilities like Wi-Fi, LED TV, fax/photocopy machines, telephone, etc., facilitate productive business meetings in which you get things done. Each boardroom can accommodate up to 20 people.",
            image: "/images/Metting.jpg",
            reverse: false,
        },
        {
            title: "Orbit Conference Hall",
            description:
                "If you want to host a business conference, our Orbit Conference Hall is one of the best conference halls in Dar es Salaam to facilitate it. It comes with a spacious event area that can comfortably accommodate up to 150 people, slick interiors, a large screen for presentation purposes, high-speed internet, power backup, and more. In a nutshell, it offers everything you can ask for in a conference hall",
            image: "/images/orbit.jpg",
            reverse: true,
        },
        {
            title: "Banquet Halls",
            description:
                "Banquet halls are our versatile event spaces that can be customised to facilitate many kinds of events. Whether you want to host a wedding, a social gathering, a birthday, a corporate party or a business summit, the banquet halls at Aura Suites can be tailored to meet your requirements. They are spacious enough to accommodate up to 320 guests, which makes them perfect for a large event of any kind.",
            image: "/images/Metting1.jpg",
            reverse: false,
        },
        {
            title: "Professional Events Team",
            description:
                "Your events in Dar es Salaam at any of our venues are enhanced by our professional events team, which works with you to understand your event requirements and delivers an experience according to them. Whether you host a wedding or a conference, our team ensures a smooth event experience from planning to execution, not only for you but also for all your guests and attendees of the event.",
            image: "/images/Conference.jpg",
            reverse: true,
        },
    ];

    return (
        <>
            <BookingEngineProvider>
                <FilterBar />
            </BookingEngineProvider>

            <div className="container inner_content pb-4" data-aos="fade-up"><h2 className="heading inner_heading">DISCOVER UNPARALLELED COMFORT IN DAR ES SALAAM</h2>
                <p>Looking to host a memorable event in Tanzania? Aura Suites in Dar es Salaam has perfect meeting venues as well as wedding halls in Dar es Salaam to help you get the most out of your event. Whether you want to host a wedding, a conference, a business summit, a seminar or a board meeting, we have a venue to meet your needs. </p>
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
                                                <a href="#" className="box-btn know-more">Enquiry Now</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right col-lg-7 col-12 p-0">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                 <div className="row">
                                    <div className="right col-lg-7 col-12 p-0">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="col-lg-5 col-12 p-0">
                                        <div className="left hero-content">
                                            <h2 className="heading">{item.title}</h2>
                                            <p className="description">{item.description}</p>
                                            <div className="text-left winter-box-btn">
                                                <a href="#" className="box-btn know-more">Enquiry Now</a>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </>
                            )}
                        
                    </div>
                    
                ))}
                </div>

            </>
            )
}