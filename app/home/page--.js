"use client"
import { BookingEngineProvider } from "../context/BookingEngineContext";
import Image from 'next/image';
import NewHotel from '../sliders/NewHotel';
import NewOfferSlider from "../sliders/NewOfferSlider"
import ThumbnailCarousel from '../sliders/ThumbnailCarausel';
import Experiences from './Experience';
import StatsCounter from './Counter';
import FilterBar from "../Booking_engine/Filterbar";
import Link from "next/link";
// import PortfolioSection from './Portfolio';
// import FormSidebar from "./form";



// import Filterbar from '@/app/Booking_engine/Filterbar';

function Home() {
    return (
        <>

       
            <BookingEngineProvider>
                <FilterBar></FilterBar>
            </BookingEngineProvider>

            {/* <FormSidebar></FormSidebar> */}
 <section className="hero-section">
      <div className="hero-content">
        <p className="subheading">Aura Suites Dar es Salaam Tanzania</p>
        <h1 className="heading">DISCOVER UNPARALLELED COMFORT IN DAR ES SALAAM</h1>
        <p className="description">
          Escape to a world of unparalleled comfort and refined elegance at Aura Suites centrally located within the business district of Upanga in Dar Es Salaam. 
          <a href="#" className="read-more"> Read More</a>
        </p>
      </div>
      <div className="hero-image">
        <img src={image} alt="Dar Es Salaam view" />
      </div>
    </section>
            <section className="your-break sec-padding">
                <div className="container">
                    <div className="global-heading-sec" data-aos="fade-up">
                        <h2 className="global-heading">Your winter break is here</h2>
                    </div>
                    <div className="winter-sec">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="winter-box">
                                    <Image
                                        src="/img/winter-1.jpg"
                                        alt="winter image" height={500} width={500}
                                        className="w-100 primary-radius" />
                                    <div className="winter-box-content">
                                        <h3 className="winter-box-heading">book direct &amp; save 25%</h3>
                                        <p className="winter-box-para">
                                            Lorem Ipsum is simply dummy text of the printing{" "}
                                        </p>
                                        <div className="winter-box-btn">
                                            <a href="#" className="box-btn know-more">
                                                Know More
                                            </a>
                                            <a href="#" className="box-btn book-now">
                                                Book Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="winter-box">
                                    <Image
                                        src="/img/winter-2.jpg"
                                        alt="winter image" height={500} width={500}
                                        className="w-100 primary-radius" />
                                    <div className="winter-box-content">
                                        <h3 className="winter-box-heading">inaugural offer</h3>
                                        <p className="winter-box-para">
                                            Lorem Ipsum is simply dummy text of the printing{" "}
                                        </p>
                                        <div className="winter-box-btn">
                                            <a href="#" className="box-btn know-more">
                                                Know More
                                            </a>
                                            <a href="#" className="box-btn book-now">
                                                Book Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="winter-box">
                                    <Image
                                        src="/img/winter-3.jpg"
                                        alt="winter image" height={500} width={500}
                                        className="w-100 primary-radius" />
                                    <div className="winter-box-content">
                                        <h3 className="winter-box-heading">new beginnings</h3>
                                        <p className="winter-box-para">
                                            Lorem Ipsum is simply dummy text of the printing{" "}
                                        </p>
                                        <div className="winter-box-btn">
                                            <a href="#" className="box-btn know-more">
                                                Know More
                                            </a>
                                            <a href="#" className="box-btn book-now">
                                                Book Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            

           {/* <PortfolioSection></PortfolioSection> */}


            {/* <Link href="/about#whysec">Go to About Page Why Us Section</Link> */}

            <NewHotel/> 
            
            <StatsCounter/>
            
            <Experiences></Experiences>
            
            <NewOfferSlider/> 

            <section className="events-conferences sec-padding">
                <div className="container">
                    <div
                        className="global-heading-sec"
                        data-aos="fade-left"
                        data-aos-duration={2500}
                    >
                        <h2 className="global-heading">Events &amp; conferences</h2>
                    </div>
                    <div className="winter-sec" data-aos="fade-up" data-aos-duration={2000}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="winter-box">
                                    <Image
                                        src="/img/event-1.jpg"
                                        alt="winter image" height={500} width={500}
                                        className="w-100 primary-radius" />
                                    <div className="winter-box-content">
                                        <h3 className="winter-box-heading">corporate meeting</h3>
                                        <p className="winter-box-para">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting
                                            industry.{" "}
                                        </p>
                                        <div className="winter-box-btn">
                                            <a href="#" className="box-btn know-more">
                                                Know More
                                            </a>
                                            <a href="#" className="box-btn book-now">
                                                Book Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="winter-box">
                                    <Image
                                        src="/img/event-2.jpg"
                                        alt="winter image" height={500} width={500}
                                        className="w-100 primary-radius" />
                                    <div className="winter-box-content">
                                        <h3 className="winter-box-heading">wedding by clarks</h3>
                                        <p className="winter-box-para">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting
                                            industry.{" "}
                                        </p>
                                        <div className="winter-box-btn">
                                            <a href="#" className="box-btn know-more">
                                                Know More
                                            </a>
                                            <a href="#" className="box-btn book-now">
                                                Book Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="winter-box">
                                    <Image
                                        src="/img/event-3.jpg"
                                        alt="winter image" height={500} width={500}
                                        className="w-100 primary-radius" />
                                    <div className="winter-box-content">
                                        <h3 className="winter-box-heading">conference room</h3>
                                        <p className="winter-box-para">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting
                                            industry.{" "}
                                        </p>
                                        <div className="winter-box-btn">
                                            <a href="#" className="box-btn know-more">
                                                Know More
                                            </a>
                                            <a href="#" className="box-btn book-now">
                                                Book Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ThumbnailCarousel/>

            {/* <section className="media-news sec-padding">
                <div className="container">
                    <div
                        className="global-heading-sec">
                        <h2 className="global-heading">Media &amp; news</h2>
                    </div>
                    <div className="media-box">
                        <div className="row">
                            <div className="col-lg-4 col-md-4">
                                <div className="media-item">
                                    <Image src="/img/media-1.jpg" className="w-100" alt="media-1" height={500} width={500} />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="media-item">
                                    <Image src="/img/media-2.jpg" className="w-100" alt="media-1" height={500} width={500} />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="media-item">
                                    <Image src="/img/media-3.jpg" className="w-100" alt="media-1" height={500} width={500} />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="media-item">
                                    <Image src="/img/media-4.jpg" className="w-100" alt="media-1" height={500} width={500} />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="media-item">
                                    <Image src="/img/media-5.jpg" className="w-100" alt="media-1" height={500} width={500} />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="media-item">
                                    <Image src="/img/media-6.jpg" className="w-100" alt="media-1" height={500} width={500} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

        </>
    );
}

export default Home
