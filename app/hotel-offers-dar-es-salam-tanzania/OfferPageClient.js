"use client";
import { useState } from "react";
import { BookingEngineProvider } from "../context/BookingEngineContext";
import FilterBar from "../Booking_engine/Filterbar";
import Image from "next/image";
import OfferEnquirenowPopupForm from "../../components/OfferEnquirenowPopupForm";
const offers = [

  // {
  //   propertyOfferId: 'OFR001',
  //   offerFlag: 'NY2026',
  //   offerName:'New Year Offer',
  //   title: "New Year Offer",
  //   image: "/new-year-offer.jpg",
  //   desc: "Celebrate the arrival of 2026 in style at Aura Suites with an unforgettable New Year’s Eve Buffet Dinner at Kinaya Restaurant & Bar! Join us on December 31st from 7 PM to 11 PM for a night featuring a lavish buffet, stunning city views, live music, and complimentary mocktails to toast to the new year.",
  //   price1: "",
  //   price2: "",
  // },

  {
     propertyOfferId: 'OFR002',
      offerFlag: 'WEEKEND',
      offerName: 'Weekend Escape Package',
    title: "Weekend Escape Package",
    image: "/img/Weekend.jpg",
    desc: "Indulge in our Weekend Escape Package. Enjoy a leisurely breakfast in bed, a refreshing complimentary cocktail or mocktail, and a stress-free late checkout. Everything you need for the perfect, relaxing getaway.",
    price1: "Club Suite Up to 3+1 Pax – $ 180",
    price2: "Platinum Suite Up to 4+1 pax - $ 220",
  },
  {
     propertyOfferId: 'OFR003',
      offerFlag: 'HOLIDAY',
      offerName: 'Holiday Staycation',
    title: "Holiday Staycation",
    image: "/img/Holiday Staycation.jpg",
    desc: "Immerse yourself in a festive Holiday Staycation. Your room will be filled with festive décor, you'll enjoy a themed dinner buffet, and receive a small festive gift to celebrate the season in style.",
    price1: "Club Suite Up to 3+1 Pax – $ 250",
    price2: "Platinum Suite Up to 4+1 pax - $ 310",
  },
  {
    propertyOfferId: 'OFR004',
      offerFlag: 'ROMANTIC',
        offerName: 'Romantic Getaway',
    title: "Romantic Getaway",
    image: "/img/Romantic.jpg",
    desc: "Escape together with our Romantic Getaway Package. Your room will be decorated with flowers, balloons, and rose petals, along with a bottle of sparkling wine. Enjoy a magical candlelight dinner on a private rooftop/terrace and a personalized cake to share.",
    price1: "Deluxe Suite – $ 200 For Couple ",
  },
  {
    propertyOfferId: 'OFR005',
      offerFlag: 'WORKSTAY',
        offerName: 'Work & Stay Package',
    title: "Work & Stay Package",
    image: "/img/Work&Stay.jpg",
    desc: "Optimize your productivity and comfort with our Work & Stay Package. You'll have access to high-speed Wi-Fi and a dedicated meeting room for all your business needs. We also provide free printing services and complimentary coffee/tea refills to keep you energized. Plus, enjoy up to 15% off laundry services to make your stay truly hassle-free.",
    price1: "Deluxe Suite – $ 120 for 1 pax and $ 130 for 2 pax ",
  },
  {
    propertyOfferId: 'OFR006',
      offerFlag: 'FAMILYFUN',
        offerName: 'Family Fun Staycation',
    title: "Family Fun Staycation",
    image: "/img/Friends&Family.jpg",
    desc: "Plan the perfect family break with our Family Fun Staycation Package. Stay in a spacious Platinum Suite room, where there’s plenty of space for everyone to relax and play. Best of all, kids under 10 eat free at our restaurants, and they'll have full access to the kids’ club/play area, ensuring endless fun and entertainment for them while you unwind.",
    price1: "Platinum Suite Up to 5+1 pax - $ 235 ",
  },
];

export default function Offers() {
   const [showPopup, setShowPopup] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
  
    // ✅ Static / CMS-driven property info
    const propertyId = '0';
    const propertyName = 'Aura Suites';
    const cityId = '0';

    
  const handleBookNow = (offer) => {
    setSelectedOffer(offer);
    setShowPopup(true);
  };


  return (
    <>
      <BookingEngineProvider>
        <FilterBar />
      </BookingEngineProvider>
      <section className="offers sec-padding">
        <div className="container">
          <div className="global-heading-sec pb-4" data-aos="fade-up">
            <h1 className="global-heading">offers</h1>
            <p>
              The best offers from one of the best hotels in Dar es Salaam,
              exclusively for you!
            </p>
          </div>

          <div className="winter-sec">
            <div className="row">
              {offers.map((offer, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <div className="winter-box">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      height={500}
                      width={500}
                      className="w-100 primary-radius"
                    />
                    <div className="winter-box-content">
                      <h2 className="winter-box-heading">{offer.title}</h2>
                      <p className="winter-box-para">{offer.desc}</p>
                      <h6 className="fw-bold text-center pricing mt-1">
                        {offer.price1}
                      </h6>
                      <h6 className="fw-bold text-center pricing mt-1">
                        {offer.price2}
                      </h6>

                      <div className="winter-box-btn mt-3">
                        <a  className="box-btn book-now"
                        onClick={() => handleBookNow(offer)}>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {showPopup && selectedOffer && (
              <OfferEnquirenowPopupForm
                offer={selectedOffer}
                propertyId={propertyId}
                propertyName={propertyName}
                cityId={cityId}
                onClose={() => setShowPopup(false)}
              />
            )}
    </>
  );
}
