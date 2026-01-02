"use client"
import React, { useRef } from 'react'
import Image from "next/image";

const HeroSection = () => {
        const section1Ref = useRef();
    const readMore1Ref = useRef();

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
                            <div className="hero-content col-lg-8 col-12">
                                <h1 className="subheading ">Aura Suites Dar es Salaam Tanzania</h1>
                                <h2 className="heading text-left">DISCOVER UNPARALLELED COMFORT IN DAR ES SALAAM</h2>
                                <div>
                                    <p className="description">Looking for a comfortable and luxurious hotel in Dar es Salaam for your next business trip or staycation? Look no further. Aura Suites has got you covered!
                                        Our all-suite hotel in the Upanga business district of Dar es Salaam provides you with a comfortable
                                        <button onClick={() => moreContent(section1Ref, readMore1Ref)} className="content" ref={readMore1Ref}> ...Read More</button>
                                    </p>
    
                                    <p ref={section1Ref} className="readmore"> and luxurious stay experience. With 70+ well-maintained suites, a multicuisine restaurant, fitness centre, and swimming pool, Aura Suites provide you with the best of everything you can ask for when visiting Dar es Salaam.
                                        Come, discover unparalleled comfort in Dar es Salaam with Aura Suites!
                                        <button onClick={() => lessContent(section1Ref, readMore1Ref)} className="content">  Read Less</button>
                                    </p>
    
    
                                </div>
                            </div>
                            <div className="hero-image col-lg-4 col-12 p-0">
                                <Image className="img_banner" height={500} width={700} quality={100} src="/img/banner1.jpg" alt="Dar Es Salaam view" />
                            </div>
                        </div>
                    </div>
                </section>
                </>
  )
}

export default HeroSection