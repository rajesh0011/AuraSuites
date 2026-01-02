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
                            <Link href="#" className="box-btn book-now">Know More</Link>
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
    </>
  )
}

export default HomeExploreSec