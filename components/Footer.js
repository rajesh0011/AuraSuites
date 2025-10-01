"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faInstagram, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
export default function FooterPage() {
  useEffect(() => {
    AOS.init();
  }, []);
  
  return (
    <footer className="footer bg-grey py-5">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-lg-4 col-md-6 justify-content-start">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={180}
              height={100}
              className="ftr_logo"
              style={{ width: "auto", height: "auto" }} // Ensures aspect ratio remains intact
            />
            <div> <Link href="/">
              <h5>Golf Kindle</h5>
            </Link>
              <p className="text-capitalize">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p></div>
          </div>
          <div className="col-lg-4 col-md-6 text-left">
            <ul>
              <li>Careers
              </li>
              <li>Golf Kindle Club</li>
              <li>Shops
              </li>
              <li>Golf Kindle Leadership Cente</li>
              <li>Blog</li>
              <li>Contact</li>
              <li>Media Contact</li>
              <li>Tracking Preferences</li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 text-left">
            <div className="row">
              <div className="col-md-6">
                <div className="text-left">
                  <div className="social-icons">
                    <Link href="https://www.facebook.com/people/Golf-Kindle/61575957660596/" target="_blank" className="mr-3">
                      <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                    <Link href="#" className="mr-3">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </Link>
                    <Link href="https://www.instagram.com/golfkindle/" target="_blank" className="mr-3">
                      <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                  </div>
                  <div className="lang1"> <FontAwesomeIcon icon={faGlobe} /> English</div>
                  <ul className="terms-list">
                    <li>Terms of Use</li>
                    <li>BEIAN CN SITE</li>
                    <li> Do Not Sell Information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
