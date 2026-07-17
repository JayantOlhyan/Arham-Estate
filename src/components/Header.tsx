'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="container header-wrap">
        {/* Brand Logo & Name */}
        <a href="#" className="logo-link">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <text x="33" y="63" fontFamily="var(--font-outfit)" fontSize="38" fill="var(--brand-green)" textAnchor="middle">a</text>
            <text x="65" y="63" fontFamily="var(--font-outfit)" fontSize="38" fill="var(--brand-blue)" textAnchor="middle">e</text>
            <path d="M 50 93 A 43 43 0 0 0 50 7" fill="none" stroke="var(--brand-green)" strokeWidth="5" strokeLinecap="round" />
            <path d="M 50 7 A 43 43 0 0 0 50 93" fill="none" stroke="var(--brand-blue)" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <span className="brand-text">ARHAM ESTATE</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            
            {/* Services Dropdown */}
            <li 
              className="dropdown-li"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="#services" onClick={(e) => { e.preventDefault(); toggleDropdown('services'); }}>
                Services <span className="caret"></span>
              </a>
              <ul className={`dropdown-menu ${activeDropdown === 'services' ? 'show' : ''}`}>
                <li><a href="#services-residential">Residential</a></li>
                <li><a href="#services-commercial">Commercial</a></li>
                <li><a href="#services-others">Others (Land, Warehouse)</a></li>
              </ul>
            </li>

            {/* Strategic Advisory Dropdown */}
            <li 
              className="dropdown-li"
              onMouseEnter={() => setActiveDropdown('advisory')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="#advisory" onClick={(e) => { e.preventDefault(); toggleDropdown('advisory'); }}>
                Strategic Advisory <span className="caret"></span>
              </a>
              <ul className={`dropdown-menu ${activeDropdown === 'advisory' ? 'show' : ''}`}>
                <li><a href="#advisory-portfolio">Portfolio Management</a></li>
                <li><a href="#advisory-venture">Venture Funds</a></li>
                <li><a href="#advisory-consultancy">Exclusive Consultancy</a></li>
                <li><a href="#advisory-developers">Developers Services</a></li>
                <li><a href="#advisory-landlords">Landlord Services</a></li>
              </ul>
            </li>

            <li><a href="#finance">Finance</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact" className="btn btn-primary nav-contact-btn">Contact Us</a></li>
          </ul>
        </nav>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-nav-drawer ${isMenuOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><a href="#" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About Us</a></li>
            
            <li className="mobile-dropdown">
              <span onClick={() => toggleDropdown('m-services')}>Services</span>
              <ul className={`mobile-dropdown-menu ${activeDropdown === 'm-services' ? 'show' : ''}`}>
                <li><a href="#services-residential" onClick={() => setIsMenuOpen(false)}>Residential</a></li>
                <li><a href="#services-commercial" onClick={() => setIsMenuOpen(false)}>Commercial</a></li>
                <li><a href="#services-others" onClick={() => setIsMenuOpen(false)}>Others</a></li>
              </ul>
            </li>

            <li className="mobile-dropdown">
              <span onClick={() => toggleDropdown('m-advisory')}>Strategic Advisory</span>
              <ul className={`mobile-dropdown-menu ${activeDropdown === 'm-advisory' ? 'show' : ''}`}>
                <li><a href="#advisory-portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio Management</a></li>
                <li><a href="#advisory-venture" onClick={() => setIsMenuOpen(false)}>Venture Funds</a></li>
                <li><a href="#advisory-consultancy" onClick={() => setIsMenuOpen(false)}>Exclusive Consultancy</a></li>
                <li><a href="#advisory-developers" onClick={() => setIsMenuOpen(false)}>Developers Services</a></li>
                <li><a href="#advisory-landlords" onClick={() => setIsMenuOpen(false)}>Landlord Services</a></li>
              </ul>
            </li>

            <li><a href="#finance" onClick={() => setIsMenuOpen(false)}>Finance</a></li>
            <li><a href="#blog" onClick={() => setIsMenuOpen(false)}>Blog</a></li>
            <li><a href="#contact" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>Contact Us</a></li>
          </ul>
        </nav>
      </div>

      <style jsx>{`
        .caret {
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 4px;
          vertical-align: middle;
          border-top: 4px solid;
          border-right: 4px solid transparent;
          border-left: 4px solid transparent;
          transition: var(--transition-fast);
        }

        .dropdown-li:hover .caret {
          transform: rotate(180deg);
        }

        .desktop-nav {
          display: block;
        }

        @media (max-width: 991px) {
          .desktop-nav {
            display: none;
          }
        }

        .dropdown-li {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: var(--bg-dark-card);
          border: 1px solid var(--border-dark);
          min-width: 220px;
          list-style: none;
          padding: 0.75rem 0;
          border-radius: 8px;
          opacity: 0;
          visibility: hidden;
          transition: var(--transition-smooth);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .dropdown-li:hover .dropdown-menu,
        .dropdown-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-menu li a {
          display: block;
          padding: 0.5rem 1.5rem;
          font-size: 0.9rem;
          color: var(--text-light);
          white-space: nowrap;
        }

        .dropdown-menu li a:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--brand-green);
          padding-left: 1.75rem;
        }

        .nav-contact-btn {
          padding: 0.5rem 1.5rem;
          font-size: 0.9rem;
        }

        /* Hamburger styles */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 101;
        }

        @media (max-width: 991px) {
          .hamburger {
            display: flex;
          }
        }

        .hamburger span {
          width: 100%;
          height: 2px;
          background-color: var(--text-light);
          transition: var(--transition-smooth);
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile nav drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 300px;
          height: 100vh;
          background: var(--bg-dark-card);
          z-index: 99;
          padding: 100px 2rem 2rem 2rem;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
          transition: var(--transition-smooth);
        }

        .mobile-nav-drawer.open {
          right: 0;
        }

        .mobile-nav-drawer nav ul {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
          list-style: none;
        }

        .mobile-nav-drawer nav ul li a, 
        .mobile-dropdown > span {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--text-light);
          cursor: pointer;
        }

        .mobile-dropdown {
          width: 100%;
        }

        .mobile-dropdown-menu {
          list-style: none;
          padding: 0.5rem 0 0 1rem;
          display: none;
          flex-direction: column;
          gap: 0.75rem;
          border-left: 1px solid var(--border-dark);
          margin-top: 0.5rem;
        }

        .mobile-dropdown-menu.show {
          display: flex;
        }

        .mobile-dropdown-menu li a {
          font-size: 1rem;
          color: var(--text-muted);
        }

        .mobile-dropdown-menu li a:hover {
          color: var(--brand-green);
        }
      `}</style>
    </header>
  );
}
