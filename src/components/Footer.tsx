'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const pathRef = useRef<SVGPathElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const path = pathRef.current;
    if (!path) return;

    let pathLength = 1500;
    try {
      pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
    } catch (e) {
      console.warn(e);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 95%',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    tl.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
    });

  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer ref={footerRef} className="footer-section">
      {/* Scroll-triggered path drawing curve */}
      <div className="footer-svg-container">
        <svg viewBox="0 0 1440 287" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            ref={pathRef}
            d="M-7.89288 188.306C136.03 62.1095 199.676 8.36993 391 2.5C632.506 -4.90954 820.542 296.834 1085 285C1305 275.156 1292.5 73 1447.5 44"
            stroke="var(--brand-green)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container">
        <div className="footer-top-grid">
          {/* Column 1: Brand Logo & Desc */}
          <div className="footer-brand-block">
            <div className="footer-logo">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <text x="33" y="63" fontFamily="var(--font-outfit)" fontSize="38" fill="var(--brand-green)" textAnchor="middle">a</text>
                <text x="65" y="63" fontFamily="var(--font-outfit)" fontSize="38" fill="var(--brand-blue)" textAnchor="middle">e</text>
                <path d="M 50 93 A 43 43 0 0 0 50 7" fill="none" stroke="var(--brand-green)" strokeWidth="5" strokeLinecap="round" />
                <path d="M 50 7 A 43 43 0 0 0 50 93" fill="none" stroke="var(--brand-blue)" strokeWidth="5" strokeLinecap="round" />
              </svg>
              <span className="brand-text">ARHAM ESTATE</span>
            </div>
            <p className="footer-brand-desc">
              Premium real estate advisory and investment solutions in Kolkata. Guiding you to the right spaces for life and legacy.
            </p>
            <div className="footer-social-icons">
              <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
              <a href="#" className="social-icon" aria-label="Instagram">ig</a>
              <a href="#" className="social-icon" aria-label="Facebook">fb</a>
              <a href="#" className="social-icon" aria-label="YouTube">yt</a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/properties">Properties</Link></li>
              <li><Link href="/property-finder">Property Finder</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="footer-links-column">
            <h4>Our Services</h4>
            <ul>
              <li><Link href="/services#core-advisory">Core Advisory</Link></li>
              <li><Link href="/services#portfolio-management">Portfolio Management</Link></li>
              <li><Link href="/services#investment-advisory">Investment Advisory</Link></li>
              <li><Link href="/services#property-management">Property Management</Link></li>
              <li><Link href="/services#venture-funds">Venture Funds</Link></li>
              <li><Link href="/services#commercial-real-estate">Commercial Real Estate</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us Details */}
          <div className="footer-contact-block">
            <h4>Contact Us</h4>
            <p className="address-text">
              📍 4, Rani Lochan Mullick Street,<br />
              Kolkata - 700006, West Bengal
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:+913346039205" className="contact-link">+91 33 4603 9205</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉</span>
                <a href="mailto:hello@arhamestate.com" className="contact-link">hello@arhamestate.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <a href="https://www.arhamestate.com" target="_blank" rel="noreferrer" className="contact-link">www.arhamestate.com</a>
              </div>
            </div>
          </div>

          {/* Column 5: Stay Connected */}
          <div className="footer-subscribe-column">
            <h4>Stay Connected</h4>
            <p className="subscribe-desc">
              Subscribe to our newsletter for the latest property updates and insights.
            </p>
            <form onSubmit={handleSubscribe} className="footer-sub-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
                className="footer-sub-input"
              />
              <button type="submit" className="footer-sub-btn" aria-label="Subscribe">
                ➔
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © 2024 Arham Estate. All Rights Reserved.
          </p>
          <div className="legal-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/disclaimer">RERA Disclaimer</Link>
          </div>
        </div>

      </div>

      <style jsx>{`
        .footer-section {
          background-color: #f5f3ef; /* Premium light warm grey */
          padding: 8rem 0 3rem 0;
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--border-main);
          color: var(--text-main);
        }

        .footer-svg-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 150px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.2; /* Soften waves for light theme */
        }

        .footer-svg-container svg {
          width: 100%;
          height: 100%;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.3fr 1.2fr;
          gap: 3rem;
          position: relative;
          z-index: 2;
          margin-bottom: 5rem;
        }

        @media (max-width: 1200px) {
          .footer-top-grid {
            grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
          }
          .footer-subscribe-column {
            grid-column: 1 / -1;
            max-width: 400px;
          }
        }

        @media (max-width: 991px) {
          .footer-top-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
          }
          .footer-subscribe-column {
            grid-column: auto;
          }
        }

        @media (max-width: 576px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .footer-logo svg {
          width: 48px;
          height: 48px;
        }

        .brand-text {
          font-family: var(--font-outfit), sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: -0.01em;
          background: linear-gradient(135deg, var(--brand-green), var(--brand-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-brand-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .footer-social-icons {
          display: flex;
          gap: 0.75rem;
        }

        .social-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.05);
          color: var(--text-main);
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .social-icon:hover {
          background: var(--brand-green);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .footer-links-column h4,
        .footer-contact-block h4,
        .footer-subscribe-column h4 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-links-column ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links-column ul li :global(a) {
          font-size: 0.95rem;
          color: var(--text-muted);
          transition: var(--transition-fast);
        }

        .footer-links-column ul li :global(a:hover) {
          color: var(--brand-green);
          padding-left: 0.25rem;
        }

        .address-text {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        .contact-icon {
          font-size: 1rem;
          opacity: 0.7;
        }

        .contact-link {
          color: var(--text-muted);
          transition: var(--transition-fast);
        }

        .contact-link:hover {
          color: var(--brand-green);
        }

        .subscribe-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .footer-sub-form {
          display: flex;
          width: 100%;
          position: relative;
        }

        .footer-sub-input {
          width: 100%;
          padding: 0.85rem 3rem 0.85rem 1rem;
          border: 1px solid var(--border-main);
          border-radius: 8px;
          background: #ffffff;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.9rem;
          outline: none;
          color: var(--text-main);
        }

        .footer-sub-input:focus {
          border-color: var(--brand-green);
        }

        .footer-sub-btn {
          position: absolute;
          right: 4px;
          top: 4px;
          bottom: 4px;
          width: 36px;
          border-radius: 6px;
          background: var(--brand-green);
          color: #ffffff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .footer-sub-btn:hover {
          background: #4a9122;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2.5rem;
          border-top: 1px solid var(--border-main);
          position: relative;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .footer-bottom {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
        }

        .copyright-text {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .legal-links {
          display: flex;
          gap: 2rem;
        }

        .legal-links :global(a) {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .legal-links :global(a:hover) {
          color: var(--brand-green);
        }
      `}</style>
    </footer>
  );
}
