'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import "@/styles/header.css";
import "@/styles/globals.css";
import "@/styles/style.css";
import ContactPopup from './ContactPopup';

export default function Header() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleEnquireClick1 = () => {
    setShowPopup(true);
  };
  
  const toggleMenu = () => setMenuOpen(prev => !prev);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 40;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
  };

  if (!hasMounted) return null;

  return (
    <>
      <header>
        <nav className={`navbar navbar-expand-md navbar-light fixed-top ${isScrolled ? 'navbar-scroll bg-white shadow-sm' : ''}`}>
          <div className="container">
            <Link className="navbar-brand" href="/">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={92}
                height={62}
                priority
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
              aria-controls="navbarNav"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><Link className="nav-link" href="#about-us" onClick={(e) => scrollToSection(e, 'about-us')}>About Us</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#golf-holiday" onClick={(e) => scrollToSection(e, 'golf-holiday')}>Golf Holiday</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#golf-course" onClick={(e) => scrollToSection(e, 'golf-course')}>Golf Course</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')}>Testimonial</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#golf-info" onClick={(e) => scrollToSection(e, 'golf-info')}>Golf Info</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#" onClick={handleEnquireClick1}>Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {showPopup && <ContactPopup onClose={() => setShowPopup(false)} />}
    </>
  );
}