"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';

export default function Suitslider() {
    return (
        <>
        <section className="your-break sec-padding pt-3">
            <div className="container">
                <div className="global-heading-sec pb-4" data-aos="fade-up">
                    <h2 className="global-heading">Our suites</h2>
                    <p>Whether you’re in the town for a business trip or a staycation, <strong><br />Aura Suites has a suite to suit your needs.</strong>
                    </p>
                </div>
                <div className="winter-sec">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                         grid={{rows: 2,}}
                        grabCursor={true}
                        loop={true}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            768: { slidesPerView: 1 },
                            992: { slidesPerView: 3 },
                        }}
                        style={{ width: '100%' }}
                    >

                        {[{
                            title: "Deluxe Suite",
                            image: "/images/Deluxe.jpg",
                            imgAlt:"Best-Hotel-in-Dar-es-salaam-deluxe-suite",
                            imgTitle:"Best Hotel in Dar es Salaam| Deluxe Suite at Aura Suites Tanzania",
                            roomType: "Deluxe suite (1 Bedroom):",
                            roomPrice: "USD 110",
                            extraPerson:"",
                            extraPrice:"",
                            desc: "Single bedroom suites with exceptional interiors and sophisticated design",
                        },
                        {
                            title: "Club Suite",
                            image: "/images/club.jpg",
                            imgAlt:"Best-Hotel-in-Dar-es-salaam-club-suite",
                            imgTitle:"Enjoy a luxurious stay at the best hotel in Dar es Salaam with Aura Suites",
                            roomType: "Club suite (2 Bedroom):",
                            roomPrice: "USD 175 (for 3 pax)",
                            extraPerson: "Extra person:",
                            extraPrice: "USD 30 per person",
                            desc: "Dual-bedroom suites with more spacious living areas and premium amenities",
                        },
                        {
                            title: "Platinum Suite",
                            image: "/images/Platinum.jpg",
                             imgAlt:"best-hotels-in-dar-es-salaam-platinum-suites",
                            imgTitle:"Premium Platinum Suite Stay at One of the Best Hotels in Dar es Salaam",
                            roomType: "Platinum suite (3 Bedroom):",
                            roomPrice: "USD 220 (for 4 pax)",
                            extraPerson: "Extra person:",
                            extraPrice: "USD 30 per person",
                            desc: "Triple-bedroom suites with top-of-the-line fixtures, more living space, and luxe interiors",
                        },

                        ].map((suite, index) => (
                            <SwiperSlide key={index}>
                                <div className="winter-box">
                                    <Image
                                        src={suite.image}
                                        alt={suite.imgAlt}
                                        title={suite.imgTitle}
                                        height={500}
                                        width={500}
                                        className="w-100 primary-radius"
                                    />
                                    <div className="winter-box-content">
                                        <h3 className="winter-box-heading">{suite.title}</h3>
                                        <p className="winter-box-para">{suite.desc}</p>
                                        <div className="my-4 price-rate-suits">
                                            <p className="w-100 text-left"> <strong>{suite.roomType}</strong> <span> {suite.roomPrice}</span></p>
                                            <p className="w-100"> <strong>{suite.extraPerson} </strong> <span>{suite.extraPrice}</span> </p>
                                        </div>
                                        <div className="winter-box-btn">
                                            <Link href="/suites-room-dar-es-salam-tanzania" className="box-btn know-more">Know More</Link>
                                            <Link href="https://www.swiftbook.io/inst/#home?propertyId=683MjQtJhLD4VkO2NM3U6SC7gypDrc6S6Y6NjieOzNTM=&JDRN=Y"
                                             target="_blank" className="box-btn book-now mail-phone-desktop">Book Now</Link>

                                             <Link href="https://www.swiftbook.io/inst/#home?propertyId=683MjQtJhLD4VkO2NM3U6SC7gypDrc6S6Y6NjieOzNTM=&JDRN=Y"
                                             target="_blank" className="box-btn book-now mail-phone-mobile">Book Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>





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