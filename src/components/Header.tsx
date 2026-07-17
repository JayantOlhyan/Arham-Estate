'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Helper to check active route hierarchy (including nested paths)
  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    
    // Parent matches nested pages, e.g. /properties and /properties/aurus both match /properties
    if (href.startsWith('/properties')) {
      return pathname.startsWith('/properties');
    }
    if (href.startsWith('/insights')) {
      return pathname.startsWith('/insights');
    }
    if (href.startsWith('/services')) {
      return pathname.startsWith('/services');
    }
    return pathname.startsWith(href);
  };

  // Scroll listener for scrolled state and hide/reveal direction check
  useEffect(() => {
    const transparentPages = ['/', '/insights', '/contact', '/careers'];

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state
      const scrolled = currentScrollY > 40;
      setIsScrolled(scrolled);

      // Transparent state (at top of specific image-hero pages)
      const transparentPage = transparentPages.includes(pathname);
      setIsTransparent(currentScrollY < 40 && transparentPage);

      // Hide on scroll down quickly, reveal on scroll up
      if (currentScrollY > 120) {
        const isScrollingDown = currentScrollY > lastScrollY.current;
        const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);

        if (scrollDiff > 8) {
          if (isScrollingDown) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // GSAP animation for header translation when visible changes
  useEffect(() => {
    if (!headerRef.current) return;
    
    gsap.killTweensOf(headerRef.current);
    gsap.to(headerRef.current, {
      y: isVisible ? 0 : -100,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, [isVisible]);

  // Close drawer and reset overflow on path change
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  // Body scroll lock & Keyboard Escape handler for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // GSAP animation for mobile menu items entrance
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMenuOpen) {
      gsap.killTweensOf('.mobile-nav-link');
      gsap.fromTo(
        '.mobile-nav-link',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    }
  }, [isMenuOpen]);

  const toggleMobileDropdown = (menu: string) => {
    setActiveMobileDropdown(activeMobileDropdown === menu ? null : menu);
  };

  return (
    <header
      ref={headerRef}
      className={`header-main-el ${isScrolled ? 'scrolled' : ''} ${
        isTransparent ? 'transparent-nav' : ''
      }`}
    >
      <div className="header-wrap">
        
        {/* LEFT ZONE: BRAND LOGO */}
        <div className="logo-container">
          <Link href="/" className="logo-link" aria-label="Arham Estate Home">
            <img src="/images/logo.png" alt="Arham Estate Logo" className="brand-logo-img" />
            <span className="brand-text">ARHAM ESTATE</span>
          </Link>
        </div>

        {/* CENTER ZONE: DESKTOP NAVIGATION */}
        <nav className="desktop-nav" aria-label="Main Desktop Navigation">
          <ul className="nav-menu-list">
            <li>
              <Link href="/" className={`nav-link ${isLinkActive('/') ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={`nav-link ${isLinkActive('/about') ? 'active' : ''}`}>
                About Us
              </Link>
            </li>
            
            {/* SERVICES DROPDOWN */}
            <li className="dropdown-wrapper">
              <Link href="/services" className={`nav-link ${isLinkActive('/services') ? 'active' : ''}`}>
                Services <span className="caret"></span>
              </Link>
              <div className="dropdown-menu dropdown-services">
                <div className="dropdown-inner">
                  <ul className="dropdown-links-list">
                    <li><Link href="/services#core-advisory" className="dropdown-item-link">Core Advisory</Link></li>
                    <li><Link href="/services#portfolio-management" className="dropdown-item-link">Portfolio Management</Link></li>
                    <li><Link href="/services#investment-advisory" className="dropdown-item-link">Investment Advisory</Link></li>
                    <li><Link href="/services#property-management" className="dropdown-item-link">Property Management</Link></li>
                    <li><Link href="/services#venture-funds" className="dropdown-item-link">Venture Funds</Link></li>
                    <li><Link href="/services#commercial-real-estate" className="dropdown-item-link">Commercial Real Estate</Link></li>
                  </ul>
                </div>
              </div>
            </li>

            {/* PROPERTIES DROPDOWN */}
            <li className="dropdown-wrapper">
              <Link href="/properties" className={`nav-link ${isLinkActive('/properties') ? 'active' : ''}`}>
                Properties <span className="caret"></span>
              </Link>
              <div className="dropdown-menu dropdown-properties">
                <div className="dropdown-inner two-col-dropdown">
                  <div className="dropdown-left-col">
                    <ul className="dropdown-links-list">
                      <li><Link href="/properties" className="dropdown-item-link font-bold">View All Properties</Link></li>
                      <li><Link href="/properties?type=Apartment" className="dropdown-item-link">Residential</Link></li>
                      <li><Link href="/properties?type=Commercial" className="dropdown-item-link">Commercial</Link></li>
                      <li><Link href="/properties?budget=₹10+Cr" className="dropdown-item-link">Luxury Properties</Link></li>
                      <li><Link href="/properties?status=ready-to-move" className="dropdown-item-link">Ready to Move</Link></li>
                      <li><Link href="/properties?status=under-construction" className="dropdown-item-link">Under Construction</Link></li>
                    </ul>
                  </div>
                  <div className="dropdown-right-col">
                    <span className="dropdown-featured-label">Featured Project</span>
                    <Link href="/properties/aurus" className="featured-project-preview-card">
                      <div className="feat-image-wrap">
                        <img src="/images/aurus_building.jpg" alt="Aurus Luxury Project EM Bypass" />
                      </div>
                      <div className="feat-details">
                        <h5>Aurus</h5>
                        <p>EM Bypass, Central Kolkata</p>
                        <span className="feat-price">₹3.21 Cr* onwards</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <Link href="/property-finder" className={`nav-link ${isLinkActive('/property-finder') ? 'active' : ''}`}>
                Property Finder
              </Link>
            </li>
            <li>
              <Link href="/insights" className={`nav-link ${isLinkActive('/insights') ? 'active' : ''}`}>
                Insights
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`nav-link ${isLinkActive('/contact') ? 'active' : ''}`}>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* RIGHT ZONE: CTA ENQUIRE NOW */}
        <div className="cta-container">
          <Link href="/enquire" className="btn btn-primary nav-enquire-btn">
            <span>Enquire Now</span>
            <span className="btn-arrow-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>

        {/* HAMBURGER TOGGLE BUTTON (MOBILE) */}
        <button
          className={`hamburger-toggle-btn ${isMenuOpen ? 'menu-active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line line-1"></span>
          <span className="hamburger-line line-2"></span>
          <span className="hamburger-line line-3"></span>
        </button>

      </div>

      {/* MOBILE FULL-SCREEN DRAWER PANEL */}
      <div
        ref={mobileMenuRef}
        className={`mobile-nav-drawer-panel ${isMenuOpen ? 'panel-open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-drawer-inner">
          <nav className="mobile-drawer-nav" aria-label="Main Mobile Navigation">
            <ul className="mobile-nav-list">
              <li className="mobile-nav-link">
                <Link href="/">Home</Link>
              </li>
              <li className="mobile-nav-link">
                <Link href="/about">About Us</Link>
              </li>
              
              {/* MOBILE ACCORDION SERVICES */}
              <li className="mobile-nav-link mobile-accordion-wrapper">
                <button
                  className="mobile-accordion-header"
                  onClick={() => toggleMobileDropdown('services')}
                  aria-expanded={activeMobileDropdown === 'services'}
                >
                  <span>Services</span>
                  <span className={`accordion-chevron ${activeMobileDropdown === 'services' ? 'rotate' : ''}`}>▾</span>
                </button>
                <div className={`mobile-accordion-content ${activeMobileDropdown === 'services' ? 'open' : ''}`}>
                  <ul className="mobile-accordion-links">
                    <li><Link href="/services#core-advisory">Core Advisory</Link></li>
                    <li><Link href="/services#portfolio-management">Portfolio Management</Link></li>
                    <li><Link href="/services#investment-advisory">Investment Advisory</Link></li>
                    <li><Link href="/services#property-management">Property Management</Link></li>
                    <li><Link href="/services#venture-funds">Venture Funds</Link></li>
                    <li><Link href="/services#commercial-real-estate">Commercial Real Estate</Link></li>
                  </ul>
                </div>
              </li>

              {/* MOBILE ACCORDION PROPERTIES */}
              <li className="mobile-nav-link mobile-accordion-wrapper">
                <button
                  className="mobile-accordion-header"
                  onClick={() => toggleMobileDropdown('properties')}
                  aria-expanded={activeMobileDropdown === 'properties'}
                >
                  <span>Properties</span>
                  <span className={`accordion-chevron ${activeMobileDropdown === 'properties' ? 'rotate' : ''}`}>▾</span>
                </button>
                <div className={`mobile-accordion-content ${activeMobileDropdown === 'properties' ? 'open' : ''}`}>
                  <ul className="mobile-accordion-links">
                    <li><Link href="/properties">View All Properties</Link></li>
                    <li><Link href="/properties?type=Apartment">Residential</Link></li>
                    <li><Link href="/properties?type=Commercial">Commercial</Link></li>
                    <li><Link href="/properties?budget=₹10+Cr">Luxury Properties</Link></li>
                    <li><Link href="/properties?status=ready-to-move">Ready to Move</Link></li>
                    <li><Link href="/properties?status=under-construction">Under Construction</Link></li>
                  </ul>
                </div>
              </li>

              <li className="mobile-nav-link">
                <Link href="/property-finder">Property Finder</Link>
              </li>
              <li className="mobile-nav-link">
                <Link href="/insights">Insights</Link>
              </li>
              <li className="mobile-nav-link">
                <Link href="/careers">Careers</Link>
              </li>
              <li className="mobile-nav-link">
                <Link href="/contact">Contact Us</Link>
              </li>
              
              <li className="mobile-nav-link mobile-cta-item">
                <Link href="/enquire" className="btn btn-primary mobile-cta-btn">
                  Enquire Now &nbsp;→
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <style jsx>{`
        /* Header Base */
        .header-main-el {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 88px;
          z-index: 1000;
          background: #FAF9F6;
          border-bottom: 1px solid rgba(15, 23, 42, 0.05);
          transition: background 0.3s ease, height 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease;
        }

        .header-wrap {
          position: relative;
          display: flex;
          justify-content: center; /* Center navigation list */
          align-items: center;
          height: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* LEFT ZONE: Logo container styling */
        .logo-container {
          position: absolute;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          z-index: 10;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .brand-logo-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
        }

        .logo-link:hover .brand-logo-img {
          transform: scale(1.08);
        }

        .brand-text {
          font-family: var(--font-outfit), sans-serif;
          font-weight: 750;
          font-size: 1.25rem;
          letter-spacing: -0.01em;
          background: linear-gradient(135deg, var(--brand-green), var(--brand-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: color 0.3s ease, -webkit-text-fill-color 0.3s ease, text-shadow 0.3s ease;
        }

        /* CENTER ZONE: Navigation links centering */
        .desktop-nav {
          display: flex;
          align-items: center;
          z-index: 5;
        }

        .nav-menu-list {
          display: flex;
          list-style: none;
          align-items: center;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          position: relative;
          color: var(--text-light);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          font-weight: 550;
          padding: 0.6rem 0;
          transition: color 0.25s ease;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--brand-green);
        }

        /* Animated underline logic */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--brand-green);
          transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .caret {
          display: inline-block;
          width: 0;
          height: 0;
          vertical-align: middle;
          border-top: 4px solid var(--text-light);
          border-right: 4px solid transparent;
          border-left: 4px solid transparent;
          transition: transform 0.25s ease, border-top-color 0.3s ease;
          margin-top: 2px;
        }

        .dropdown-wrapper:hover .caret {
          transform: rotate(180deg);
        }

        /* RIGHT ZONE: CTA button styling */
        .cta-container {
          position: absolute;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          z-index: 10;
        }

        .nav-enquire-btn {
          padding: 0.65rem 1.6rem;
          font-size: 0.92rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-arrow-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          padding: 3px;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .btn-arrow-icon svg {
          width: 100%;
          height: 100%;
        }

        .nav-enquire-btn:hover .btn-arrow-icon {
          transform: translateX(4px);
          background: rgba(255, 255, 255, 0.25);
        }

        /* DROPDOWNS BASE DESIGN */
        .dropdown-wrapper {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.3s;
          z-index: 100;
          padding-top: 16px;
        }

        .dropdown-wrapper:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-inner {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.06);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
          min-width: 250px;
        }

        .dropdown-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .dropdown-item-link {
          display: block;
          padding: 0.65rem 1.25rem;
          color: var(--text-light);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.9rem;
          font-weight: 550;
          border-radius: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .dropdown-item-link:hover {
          background: rgba(89, 165, 44, 0.05);
          color: var(--brand-green);
          padding-left: 1.5rem;
        }

        .dropdown-item-link.font-bold {
          font-weight: 700;
          color: var(--text-light);
          border-bottom: 1px solid rgba(15, 23, 42, 0.04);
          border-radius: 0;
          margin-bottom: 0.25rem;
          padding-bottom: 0.75rem;
        }

        /* PROPERTIES WIDE TWO-COLUMN DROPDOWN */
        .dropdown-properties {
          width: 580px;
        }

        .two-col-dropdown {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2rem;
          padding: 1.75rem;
        }

        .dropdown-left-col {
          border-right: 1px solid rgba(15, 23, 42, 0.06);
          padding-right: 1.5rem;
        }

        .dropdown-right-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .dropdown-featured-label {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.75rem;
          font-weight: 750;
          color: var(--brand-green);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .featured-project-preview-card {
          display: block;
          width: 100%;
          background: #FAF9F6;
          border: 1px solid rgba(15, 23, 42, 0.04);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .featured-project-preview-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
          border-color: rgba(89, 165, 44, 0.15);
        }

        .feat-image-wrap {
          width: 100%;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
          position: relative;
          overflow: hidden;
        }

        .feat-image-wrap img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .featured-project-preview-card:hover .feat-image-wrap img {
          transform: scale(1.03);
        }

        .feat-details {
          padding: 0.85rem 1rem;
        }

        .feat-details h5 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.05rem;
          color: var(--text-light);
          margin-bottom: 0.15rem;
          font-weight: 700;
        }

        .feat-details p {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .feat-price {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--brand-green);
        }

        /* SCROLLED STATE NAVBAR */
        .header-main-el.scrolled {
          height: 76px;
          background: rgba(250, 249, 246, 0.94);
          backdrop-filter: blur(12px);
          border-bottom-color: rgba(15, 23, 42, 0.06);
          box-shadow: 0 4px 30px rgba(15, 23, 42, 0.02);
        }

        /* TRANSPARENT HEADER ON HERO IMAGES AT TOP */
        .header-main-el.transparent-nav {
          background: transparent;
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        .header-main-el.transparent-nav .brand-text {
          /* Do not remove background gradient, just override the fill color to allow smooth transition */
          color: #ffffff;
          -webkit-text-fill-color: #ffffff;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .header-main-el.transparent-nav .brand-logo-img {
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45));
        }

        .header-main-el.transparent-nav .nav-link {
          color: #ffffff;
        }

        .header-main-el.transparent-nav .nav-link:hover,
        .header-main-el.transparent-nav .nav-link.active {
          color: #ffffff;
        }

        .header-main-el.transparent-nav .nav-link::after {
          background-color: #ffffff;
        }

        .header-main-el.transparent-nav .caret {
          border-top-color: #ffffff;
        }

        .header-main-el.transparent-nav .nav-enquire-btn {
          background: transparent;
          border: 1.5px solid #ffffff;
          color: #ffffff;
          box-shadow: none;
        }

        .header-main-el.transparent-nav .nav-enquire-btn:hover {
          background: #ffffff;
          color: #0F172A;
          border-color: #ffffff;
        }

        .header-main-el.transparent-nav .hamburger-line {
          background-color: #ffffff;
        }

        /* MOBILE HAMBURGER TOGGLE BUTTON */
        .hamburger-toggle-btn {
          display: none;
          position: absolute;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          flex-direction: column;
          justify-content: space-between;
          width: 28px;
          height: 19px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 10002;
        }

        .hamburger-line {
          width: 100%;
          height: 2.2px;
          background-color: var(--text-light);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, background-color 0.3s ease;
        }

        /* Active Hamburger (X formation) */
        .hamburger-toggle-btn.menu-active .hamburger-line {
          background-color: var(--text-light) !important;
        }

        .hamburger-toggle-btn.menu-active .line-1 {
          transform: translateY(8.5px) rotate(45deg);
        }

        .hamburger-toggle-btn.menu-active .line-2 {
          opacity: 0;
        }

        .hamburger-toggle-btn.menu-active .line-3 {
          transform: translateY(-8.5px) rotate(-45deg);
        }

        /* MOBILE NAVIGATION DRAWER */
        .mobile-nav-drawer-panel {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          max-width: 440px;
          height: 100vh;
          background: #FAF9F6;
          z-index: 9999;
          box-shadow: -15px 0 40px rgba(15, 23, 42, 0.05);
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav-drawer-panel.panel-open {
          right: 0;
        }

        .mobile-drawer-inner {
          padding: 8.5rem 2.5rem 3rem 2.5rem;
          width: 100%;
          min-height: 100%;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .mobile-nav-link {
          opacity: 0; /* Animated stagger on open */
        }

        .mobile-nav-link :global(a) {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.65rem;
          font-weight: 600;
          color: var(--text-light);
          display: block;
          padding: 0.35rem 0;
        }

        .mobile-nav-link :global(a:hover) {
          color: var(--brand-green);
        }

        /* MOBILE ACCORDIONS */
        .mobile-accordion-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .mobile-accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          background: transparent;
          border: none;
          padding: 0.35rem 0;
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.65rem;
          font-weight: 600;
          color: var(--text-light);
          text-align: left;
          cursor: pointer;
        }

        .accordion-chevron {
          font-size: 1.15rem;
          color: var(--text-muted);
          transition: transform 0.25s ease;
        }

        .accordion-chevron.rotate {
          transform: rotate(180deg);
          color: var(--brand-green);
        }

        .mobile-accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-accordion-content.open {
          max-height: 380px;
        }

        .mobile-accordion-links {
          list-style: none;
          padding: 0.5rem 0 0.5rem 1.25rem;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-left: 1px solid rgba(15, 23, 42, 0.06);
        }

        .mobile-accordion-links :global(a) {
          font-family: var(--font-inter), sans-serif;
          font-size: 1rem;
          color: var(--text-muted);
          font-weight: 550;
        }

        .mobile-accordion-links :global(a:hover) {
          color: var(--brand-green);
        }

        .mobile-cta-item {
          margin-top: 1.5rem;
        }

        .mobile-cta-btn {
          width: 100%;
          text-align: center;
          padding: 1rem;
          font-size: 1.05rem;
          display: block;
        }

        /* RESPONSIVE BREAKPOINTS */
        @media (max-width: 1024px) {
          .desktop-nav,
          .cta-container {
            display: none;
          }

          .hamburger-toggle-btn {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .mobile-drawer-inner {
            padding: 7rem 1.5rem 2rem 1.5rem;
          }
          
          .mobile-nav-link :global(a),
          .mobile-accordion-header {
            font-size: 1.45rem;
          }
          
          .brand-text {
            font-size: 1.15rem;
          }
        }
      `}</style>
    </header>
  );
}
