'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [close, setClose] = useState(false);
  function handleMenuToggle() {
    setClose(!close);
  }
  return (
    <nav className="navbar navbar-expand-lg p-0 header">
      <div className="container-fluid d-flex justify-content-between align-items-center py-2">

        {/* Hamburger on the left (mobile) */}
        <button
          className="navbar-toggler order-0"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <Image className="humburger_icon" src="/menu.svg" alt="menu icon" width={30} height={30} />
        </button>

        {/* Mobile logo */}
        <Link className="navbar-brand mx-auto d-lg-none" href="/">
          <Image src="/img/Aura-logo.png" height={30} width={100} alt="logo" />
        </Link>

        {/* Mobile Book Now */}
        <a className="navbar-toggler book_now order-2 d-lg-none" id="toggleButton1">Book Now</a>

        {/* Desktop logo */}
        <a className="navbar-brand d-none d-lg-block" href="/">
          <Image
            src="/img/Aura-logo.png"
            className="header-logo-black"
            height={200}
            width={300}
            alt="logo"
          />
        </a>

        {/* Nav items */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {/* Close button */}
          <button
            className="close-menu-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <ul className="navbar-nav" onClick={() => setMenuOpen(false)}>
             <li className="nav-item"><Link href="#" className="nav-link">Overview</Link></li>
            <li className="nav-item"><Link href="/suit-rooms-dar-es-salam-tanzania" className="nav-link">Suites</Link></li>
            <li className="nav-item"><Link href='/restaurants-dar-es-salam-tanzania' className='nav-link'>Dining</Link></li>
            <li className="nav-item"><Link href="/event-venue-dar-es-salam-tanzania" className="nav-link">Meetings & Events</Link></li>
            <li className="nav-item"><Link href="/hotel-offers-dar-es-salam-tanzania" className="nav-link">Offer</Link></li>
            <li className="nav-item"><Link href="/hotel-facilities-dar-es-salam-tanzania" className="nav-link">Facilities</Link></li>
            <li className="nav-item"><Link href="/hotel-gallary-dar-es-salam-tanzania" className="nav-link">Gallery</Link></li>
            <li className="nav-item ml-0"><Link href="/hotel-contact-dar-es-salam-tanzania" className="nav-link">Contact us</Link></li>
            {/* <li className="nav-item"><a className="nav-link book-now-header">Book Now</a></li> */}
          </ul>

        </div>
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link book-now-header">Book Now</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
