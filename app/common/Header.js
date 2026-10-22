"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPhone } from "react-icons/fi";

const QUICK_BOOK_EVENT = "aura:open-quick-book";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBookNowClick = (event) => {
    event.preventDefault();
    setMenuOpen(false);

    if (document.getElementById("quick-book")) {
      window.dispatchEvent(new CustomEvent(QUICK_BOOK_EVENT));
      return;
    }

    window.location.href = "/#quick-book";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg p-0 header">
        <div className="container-fluid d-flex justify-content-between align-items-center py-2 mobile-header-row">
          {/* Hamburger on the left (mobile) */}
          <button
            className="navbar-toggler order-0 flex-shrink-0"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <Image
              className="humburger_icon"
              src="/menu.svg"
              alt="hamberger menu icon"
              title="Aura suites Hamberger menu icon"
              width={30}
              height={30}
            />
          </button>

          {/* Mobile logo */}
          <Link className="navbar-brand d-lg-none mobile-brand" href="/">
            <Image
              src="/img/Aura-logo.png"
              height={30}
              width={100}
              alt="Aura Suites Logo"
              title="Aura Suites Logo"
            />
          </Link>

          <div className="d-flex align-items-center gap-2 d-lg-none mobile-header-actions flex-shrink-0">
            {/* Mobile phone */}
            <a
              href="tel:+255746941286"
              className="nav-link d-flex align-items-center justify-content-center mobile-phone-link"
              aria-label="Call Aura Suites"
              title="Call Aura Suites"
            >
              <FiPhone size={18} />
            </a>

            {/* Mobile Book Now */}
            <a
              className="navbar-toggler book_now"
              href="/#quick-book"
              id="toggleButton1"
              onClick={handleBookNowClick}
            >
              Book Now
            </a>
          </div>

          {/* Desktop logo */}
          <Link className="navbar-brand d-none d-lg-block" href="/">
            <Image
              src="/img/Aura-logo.png"
              className="header-logo-black"
              height={200}
              width={300}
              alt="Aura Suites Logo"
              title="Aura Suites Logo"
            />
          </Link>

          {/* Nav items */}
          <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
            {/* Close button */}
            <button
              className="close-menu-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              &times;
            </button>
            <ul className="navbar-nav" onClick={() => setMenuOpen(false)}>
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  Overview
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/suites-room-dar-es-salam-tanzania"
                  className="nav-link"
                >
                  Suites
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/restaurants-dar-es-salam-tanzania"
                  className="nav-link"
                >
                  Dining
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/event-venue-dar-es-salam-tanzania"
                  className="nav-link"
                >
                  Meetings & Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/hotel-offers-dar-es-salam-tanzania"
                  className="nav-link"
                >
                  Offers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/hotel-facilities-dar-es-salam-tanzania"
                  className="nav-link"
                >
                  Facilities
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/hotel-gallary-dar-es-salam-tanzania"
                  className="nav-link"
                >
                  Gallery
                </Link>
              </li>
              <li className="nav-item ml-0">
                <Link
                  href="/hotel-contact-dar-es-salam-tanzania"
                  className="nav-link"
                >
                  Contact us
                </Link>
              </li>
              {/* <li className="nav-item"><a className="nav-link book-now-header">Book Now</a></li> */}
            </ul>
          </div>
          <ul className="navbar-nav d-none d-lg-flex align-items-center">
            {/* Phone */}
            <li className="nav-item me-3">
              <a
                href="tel:+255746941286"
                className="nav-link d-flex align-items-center"
                aria-label="Call Aura Suites"
                title="Call Aura Suites"
              >
                <FiPhone size={16} /> <span style={{marginLeft: "10px"}}>+255 746 941 286</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link book-now-header"
                href="/#quick-book"
                onClick={handleBookNowClick}
              >
                Book Now
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
