"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';

const HomeExploreSec = () => {
  return (
    <>
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
                            {/* <Link href="#" className="box-btn book-now">Know More</Link> */}

                            <Link  href="https://mail.google.com/mail/?view=cm&to=stay@aurasuites.co.tz"
                                             target="_blank" className="box-btn book-now mail-phone-desktop">Know More</Link>

                                             <Link   href="tel:+255746941286"
                                             target="_blank" className="box-btn book-now mail-phone-mobile">Know More</Link>
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
                                    imgAlt:"Best-hotels-in-dar-es-salaam-coco-beach",
                                    imgTitle:"Stay Near Coco Beach at One of the Best Hotels in Dar es Salaam "
                                },
                                {
                                    title: 'Central Business District',
                                    image: '/img/exploring.jpg',
                                    link: '#',
                                    imgAlt:"best-corporate-suites-in-tanzania-dar-es-salaam",
                                    imgTitle:"Corporate Stay Options at the Best Suites in Dar es Salaam, Tanzania "
                                },
                                {
                                    title: 'Attached Facilities',
                                    image: '/images/exploring1.jpg',
                                    link: '#',
                                    imgAlt:"aura-suites-facilities-dar-es-salaam-tanzania",
                                    imgTitle:"Modern Facilities at Aura Suites in Dar es Salaam, Tanzania"
                                },
                            ].map((place, index) => (
                                <SwiperSlide key={index}>
                                    <div className="card-overlay-box">
                                        <Image
                                            src={place.image}
                                            alt={place.imgAlt}
                                            title={place.imgTitle}
                                            width={500}
                                            height={500}
                                            className="card-image"
                                        />
                                        <div className="card-text-content">
                                            <h4>{place.title}</h4>
                                            <Link href={place.link} className="card-link">
                                                Learn more <span>&rarr;</span>
                                            </Link>
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

export default HomeExploreSec