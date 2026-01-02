"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { BookingEngineProvider } from "../context/BookingEngineContext";
import FilterBar from "../Booking_engine/Filterbar";
import Image from 'next/image'

export default function facilities() {

     const contentFacilities = [
        {
            title: "Outdoor Pool",
            description: "A large and luxurious outdoor pool with beautiful surrounding views and sundeck chairs. Chill in the pool water or soak the sun.",
            image: "/facilities/pool.jpg",
        },
        {
            title: "Fitness Centre",
            description: "A state-of-the-art gym and fitness centre with high-end workout gear. Sweat it out with our expert trainers.",
            image: "/facilities/gym.jpg",
        },
        {
            title: "Kids Play Area",
            description: "Dedicated play area for kids to enjoy safely during your stay at Aura Suites.",
            image: "/facilities/kids.jpg",
        },
        {
            title: "Walking and Jogging Track",
            description: "Start your day on our 500-meter jogging track, surrounded by greenery within the premises.",
            image: "/facilities/walking.jpg",
        },
        {
            title: "Multi-Level Parking",
            description: "Secure, CCTV-monitored multi-level parking for peace of mind during your stay.",
            image: "/facilities/parking.jpg",
        },
        {
            title: "Mall and Multiplex",
            description: "Vijana Mall and Multiplex are easily accessible, offering shopping and entertainment.",
            image: "/facilities/multiplex.jpg",
        },
        {
            title: "Guided City Tours",
            description: "Explore Dar es Salaam’s business district with our guides. Visit attractions or business centres easily.",
            image: "/facilities/beach.jpg",
        }
    ];


    return (
        <>
            <BookingEngineProvider>
                <FilterBar />
            </BookingEngineProvider>
            <div className="container inner_content facliites">
                <h1 className="inner_heading">Amenities at Aura Suites</h1>
                <p className="text-center suit_content">Aura Suites offer some of the best-in-class facilities to make your stay in Dar es Salaam as luxurious as possible. Whether it’s a fitness centre, pool, shopping centres, or a place for your kids to have a good time, Aura Suites has it all. </p>
                 <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        navigation={{
                            clickable: true
                        }}  
                        loop={true}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        }}
                        className="mySwiper my-5"
                    >
                        {contentFacilities.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="card shadow border-0 h-100 facilities-card">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    width={600}
                                    height={400}
                                    className="card-img-top img-fluid"
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{slide.title}</h5>
                                    <p className="card-text small p-2 ">{slide.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        ))}
                    </Swiper>
            </div>
        </>
    );
};
