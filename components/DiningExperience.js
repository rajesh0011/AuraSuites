"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react'
import BookingEnquiryPopup from '@/app/Booking_engine/BookingEnquiryPopup';

const DiningExperience = () => {
    const [showPopup, setShowPopup] = useState(false);

    const section2Ref = useRef();
    const readMore2Ref = useRef();

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
            <section className="hero-section">
                <div className="container">
                    <div className="row justify-content-center">

                        <div className="hero-content col-md-7 col-12">
                            <h2 className="heading">Dining Experience</h2>
                            <p className="description dining_content">
                                Engage your taste buds in sumptuous meals from across the globe at our multi-cuisine rooftop restaurant and bar, Kinaya. Or enjoy the same taste, same meals from the comfort of your suite with our in-suite dining service.
                                Whether your preference is {' '}<a onClick={() => moreContent(section2Ref, readMore2Ref)} className="content" ref={readMore2Ref}>  ...Read More </a>
                            </p>
                            <p ref={section2Ref} className="readmore">continental, oriental, or something else… Our expert chefs cook something delicious for you every day!
                                <a onClick={() => lessContent(section2Ref, readMore2Ref)} className="content">  Read Less</a>
                            </p>

                            <div className="winter-box-btn mt-3">
                                <Link href="https://kinaya.co.tz/" className="box-btn know-more">
                                    Know More
                                </Link>
                                {/* <button className="box-btn book-now py-1" onClick={() => setShowPopup(true)}>
                                    Reserve A Table
                                </button> */}
                                                        <Link
                                href="https://mail.google.com/mail/?view=cm&to=stay@aurasuites.co.tz"
                                target="_blank"
                                className="box-btn book-now py-2 mail-phone-desktop  onClick={() => setShowPopup(true)}"
                            >
                                Reserve A Table
                            </Link>
                           
                           {/* Mobile (Call) */}
                            <Link
                            href="tel:+255746941286"
                            className="box-btn book-now py-1 mail-phone-mobile"
                            >
                            Reserve A Table
                            </Link>
                           

                            </div>
                        </div>
                        <div className="hero-image col-md-5 col-12 p-0">
                            <Image height={500} width={600} quality={100} className="img_banner" src="/images/banner2.png" alt="premium-suites-in-dar-es-salaam-tanzia" title="Comfortable Premium Suites in Dar es Salaam, Tanzania at Aura Suites" />
                        </div>
                    </div>
                </div>
            </section>

             {showPopup && (
              <BookingEnquiryPopup
                 propertyName="Aura Suites"
                mode="header"
                onClose={() => setShowPopup(false)}
              />
            )}

            <style>
      {
        `
       
              
         .mail-phone-desktop{
          display:inline
            //   padding: 7px 10px !important;
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

           
         }
        `
      }
    </style>
        </>
    )
}

export default DiningExperience