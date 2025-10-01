
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function Suitslider() {
    return (
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
                            desc: "Single bedroom suites with exceptional interiors and sophisticated design",
                        },
                        {
                            title: "Club Suite",
                            image: "/images/Club.jpg",
                            desc: "Dual-bedroom suites with more spacious living areas and premium amenities",
                        },
                        {
                            title: "Platinum Suite",
                            image: "/images/Platinum.jpg",
                            desc: "Triple-bedroom suites with top-of-the-line fixtures, more living space, and luxe interiors",
                        },

                        ].map((suite, index) => (
                            <SwiperSlide key={index}>
                                <div className="winter-box">
                                    <Image
                                        src={suite.image}
                                        alt={`${suite.title} image`}
                                        height={500}
                                        width={500}
                                        className="w-100 primary-radius"
                                    />
                                    <div className="winter-box-content">
                                        <h3 className="winter-box-heading">{suite.title}</h3>
                                        <p className="winter-box-para">{suite.desc}</p>
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
    )
}