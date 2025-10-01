'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slider.css';
import Image from 'next/image';

const ThumbnailCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(); // Properly type the state

  // Images and logos data
  const data = [
    {
      image: '/img/clarks-exotica-img.jpg',
      logo: '/img/clarks-exotica-logo.png',
      description: 'Clarks Exotica is a unique destination designed to inspire and captivate with its natural beauty, stunning surroundings and rich local cultures. Our properties aim to offer guests an unparalleled and unforgettable experience.',
    },
    {
      image: '/img/clarks-inn-express-img.jpg',
      logo: '/img/clarks-inn-express-logo.png',
      description: 'Clarks Inn Express offers economy hotels in India. Our properties aim to offer guests an unparalleled and unforgettable experience.',
    },
    {
      image: '/img/clarks-inn-img.jpg',
      logo: '/img/clarks-inn-logo.png',
      description: 'Clarks Inn is the flagship hotel in India. Our properties aim to offer guests an unparalleled and unforgettable experience.',
    },
    {
      image: '/img/clarks-premier-img.jpg',
      logo: '/img/clarks-premier-logo.png',
      description: 'Clarks Premier provides upscale services. Our properties aim to offer guests an unparalleled and unforgettable experience.',
    },
    {
      image: '/img/clarks-residences-img.jpg',
      logo: '/img/clarks-residences.png',
      description: 'Clarks Residences are fully serviced apartments. Our properties aim to offer guests an unparalleled and unforgettable experience.',
    },
    {
        image: '/img/clarks-aotel-image.jpg',
        logo: '/img/clarks-aotel-logo.webp',
        description: 'Where Modern Design Meets Memorable Stays: aôtel, a new wave of hotels designed for savvy travellers seeking modern comfort and vibrant fun. With prime locations, aôtel redefines the travel experience by offering stylish rooms, inviting social hubs, and unique dining experiences. Breaking away from traditional accommodations, we create exciting stays with like-minded travellers. As a young, vibrant brand, aôtel combines necessary amenities with exceptional style, making every stay refreshingly different and truly unforgettable.',
      },
    // aôtel by clarks inn

    
  ];

  return (
    <>
    {/* <section className="our-brands sec-padding bg-grey">
        <div className="container">
            <div className="global-heading-sec">
                <h2 className="global-heading">our brands</h2>
            </div>
        </div>
        <div className="container-fluid p-0">
            <div className="brands-sliderr">
                <div className="brand-outer-div">
                    <div id="big" >
                        <Swiper
                            spaceBetween={10}
                            loop={true}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mb-4 main-carousel">
                            {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="aspect-video relative w-full">
                                    <div className="brand-slider-item">
                                        <div className="brand-item-description">
                                            <Image src={item.logo} alt={`Thumbnail ${index + 1}`} height={100}
                                            width={150} className="object-contain hote-brand-name-logo"/>
                                            <p className="brand-description">{item.description} </p>
                                        </div>
                                        <Image src={item.image} height={400} width={1000} alt={`Slide ${index + 1}`}
                                        className="object-cover brand-image" />
                                    </div>
                                </div>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div id="thumbs">
                       
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            loop={true}
                            slidesPerView={5}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="thumbs-swiper thumb-carousel">
                            {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="aspect-square relative w-full cursor-pointer">
                                    <div className="brand-logo-item">
                                        <Image src={item.logo}
                                            alt={`Thumbnail ${index + 1}`}
                                            height={100}
                                            width={100}
                                            className="object-contain"/>
                                        </div>
                                </div>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    </section> */}
    </>
  );
};

export default ThumbnailCarousel;
