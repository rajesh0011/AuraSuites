"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./BannerSlider.module.css";

export default function BannerSlider() {
  const banners = [
    {
      desktop: "/images/Aura-Suites-Desktop.jpg",
      mobile: "/images/Aura-Suites-Mobile.jpg",
      alt: "Aura Suites banner image",
    },
    {
      desktop: "/images/Restaurant.jpg",
      mobile: "/images/RestaurantMobile.jpg",
      alt: "Aura Suites banner image 2",
    },
    {
      desktop: "/images/Grand-Celestial-Hall.jpg",
      mobile: "/images/Grand-Celestial-Hallmobile.jpg",
      alt: "Aura Suites banner image 3",
    },
    {
      desktop: "/images/inayaRooftop.jpg",
      mobile: "/images/inayaRooftopmobile.jpg",
      alt: "Aura Suites banner image 4",
    },
    // {
    //   desktop: "/images/Galaxy-conference-Hall.jpg",
    //   mobile: "/images/Galaxy-conference-Hallmobile.jpg",
    //   alt: "Aura Suites banner image 5",
    // },
    {
      desktop: "/images/inayaRooftop3.jpg",
      mobile: "/images/inayaRooftopmobile2.jpg",
      alt: "Aura Suites banner image 6",
    },
    // {
    //   desktop: "/images/Orbit-Conference-Hall.jpg",
    //   mobile: "/images/Orbit-Conference-Hallmobile.jpg",
    //   alt: "Aura Suites banner image 7",
    // },
    // {
    //   desktop: "/images/Platinum-Sutie-Living-Room.jpg",
    //   mobile: "/images/Platinum-Sutie-Living-Room-mobile.jpg",
    //   alt: "Aura Suites banner image 8",
    // },
  ];

  return (
    <section className={styles.bannerSection}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        speed={700}
        observer={true}
        observeParents={true}
        updateOnWindowResize={true}
        watchOverflow={false}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
        className={styles.bannerSwiper}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className={styles.bannerImage}>
              <Image
                src={banner.mobile}
                alt={banner.alt}
                // title={banner.alt}
                fill
                sizes="100vw"
                quality={100}
                priority={index === 0}
                className={`${styles.bannerImg} ${styles.mobileImg}`}
              />

              <Image
                src={banner.desktop}
                alt={banner.alt}
                // title={banner.alt}
                fill
                quality={100}
                priority={index === 0}
                className={`${styles.bannerImg} ${styles.desktopImg}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
