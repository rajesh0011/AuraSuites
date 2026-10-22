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
                    <div className="row text-center">
                        <div className="hero-content col-12 mx-auto text-center" style={{ maxWidth: "900px" }}>
                            <h1 className="subheading ">Aura Suites — Where the Comfort of Home Meets Exceptional Hospitality.</h1>
                            <h2 className="heading text-center">Feel at Home in the Heart of Dar es Salaam</h2>
                            <div>
                                <p className="description">Welcome to Aura Suites, where the warmth and comfort of home are complemented by the refined service of a premium hotel. <br/>
                                Whether you are visiting Dar es Salaam for business, travelling with family, or planning an extended stay, Aura Suites has been thoughtfully designed to make every stay effortless and enjoyable. Our spacious suites offer generous living areas, private balconies, high-speed Wi-Fi, and well-equipped kitchens, providing the ideal space to work, relax, entertain, and truly feel at home.
                                    <button onClick={() => moreContent(section1Ref, readMore1Ref)} className="content" ref={readMore1Ref}> ...Read More</button>
                                </p>

                                <p ref={section1Ref} className="readmore"> Our Two- and Three-Bedroom Suites are particularly well suited for extended stays, families, and corporate travelers, offering the privacy and comfort of a private residence with the convenience and attentive service of a full-service hotel. <br/><br/>
                                    Ideally located in the heart of Dar es Salaam, Aura Suites provides easy access to the city's business districts, embassies, hospitals, shopping centers, and other key destinations, allowing you to spend less time travelling and more time enjoying your stay.<br/><br/>
                                    At Aura Suites, every guest is at the heart of everything we do. Our dedicated team takes pride in understanding your individual preferences and delivering warm, attentive, and personalized service to ensure every stay is both comfortable and memorable.<br/><br/>
                                    Dining is an integral part of the Aura Suites experience. Our menus are thoughtfully crafted to offer quality, variety, and flexibility, with meals prepared to suit your tastes, dietary preferences, and schedule. Wherever possible, we use fresh, seasonal produce sourced from our own farm, and we prepare selected cheeses in-house, bringing freshness, authenticity, and exceptional quality to every dining experience.
                                    Whether you are staying for a few nights, several weeks, or welcoming colleagues, family, or friends, Aura Suites offers spacious accommodation, personalized hospitality, flexible dining, and a prime location, creating an experience that truly feels like a home away from home. <br/><br/>

                                   


                                    <button onClick={() => lessContent(section1Ref, readMore1Ref)} className="content">  Read Less</button>
                                </p>


                            </div>
                        </div>
                        {/* <div className="hero-image col-lg-4 col-12 p-0">
                                <Image className="img_banner" height={500} width={700} quality={100} src="/img/banner1.jpg" alt="Looking-for-best-suites-in-dar-es-salaam" 
                                title='Luxury Living at the Best Suites in Dar es Salaam, Aura Suites' />
                            </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection