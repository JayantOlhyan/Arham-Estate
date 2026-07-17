'use client';

import React, { useEffect, useRef } from 'react';
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
          {/* Logo & Brand block */}
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
              Kolkata's premier integrated real estate services firm providing residential, commercial, retail, land and strategic advisory solutions.
            </p>
          </div>

          {/* Quick links block */}
          <div className="footer-links-column">
            <h4>Services</h4>
            <ul>
              <li><a href="#services-residential">Residential Properties</a></li>
              <li><a href="#services-commercial">Commercial Spaces</a></li>
              <li><a href="#services-others">Others (Land, Warehouse)</a></li>
              <li><a href="#finance">Financial Advisory</a></li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h4>Strategic Advisory</h4>
            <ul>
              <li><a href="#advisory-portfolio">Portfolio Management</a></li>
              <li><a href="#advisory-venture">Venture Funds</a></li>
              <li><a href="#advisory-consultancy">Exclusive Consultancy</a></li>
              <li><a href="#advisory-developers">Developers Services</a></li>
              <li><a href="#advisory-landlords">Landlord Services</a></li>
            </ul>
          </div>

          {/* Address & Contact Details */}
          <div className="footer-contact-block">
            <h4>Address</h4>
            <p className="address-text">
              <strong>Arham Estate</strong> <br />
              2 Ram Lochan Mullick Street, <br />
              1st Floor, Kolkata 700073, <br />
              Bengal, India
            </p>
            <div className="contact-details">
              <span className="contact-label">Email:</span>
              <a href="mailto:info@arhamestate.com" className="email-link">info@arhamestate.com</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} Arham Estate. All Rights Reserved.
          </p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#disclaimer">Disclaimer</a>
            <a href="#terms">Terms of Use</a>
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
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 4rem;
          position: relative;
          z-index: 2;
          margin-bottom: 5rem;
        }

        @media (max-width: 991px) {
          .footer-top-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
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
          max-width: 320px;
        }

        .footer-links-column h4,
        .footer-contact-block h4 {
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

        .footer-links-column ul li a {
          font-size: 0.95rem;
          color: var(--text-muted);
          transition: var(--transition-fast);
        }

        .footer-links-column ul li a:hover {
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
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        .contact-label {
          color: var(--text-muted);
        }

        .email-link {
          color: var(--brand-blue);
          text-decoration: underline;
        }

        .email-link:hover {
          color: var(--brand-green);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
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

        .legal-links a {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .legal-links a:hover {
          color: var(--brand-green);
        }
      `}</style>
    </footer>
  );
}
