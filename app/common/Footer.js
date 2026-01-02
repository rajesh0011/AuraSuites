import React from "react";
// import logo from "../public/logo.png"; // Replace with your logo path
import Image from "next/image";
import {
  FaFacebookF,
  FaLinkedin,
  FaInstagram,
  // FaTripadvisor
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-light pt-5 pb-2 border-top footer">
        <div className="container">
          <div className="row text-muted">
            {/* Left: Logo and Address */}
            <div className="col-md-4 mb-4 mb-md-0 footer_logo align-items-left justify-content-start">
              <div className="footer_logo">
                <Image
                  src="/img/auara-logo-black.png"
                  alt="Aura Suites Logo"
                  width={100}
                  height={100}
                />
              </div>
              <div className="text_muted">
                <p className="mb-1">
                  Aura Suites : 108/1 Morogoro Rd,<br />
                  Dar es Salaam, Tanzania
                </p>
                <p>
                  Visit: Morogoro Road at Lumumba Road Junction, Dar-es-Salaam
                  <br />

                </p>
                
              </div>
              {/* Newsletter Section */}
                <div className="newslater mt-3">
                      <h5>Join our news letter</h5>
                      <div className="input-btn">
                        <input type="text" placeholder="Enter your email..." className="form-control" />
                        <button type="button" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    <label className="agree mt-1">
                      <input type="checkbox" className="checkbox-1"/>
                           &nbsp; I agree to the <a className="text-primary" href="" >privacy policy</a>.
                        </label>                 
                </div>
            </div>
            {/* Center: Contact Links */}
            <div className="col-md-4 mb-4 mb-md-0 footer_menu align-items-center">
              <div className="mid-column-data">
                <h5 className="">CONTACT US</h5>
              <ul className="list-unstyled footer_menu">
                <li><a href="#" className="text-decoration-none">FAQs</a></li>
                <li><a href="#" className="text-decoration-none">Terms & Conditions</a></li>
                <li><a href="#" className="text-decoration-none">Security & Safety</a></li>
                <li><a href="#" className="text-decoration-none">Privacy Policy</a></li>
              </ul>
              <div className="footer_social2 mt-4">
                <p className="mb-1">
                  <a href="tel:+255746941286" className="">+255746941286  (Front Desk) </a> <br />
                </p>
                <p className="mb-2">
                  Email: <a href="mailto:stay@aurasuites.co.tz" className="text-primary">stay@aurasuites.co.tz</a>
                </p>

                <div className="d-flex gap-3 align-items-left">
                  <p className="mb-0">Follow us on</p>
                  <a href="https://www.instagram.com/aura.suites?igsh=ODRpbmppb201b2pj"><FaInstagram className="text-muted" /></a>
                  <a href="https://www.facebook.com/aurasuitestanzania/"><FaFacebookF className="text-muted" /></a>
                  <a href="https://www.linkedin.com/company/81654313/admin/dashboard/"><FaLinkedin className="text-muted" /></a>

                  {/* <a href="#"><FaTripadvisor className="text-muted" /></a> */}
                </div>
               
                </div>
              </div>
            </div>

            {/* Right: Phone, Email, Social */}
            <div className="col-12 col-md-4 text-md-end map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.962343752243!2d39.2773796!3d-6.8140351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4bd618fe546d%3A0x7a9d363114c33575!2s1081%2F1%20Morogoro%20Rd%2C%20Dar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2stz!4v1699363636363"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              
            </div>
            
          </div>
          
      </footer>
      <div className="copyright-section">
        <p>
          Copyright ©2025, Aura Suites. All Rights Reserved. Powered By{" "}
          <a href="https://www.cinuniverse.com" target="_blank" rel="noopener noreferrer">
            CIN Universe
          </a>.
        </p>
      </div>
    </>
  );
};

export default Footer;
