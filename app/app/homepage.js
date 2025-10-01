"use client"
import { useState, useEffect, useRef } from "react";
import { BookingEngineProvider } from "./context/BookingEngineContext";
import Image from 'next/image';
import NewHotel from './sliders/NewHotel';
import StatsCounter from './home/Counter';
import Suitslider from './sliders/Suitslider'
import FilterBar from "./Booking_engine/Filterbar";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Eventslider from './sliders/Eventslider'
import HomeBanner from './HomeBanner';
function Home({ contentData }) {

    // Refs for Section 1
    const sectionRef = useRef();
    const readMoreRef = useRef();
    // Refs for Section 1
    const section1Ref = useRef();
    const readMore1Ref = useRef();

    // Dining Experience Reamore
    const section2Ref = useRef();
    const readMore2Ref = useRef();

    // Refs for Section 2
    const section3Ref = useRef();
    const readMore3Ref = useRef();

    // Refs for Section 2
    const section4Ref = useRef();
    const readMore4Ref = useRef();

    // Toggle functions (reusable)
    const moreContent = (contentRef, readMoreRef) => {
        contentRef.current.style.display = 'inline';
        readMoreRef.current.style.display = 'none';
    };

    const lessContent = (contentRef, readMoreRef) => {
        contentRef.current.style.display = 'none';
        readMoreRef.current.style.display = 'inline';
    };
    return (
        <>
            {/* <ContentApi /> */}
            <BookingEngineProvider>
                <FilterBar contentData={contentData} />
            </BookingEngineProvider>

            {/* <FormSidebar></FormSidebar> */}
            <HomeBanner />

            <section className="hero-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="hero-content col-lg-8 col-12">
                            <p className="subheading">Aura Suites Dar es Salaam Tanzania</p>
                            <h2 className="heading">DISCOVER UNPARALLELED COMFORT IN DAR ES SALAAM</h2>
                            <div>
                                <p className="description">Looking for a comfortable and luxurious hotel in Dar es Salaam for your next business trip or staycation? Look no further. Aura Suites has got you covered!
                                    Our all-suite hotel in the Upanga business district of Dar es Salaam provides you with a comfortable
                                    <a onClick={() => moreContent(section1Ref, readMore1Ref)} className="content" ref={readMore1Ref}> ...Read More</a>
                                </p>

                                <p ref={section1Ref} className="readmore"> and luxurious stay experience. With 70+ well-maintained suites, a multicuisine restaurant, fitness centre, and swimming pool, Aura Suites provide you with the best of everything you can ask for when visiting Dar es Salaam.
                                    Come, discover unparalleled comfort in Dar es Salaam with Aura Suites!
                                    <a onClick={() => lessContent(section1Ref, readMore1Ref)} className="content">  Read Less</a>
                                </p>


                            </div>
                        </div>
                        <div className="hero-image col-lg-4 col-12 p-0">
                            <img className="img_banner" src="img/banner1.jpg" alt="Dar Es Salaam view" />
                        </div>
                    </div>
                </div>
            </section>
            <Suitslider/>
            <section className="hero-section">
                <div className="container">
                    <div className="row justify-content-center">

                        <div className="hero-content col-md-7 col-12">
                            <h2 className="heading">Dining Experience</h2>
                            <p className="description">
                                Engage your taste buds in sumptuous meals from across the globe at our multi-cuisine rooftop restaurant and bar, Kinaya. Or enjoy the same taste, same meals from the comfort of your suite with our in-suite dining service.
                                Whether your preference is {' '}<a onClick={() => moreContent(section2Ref, readMore2Ref)} className="content" ref={readMore2Ref}>  ...Read More </a>
                            </p>
                            <p ref={section2Ref} className="readmore">continental, oriental, or something else… Our expert chefs cook something delicious for you every day!
                                <a onClick={() => lessContent(section2Ref, readMore2Ref)} className="content">  Read Less</a>
                            </p>

                            <div className="winter-box-btn">
                                <a href="#" className="box-btn know-more">
                                    Know More
                                </a>
                                <a href="#" className="box-btn book-now">
                                    Reserve A Table
                                </a>
                            </div>
                        </div>
                        <div className="hero-image col-md-5 col-12 p-0">
                            <img className="img_banner" src="/images/banner2.png" alt="Dar Es Salaam view" />
                        </div>
                    </div>
                </div>
            </section>
            {/* Meeting & Events */}
            <section className="your-break sec-padding pt-3">
                <div className="container">
                    <div className="global-heading-sec pb-4" data-aos="fade-up">
                        <h2 className="global-heading">meeting & events</h2>
                        <p className="description">
                            Whether you want to host a wedding, a social gathering, a corporate event, <br />
                            or a meeting, Aura Suites has versatile meeting and event spaces available for your needs.
                        </p>
                    </div>
                    <Eventslider />
                </div>
            </section>
            {/* Offers */}
            <section className="offers sec-padding bg_blue hero-section">
                <div className="container">
                    <div className="global-heading-sec pb-4" data-aos="fade-up">
                        <h2 className="global-heading">offers</h2>
                        <p>The best offers from one of the best hotels in Dar es Salaam, exclusively for you!</p>
                        <div className="winter-box-btn">
                            <a href="#" className="box-btn book-now">Know More</a>
                        </div>
                    </div>

                    <div className="winter-sec">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            breakpoints={{
                                768: { slidesPerView: 2 },
                                992: { slidesPerView: 3 },
                            }}
                        >
                            {[{
                                title: "Offers 1",
                                image: "/img/offers.jpg",
                                desc: "Lorem Ipsum is simply dummy text of the printing"
                            },
                            {
                                title: "Offers 2",
                                image: "/img/offers.jpg",
                                desc: "Lorem Ipsum is simply dummy text of the printing"
                            },
                            {
                                title: "Offers 3",
                                image: "/img/offers1.jpg",
                                desc: "Lorem Ipsum is simply dummy text of the printing"
                            }].map((offer, index) => (
                                <SwiperSlide key={index}>
                                    <div className="winter-box">
                                        <Image
                                            src={offer.image}
                                            alt={offer.title}
                                            height={500}
                                            width={500}
                                            className="w-100 primary-radius"
                                        />
                                        <div className="winter-box-content">
                                            <h3 className="winter-box-heading">{offer.title}</h3>
                                            <p className="winter-box-para">{offer.desc}</p>
                                            <div className="winter-box-btn">
                                                <a href="#" className="box-btn know-more">Know More</a>
                                                <a href="#" className="box-btn book-now">Book Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>

            {/*  */}
            <section className="your-break sec-padding pt-3">
                <div className="container">
                    <div className="global-heading-sec pb-4" data-aos="fade-up">
                        <h2 className="global-heading">Explore Dar es Salaam</h2>
                        <p className="description">
                            Looking to learn more about Dar es Salaam? <br />
                            Explore the financial hub of Tanzania in greater detail <br />
                            with Aura Suites.
                        </p>
                        <div className="winter-box-btn">
                            <a href="#" className="box-btn book-now">Know More</a>
                        </div>
                    </div>

                    <div className="winter-sec">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            breakpoints={{
                                768: { slidesPerView: 2 },
                                992: { slidesPerView: 3 },
                            }}
                        >
                            {[
                                {
                                    title: 'Coco Beach',
                                    image: '/images/exploring2.jpg',
                                    link: '#',
                                },
                                {
                                    title: 'Central Business District',
                                    image: '/img/exploring.jpg',
                                    link: '#',
                                },
                                {
                                    title: 'Attached Facilities',
                                    image: '/images/exploring1.jpg',
                                    link: '#',
                                },
                            ].map((place, index) => (
                                <SwiperSlide key={index}>
                                    <div className="card-overlay-box">
                                        <Image
                                            src={place.image}
                                            alt={place.title}
                                            width={500}
                                            height={500}
                                            className="card-image"
                                        />
                                        <div className="card-text-content">
                                            <h4>{place.title}</h4>
                                            <a href={place.link} className="card-link">
                                                Learn more <span>&rarr;</span>
                                            </a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>

            {/* sliders use Swiper */}
            <section className="global-heading-sec pb-4 hero-section home_page_slider">
                <h2 className="global-heading">The World of Aura Suites</h2>
                <NewHotel />
            </section>


            <StatsCounter />


        </>
    );
}

export default Home
