"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react'

const DiningExperience = () => {

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
                                <Link href="#" className="box-btn know-more">
                                    Know More
                                </Link>
                                <button className="box-btn book-now py-1">
                                    Reserve A Table
                                </button>
                            </div>
                        </div>
                        <div className="hero-image col-md-5 col-12 p-0">
                            <Image height={500} width={600} quality={100} className="img_banner" src="/images/banner2.png" alt="Dar Es Salaam view" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DiningExperience