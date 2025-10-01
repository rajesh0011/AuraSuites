"use client"
// components/AmenitiesSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { BookingEngineProvider } from "../context/BookingEngineContext";
import FilterBar from "../Booking_engine/Filterbar";
import Amenities from "../Booking_engine/Amenities";

export default function facilities() {

    const contentFacilities = [
        {
            title: "Outdoor Pool",
            description: "A large and luxurious outdoor pool with beautiful surrounding views and sundeck chairs. Chill in the pool water or soak the sun.",
            image: "/images/Deluxe.jpg",
        },
        {
            title: "Fitness Centre",
            description: "A state-of-the-art gym and fitness centre with high-end workout gear. Sweat it out with our expert trainers.",
            image: "/images/Deluxe.jpg",
        },
        {
            title: "Guided City Tours",
            description: "Explore Dar es Salaam’s business district with our guides. Visit attractions or business centres easily.",
            image: "/images/Deluxe.jpg",
        },
        {
            title: "Kids Play Area",
            description: "Dedicated play area for kids to enjoy safely during your stay at Aura Suites.",
            image: "/images/Deluxe.jpg",
        },
        {
            title: "Walking and Jogging Track",
            description: "Start your day on our 500-meter jogging track, surrounded by greenery within the premises.",
            image: "/images/Deluxe.jpg",
        },
        {
            title: "Mall and Multiplex",
            description: "Vijana Mall and Multiplex are easily accessible, offering shopping and entertainment.",
            image: "/images/Deluxe.jpg",
        },
        {
            title: "Multi-Level Parking",
            description: "Secure, CCTV-monitored multi-level parking for peace of mind during your stay.",
            image: "/images/Deluxe.jpg",
        },
    ];


    return (
        <>
            <BookingEngineProvider>
                <FilterBar />
            </BookingEngineProvider>
            <div className="container inner_content facliites">
                <h2 className="inner_heading">Amenities at Aura Suites</h2>
                <p className="text-center suit_content">Aura Suites offer some of the best-in-class facilities to make your stay in Dar es Salaam as luxurious as possible. Whether it’s a fitness centre, pool, shopping centres, or a place for your kids to have a good time, Aura Suites has it all. </p>
                <Swiper
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    className="w-full"
                >

                    {contentFacilities.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-0 max-w-sm mx-auto transition-all duration-300 my-3 inner_content"
                            style={{ width: '300px' , height: '410px' ,padding:'0px'}}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className=""
                            />
                            <div className='global-heading-sec'>
                            <h3 className="text-center global-heading">{item.title}</h3>
                            </div>
                            <p className="mb-3 fs-12">{item.description}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};
