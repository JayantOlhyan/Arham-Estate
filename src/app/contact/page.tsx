'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Message Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initial animations
    gsap.from('.contact-hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // Form and Info box trigger
    gsap.from('.contact-form-col', {
      scrollTrigger: {
        trigger: '.contact-form-section',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.contact-info-col', {
      scrollTrigger: {
        trigger: '.contact-form-section',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.15,
      ease: 'power3.out',
    });

    // Locations trigger
    gsap.from('.office-node', {
      scrollTrigger: {
        trigger: '.locations-section',
        start: 'top 80%',
      },
      x: -30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
    });

    gsap.from('.locations-map-box', {
      scrollTrigger: {
        trigger: '.locations-section',
        start: 'top 80%',
      },
      scale: 0.98,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert('Please agree to the privacy policy & terms.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      alert('Message sent successfully! Our relationship team will connect with you within 24 hours.');
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setAgree(false);
      setSubmitted(false);
    }, 500);
  };

  return (
    <div ref={scrollContainerRef} className="main-layout-wrapper">
      <Header />

      {/* Contact Hero Section */}
      <section className="contact-hero-section">
        <img src="/images/classical_facade.jpg" alt="Heritage Headquarters Facade" className="contact-hero-bg" />
        <div className="contact-hero-overlay"></div>
        
        <div className="container contact-hero-box">
          <div className="contact-hero-content">
            <span className="section-label text-green">Contact Us</span>
            <h1 className="contact-hero-title">
              Let's build <br />
              something <span className="text-highlight">extraordinary.</span>
            </h1>
            <p className="contact-hero-desc">
              Whether you're looking to invest, sell, lease or explore opportunities, our experts are here to assist you.
            </p>
            
            <div className="contact-quick-methods">
              <div className="quick-item">
                <span className="quick-icon">📞</span>
                <div className="quick-text">
                  <span>Call Us</span>
                  <a href="tel:+913346039205">+91 33 4603 9205</a>
                </div>
              </div>
              <div className="quick-item">
                <span className="quick-icon">✉</span>
                <div className="quick-text">
                  <span>Email Us</span>
                  <a href="mailto:hello@arhamestate.com">hello@arhamestate.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forms & Get in touch info */}
      <section className="contact-form-section">
        <div className="container contact-form-grid">
          
          {/* Left Form */}
          <div className="contact-form-col">
            <h3>Send us a message</h3>
            <form onSubmit={handleFormSubmit} className="contact-message-form">
              <div className="form-row-double">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="contact-input" 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="contact-input" 
                />
              </div>
              <div className="form-row-double">
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  required 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="contact-input" 
                />
                <select 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  className="contact-select"
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Buy a Property">Buy a Property</option>
                  <option value="Sell / Lease Back">Sell / Lease Back</option>
                  <option value="Portfolio Advice">Portfolio Advisory</option>
                  <option value="Careers">Careers</option>
                </select>
              </div>
              <textarea 
                placeholder="Your Message" 
                rows={5} 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="contact-textarea"
              />
              
              <label className="agree-checkbox-label">
                <input 
                  type="checkbox" 
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span className="chkbox-bubble"></span>
                <span className="chkbox-text">
                  I agree to the <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms & Conditions</Link>
                </span>
              </label>

              <button type="submit" disabled={submitted} className="btn btn-primary submit-msg-btn">
                Send Message &nbsp;→
              </button>
            </form>
          </div>

          {/* Right Get in Touch info card */}
          <div className="contact-info-col">
            <div className="contact-info-box">
              <h3>Get in touch</h3>
              
              <div className="info-detail-block">
                <div className="info-detail-node">
                  <span className="info-node-icon">📍</span>
                  <div className="info-node-text">
                    <h6>Head Office</h6>
                    <p>4, Rani Lochan Mullick Street,<br />Kolkata - 700006, West Bengal</p>
                  </div>
                </div>
                
                <div className="info-detail-node">
                  <span className="info-node-icon">📞</span>
                  <div className="info-node-text">
                    <h6>Phone</h6>
                    <a href="tel:+913346039205">+91 33 4603 9205</a>
                  </div>
                </div>

                <div className="info-detail-node">
                  <span className="info-node-icon">✉</span>
                  <div className="info-node-text">
                    <h6>Email</h6>
                    <a href="mailto:hello@arhamestate.com">hello@arhamestate.com</a>
                  </div>
                </div>

                <div className="info-detail-node">
                  <span className="info-node-icon">🌐</span>
                  <div className="info-node-text">
                    <h6>Website</h6>
                    <a href="https://www.arhamestate.com" target="_blank" rel="noreferrer">www.arhamestate.com</a>
                  </div>
                </div>

                <div className="info-detail-node">
                  <span className="info-node-icon">🕒</span>
                  <div className="info-node-text">
                    <h6>Business Hours</h6>
                    <p>Mon - Sat: 10:00 AM - 6:30 PM<br />Sunday: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Locations mapping */}
      <section className="locations-section">
        <div className="container locations-grid">
          
          {/* Left Offices list */}
          <div className="locations-left">
            <span className="section-label">Our Locations</span>
            <div className="offices-list-stack">
              <div className="office-node">
                <h5>Kolkata (Head Office)</h5>
                <p>4, Rani Lochan Mullick Street, Kolkata - 700006, West Bengal</p>
              </div>
              <div className="office-node">
                <h5>New Town Office</h5>
                <p>Unit 1203, Tower 3, Ecospace Business Park, New Town, Kolkata - 700160</p>
              </div>
              <div className="office-node">
                <h5>Salt Lake Office</h5>
                <p>DF Block, Sector I, Salt Lake, Kolkata - 700064</p>
              </div>
            </div>
          </div>

          {/* Right map rendering */}
          <div className="locations-map-box">
            <img src="/images/kolkata_city_map.jpg" alt="Central Kolkata Location Map" className="locations-map-img" />
          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="contact-cta-section">
        <div className="container contact-cta-box">
          <h2>Ready to take the next step?</h2>
          <p>Book a private consultation with our experts and let's create enduring value together.</p>
          <Link href="/enquire" className="btn btn-secondary contact-cta-btn">
            Book a Consultation &nbsp;→
          </Link>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        /* Hero Styling */
        .contact-hero-section {
          position: relative;
          padding: 13rem 0 7rem 0;
          overflow: hidden;
          background: #090b0e;
        }

        .contact-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          opacity: 0.35;
        }

        .contact-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(9, 11, 14, 0.95) 40%, rgba(9, 11, 14, 0.4) 100%);
          z-index: 2;
        }

        .contact-hero-box {
          position: relative;
          z-index: 3;
        }

        .contact-hero-title {
          font-size: clamp(2.5rem, 5vw, 4.25rem);
          line-height: 1.1;
          color: #ffffff;
          margin-bottom: 1.5rem;
        }

        .text-highlight {
          color: var(--brand-green);
          font-family: var(--font-outfit), sans-serif;
          font-style: italic;
          font-weight: 600;
        }

        .contact-hero-desc {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.6;
          margin-bottom: 3.5rem;
          max-width: 580px;
        }

        .contact-quick-methods {
          display: flex;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .quick-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .quick-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          color: var(--brand-green);
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .quick-text {
          display: flex;
          flex-direction: column;
        }

        .quick-text span {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .quick-text a {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.1rem;
          color: #ffffff;
          font-weight: 600;
        }

        /* Message Form */
        .contact-form-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .contact-form-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 5rem;
        }

        @media (max-width: 991px) {
          .contact-form-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .contact-form-col h3, .contact-info-col h3 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.75rem;
          color: var(--text-main);
          margin-bottom: 2rem;
          font-weight: 700;
        }

        .contact-message-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row-double {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 576px) {
          .form-row-double {
            grid-template-columns: 1fr;
          }
        }

        .contact-input, .contact-select, .contact-textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 1px solid rgba(15, 23, 42, 0.2);
          background: #ffffff;
          border-radius: 10px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          color: var(--text-main);
          outline: none;
          transition: var(--transition-fast);
        }

        .contact-input:focus, .contact-select:focus, .contact-textarea:focus {
          border-color: var(--brand-green);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(89, 165, 44, 0.15);
        }

        .agree-checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          cursor: pointer;
          position: relative;
        }

        .agree-checkbox-label input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .chkbox-bubble {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid var(--border-main);
          background: var(--bg-card);
          display: inline-block;
          position: relative;
        }

        .agree-checkbox-label input:checked ~ .chkbox-bubble {
          background-color: var(--brand-green);
          border-color: var(--brand-green);
        }

        .chkbox-bubble:after {
          content: "";
          position: absolute;
          display: none;
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .agree-checkbox-label input:checked ~ .chkbox-bubble:after {
          display: block;
        }

        .chkbox-text :global(a) {
          color: var(--brand-blue);
          text-decoration: underline;
        }

        .submit-msg-btn {
          align-self: flex-start;
          padding: 1.1rem 3rem;
        }

        @media (max-width: 576px) {
          .submit-msg-btn {
            width: 100%;
            text-align: center;
          }
        }

        /* Right get in touch details */
        .contact-info-box {
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 24px;
          padding: 3rem;
        }

        .info-detail-block {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .info-detail-node {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .info-node-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .info-node-text h6 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1rem;
          color: var(--text-main);
          font-weight: 750;
          margin-bottom: 0.25rem;
        }

        .info-node-text p, .info-node-text a {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .info-node-text a:hover {
          color: var(--brand-green);
        }

        /* Office locations mapping */
        .locations-section {
          padding: 8rem 0;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-main);
        }

        .locations-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 5rem;
          align-items: center;
        }

        @media (max-width: 991px) {
          .locations-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .offices-list-stack {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 3rem;
        }

        .office-node {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-main);
        }

        .office-node:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .office-node h5 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.15rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .office-node p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .locations-map-box {
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--border-main);
          aspect-ratio: 16/10;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .locations-map-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* CTA Consultation Section */
        .contact-cta-section {
          padding: 6rem 0;
          background: linear-gradient(135deg, #12191c, #090c0e);
          color: #ffffff;
          text-align: center;
        }

        .contact-cta-box {
          max-width: 700px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .contact-cta-box h2 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 2.25rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .contact-cta-box p {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 2.5rem;
        }

        .contact-cta-btn {
          padding: 1.1rem 3rem;
          border-radius: 50px;
          background: var(--brand-green);
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-weight: 600;
        }

        .contact-cta-btn:hover {
          background-color: #4a9122;
        }
      `}</style>
    </div>
  );
}
