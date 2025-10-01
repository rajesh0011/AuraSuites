// app/sliders/NewAdditionSlider.js
'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';
import useBook from '../components/useBook';

export default function NewaddSlider({ newhotel }) {
  const { countroom, formRows } = useBook(); // ✅ This is now valid (client-side)

  return (
    <div className="container mt-4">
      {newhotel.length > 0 ? (
        <Swiper
          loop={true}
          spaceBetween={20}
          navigation={false}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 1 },
            1000: { slidesPerView: 4 },
          }}
          modules={[Navigation, Pagination]}
          className="n-hotel-slider"
        >
          {newhotel.map((hotel) => (
            <SwiperSlide key={hotel.hotel_id}>
              <div className="winter-box hotel-box">
                <Image
                  src={hotel.hotel_image || '/placeholder.jpg'}
                  alt={hotel.hotel_name || 'Hotel Image'}
                  width={379}
                  height={220}
                  className="w-100 primary-radius"
                  priority
                />
                <div className="winter-box-content">
                  <div className="hotel-box-content">
                    <h3 className="winter-box-heading">{hotel.hotel_name}</h3>
                  </div>
                  <div className="winter-box-btn justify-content-between d-flex">
                    <Link
                      href={`/Detail/${encodeURIComponent(
                        hotel.brand_slug.replace(/\s+/g, '-').toLowerCase()
                      )}/${encodeURIComponent(
                        hotel.city_alias.replace(/\s+/g, '-').toLowerCase()
                      )}/${encodeURIComponent(
                        hotel.hotel_slug.replace(/\s+/g, '-').toLowerCase()
                      )}`}
                      className="box-btn know-more me-2"
                    >
                      Know More
                    </Link>

                    <Link
                      href={`${hotel.booking_url}/search?Rooms=${countroom}&hotel=&${formRows
                        .map(
                          (row, index) =>
                            `Adults_${index + 1}=${row.count1}&Children_${index + 1}=${row.count2}`
                        )
                        .join('&')}&iataNumber=&locale=en&Currency=INR&offerCode=&flow=tf&multi=false&accessCode=&token=`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="box-btn book-now"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center">Loading or no new hotels found.</p>
      )}
    </div>
  );
}