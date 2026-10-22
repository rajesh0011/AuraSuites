'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

import OfferEnquirenowPopupForm from '../components/OfferEnquirenowPopupForm';
import Link from 'next/link';


const HomeOffer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // ✅ Static / CMS-driven property info
  const propertyId = '0';
  const propertyName = 'Aura Suites';
  const cityId = '0';

  const offers = [


    // {
    //   propertyOfferId: 'OFR001',
    //   offerFlag: 'NY2026',
    //   offerName: 'New Year Offer',
    //   title: 'New Year offer',
    //   image: '/new-year-offer.jpg',
    //   desc:
    //     "Celebrate the arrival of 2026 in style at Aura Suites with an unforgettable New Year’s Eve Buffet Dinner at Kinaya Restaurant & Bar! Join us on December 31st from 7 PM to 11 PM for a night featuring a lavish buffet, stunning city views, live music, and complimentary mocktails to toast to the new year."
    // },


    // {
    //   propertyOfferId: 'OFR001',
    //   offerFlag: 'VALENTINE',
    //   offerName: 'Valentine Offer',
    //   title: 'Valentine offer',
    //   image: '/img/Valentine-offer.png',
    //   desc:
    //     "Experience an intimate Valentine’s dinner under the stars at Aura Suites! Enjoy a 6-course menu, champagne, and live music for TZS 150,000 per couple. Book your romantic evening now!"
    // },

    {
      propertyOfferId: 'OFR002',
      offerFlag: 'WEEKEND',
      offerName: 'Weekend Escape Package',
      title: 'Weekend Escape Package',
      image: '/img/Weekend.jpg',
      desc:
        'Indulge in our Weekend Escape Package. Enjoy a leisurely breakfast in bed, a refreshing complimentary cocktail or mocktail, and a stress-free late checkout. Everything you need for the perfect, relaxing getaway.'
    },
    {
      propertyOfferId: 'OFR003',
      offerFlag: 'HOLIDAY',
      offerName: 'Holiday Staycation',
      title: 'Holiday Staycation',
      image: '/img/Holiday Staycation.jpg',
      desc:
        'Immerse yourself in a festive Holiday Staycation. Your room will be filled with festive décor, you will enjoy a themed dinner buffet, and receive a small festive gift to celebrate the season in style.'
    },
    {
      propertyOfferId: 'OFR004',
      offerFlag: 'ROMANTIC',
      offerName: 'Romantic Getaway',
      title: 'Romantic Getaway',
      image: '/img/Romantic.jpg',
      desc:
        'Escape together with our Romantic Getaway Package. Your room will be decorated with flowers, balloons, and rose petals, along with a bottle of sparkling wine. Enjoy a magical candlelight dinner on a private rooftop/terrace and a personalized cake to share.'
    }
  ];

  const handleBookNow = (offer) => {
    setSelectedOffer(offer);
    setShowPopup(true);
  };

  return (
    <>
      <section className="offers sec-padding bg_blue hero-section">
        <div className="container">
          <div className="global-heading-sec pb-4" data-aos="fade-up">
            <h2 className="global-heading">Offers</h2>
            <p>
              The best offers from one of the best hotels in Dar es Salaam,
              exclusively for you!
            </p>
          </div>

          <div className="winter-sec">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={3}
              navigation
              pagination={false}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 }
              }}
            >
              {offers.map((offer, index) => (
                <SwiperSlide key={index}>
                  <div className="winter-box">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      title={offer.offerName}
                      height={500}
                      width={500}
                      className="w-100 primary-radius"
                    />

                    <div className="winter-box-content">
                      <h3 className="winter-box-heading">{offer.title}</h3>
                      <p className="winter-box-para three-line-text">
                        <span>{offer.desc}</span>
                      </p>

                      <div className="winter-box-btn mt-2">
                        <Link
                          href="/hotel-offers-dar-es-salam-tanzania"
                          className="box-btn know-more"
                        >
                          Know More
                        </Link>

                        {/* ✅ Book Now Button */}
                        {/* <button
                          className="box-btn book-now py-1"
                          onClick={() => handleBookNow(offer)}
                        >
                          Book Now
                        </button> */}

                        <Link  href="https://www.swiftbook.io/inst/#home?propertyId=683MjQtJhLD4VkO2NM3U6SC7gypDrc6S6Y6NjieOzNTM=&JDRN=Y"
                         target="_blank" className="box-btn book-now mail-phone-desktop">Book Now</Link>

                         <Link href="https://www.swiftbook.io/inst/#home?propertyId=683MjQtJhLD4VkO2NM3U6SC7gypDrc6S6Y6NjieOzNTM=&JDRN=Y"
                            target="_blank" className="box-btn book-now py-1 mail-phone-mobile">Book Now</Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ✅ Popup */}
      {showPopup && selectedOffer && (
        <OfferEnquirenowPopupForm
          offer={selectedOffer}
          propertyId={propertyId}
          propertyName={propertyName}
          cityId={cityId}
          onClose={() => setShowPopup(false)}
        />
      )}




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
  );
};

export default HomeOffer;
