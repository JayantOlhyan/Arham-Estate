'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locationsList = ['EM Bypass', 'Alipore', 'New Town', 'Rajarhat', 'Salt Lake', 'Howrah'];
const budgetsList = ['₹1.5 Cr - ₹3 Cr', '₹3 Cr - ₹5 Cr', '₹5 Cr - ₹10 Cr', '₹10 Cr+ onwards'];
const typesList = ['Apartment', 'Boutique Home', 'Commercial Space', 'Venture Fund', 'Land Parcel'];
const configsList = ['2 BHK', '3 BHK', '4 BHK', '5 BHK', 'Commercial Floor'];
const timelinesList = ['Immediate', 'Within 6 Months', 'Within 1 Year', 'Under Construction'];

export default function EnquirePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [lookingFor, setLookingFor] = useState('Residential Properties');
  
  const [budget, setBudget] = useState('');
  const [propType, setPropType] = useState('');
  const [config, setConfig] = useState('');
  const [timeline, setTimeline] = useState('');
  const [purpose, setPurpose] = useState('Both');
  const [note, setNote] = useState('');
  const [agree, setAgree] = useState(false);

  // Sidebar search
  const [projectSearch, setProjectSearch] = useState('');

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
    const tl = gsap.timeline();
    tl.from('.enq-hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out'
    });

    tl.from('.enq-badges-grid > *', {
      scale: 0.95,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.4');

    // Form box entrance
    gsap.from('.enq-form-main-card', {
      scrollTrigger: {
        trigger: '.enq-form-section',
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.enq-sidebar-card', {
      scrollTrigger: {
        trigger: '.enq-form-section',
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      delay: 0.15,
      ease: 'power3.out'
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert('Please agree to the privacy policy.');
      return;
    }
    alert(`Enquiry submitted successfully! A portfolio specialist will contact you on ${phone} shortly.`);
    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setCity('');
    setNote('');
    setAgree(false);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <div ref={scrollContainerRef} className="main-layout-wrapper">
      <Header />

      {/* Hero Section */}
      <section className="enq-hero-section">
        <div className="container">
          
          <nav className="breadcrumbs-bar">
            <Link href="/">Home</Link>
            <span className="bread-sep">&gt;</span>
            <span className="bread-curr">Enquire Now</span>
          </nav>

          <div className="enq-hero-grid">
            <div className="enq-hero-content">
              <h1 className="enq-hero-title">
                We're here to <br />
                help you <span className="text-highlight">move forward.</span>
              </h1>
              <p className="enq-hero-desc">
                Share your requirements and our real estate experts will connect with you shortly with the best options.
              </p>
            </div>
            
            <div className="enq-hero-media">
              <img src="/images/luxury_living_room.jpg" alt="Luxury Living Room Interior" className="enq-hero-img" />
            </div>
          </div>

          <div className="enq-badges-grid">
            <div className="enq-badge-node">
              <span className="eb-icon">🛡</span>
              <div className="eb-text">
                <h6>100% Confidential</h6>
                <p>Your information is safe with us.</p>
              </div>
            </div>
            <div className="enq-badge-node">
              <span className="eb-icon">👥</span>
              <div className="eb-text">
                <h6>Expert Guidance</h6>
                <p>Personalised advice from real experts.</p>
              </div>
            </div>
            <div className="enq-badge-node">
              <span className="eb-icon">🕒</span>
              <div className="eb-text">
                <h6>Quick Response</h6>
                <p>We'll get back to you within 24 hours.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Form Section */}
      <section className="enq-form-section">
        <div className="container enq-form-grid-layout">
          
          {/* Left Form */}
          <div className="enq-form-main-card">
            <h3>Tell us about your requirement</h3>
            
            <form onSubmit={handleEnquirySubmit} className="enquiry-main-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="enq-input" 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address <span className="required">*</span></label>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="enq-input" 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number <span className="required">*</span></label>
                  <input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="enq-input" 
                  />
                </div>
                <div className="form-group">
                  <label>Preferred City / Location</label>
                  <select value={city} onChange={(e) => setCity(e.target.value)} className="enq-select">
                    <option value="">Select location</option>
                    {locationsList.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Looking for selector cards */}
              <div className="form-group">
                <label>I am looking for <span className="required">*</span></label>
                <div className="looking-selector-grid">
                  {[
                    { name: 'Residential Properties', icon: '🏢' },
                    { name: 'Commercial Properties', icon: '🏬' },
                    { name: 'Plot / Land', icon: '🏡' },
                    { name: 'Investment Opportunity', icon: '📈' }
                  ].map((item) => (
                    <div 
                      key={item.name} 
                      className={`selector-item-card ${lookingFor === item.name ? 'selected' : ''}`}
                      onClick={() => setLookingFor(item.name)}
                    >
                      <span className="sel-icon">{item.icon}</span>
                      <span className="sel-name">{item.name}</span>
                      {lookingFor === item.name && <span className="sel-tick">✓</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Budget Range</label>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)} className="enq-select">
                    <option value="">Select budget range</option>
                    {budgetsList.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Property Type</label>
                  <select value={propType} onChange={(e) => setPropType(e.target.value)} className="enq-select">
                    <option value="">Select property type</option>
                    {typesList.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Configuration (Optional)</label>
                  <select value={config} onChange={(e) => setConfig(e.target.value)} className="enq-select">
                    <option value="">Select configuration</option>
                    {configsList.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Possession Timeline</label>
                  <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className="enq-select">
                    <option value="">Select timeline</option>
                    {timelinesList.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Purpose of Purchase</label>
                <div className="radios-row">
                  <label className="radio-label-wrap">
                    <input 
                      type="radio" 
                      name="purpose" 
                      value="End Use" 
                      checked={purpose === 'End Use'} 
                      onChange={() => setPurpose('End Use')} 
                    />
                    <span className="radio-dot"></span>
                    End Use
                  </label>
                  <label className="radio-label-wrap">
                    <input 
                      type="radio" 
                      name="purpose" 
                      value="Investment" 
                      checked={purpose === 'Investment'} 
                      onChange={() => setPurpose('Investment')} 
                    />
                    <span className="radio-dot"></span>
                    Investment
                  </label>
                  <label className="radio-label-wrap">
                    <input 
                      type="radio" 
                      name="purpose" 
                      value="Both" 
                      checked={purpose === 'Both'} 
                      onChange={() => setPurpose('Both')} 
                    />
                    <span className="radio-dot"></span>
                    Both
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Tell us more about your requirement (Optional)</label>
                <textarea 
                  placeholder="e.g. preferred locality, amenities, size, any specific requirements..." 
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="enq-textarea"
                />
              </div>

              <div className="agree-checkbox-block">
                <label className="checkbox-label-wrap">
                  <input 
                    type="checkbox" 
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span className="checkbox-checkmark"></span>
                  I agree to the <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms & Conditions</Link>
                </label>
              </div>

              <div className="form-footer-actions">
                <button type="submit" className="btn btn-primary submit-enq-btn">
                  Submit Enquiry &nbsp;→
                </button>
                <div className="secure-badge">
                  <span className="secure-icon">🔒</span>
                  <span>Your details are 100% secure</span>
                </div>
              </div>
            </form>
          </div>

          {/* Right Sidebar */}
          <div className="enq-sidebar-card">
            
            {/* What happens next */}
            <div className="next-steps-widget">
              <h4>What happens next?</h4>
              <div className="steps-vertical-stack">
                <div className="step-row-node">
                  <span className="step-dot-icon">📩</span>
                  <div className="step-row-desc">
                    <h6>We receive your enquiry</h6>
                    <p>Our team receives your details and requirement.</p>
                  </div>
                </div>
                <div className="step-row-node">
                  <span className="step-dot-icon">🔬</span>
                  <div className="step-row-desc">
                    <h6>Expert review</h6>
                    <p>We analyse your needs and shortlist the best options for you.</p>
                  </div>
                </div>
                <div className="step-row-node">
                  <span className="step-dot-icon">📞</span>
                  <div className="step-row-desc">
                    <h6>Personalised consultation</h6>
                    <p>Our expert will connect with you for a detailed discussion.</p>
                  </div>
                </div>
                <div className="step-row-node">
                  <span className="step-dot-icon">🤝</span>
                  <div className="step-row-desc">
                    <h6>Best options shared</h6>
                    <p>We share the most suitable properties that match your criteria.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferred property card */}
            <div className="preferred-property-widget">
              <h4>Preferred Property <span className="sub-label">(Optional)</span></h4>
              <div className="sidebar-search-wrap">
                <input 
                  type="text" 
                  placeholder="Search by project name"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="sidebar-search-input"
                />
                <span className="search-lens">🔍</span>
              </div>

              <div className="sidebar-project-card">
                <img src="/images/aurus_building.jpg" alt="Aurus luxury project" className="sidebar-project-img" />
                <button className="heart-button">❤</button>
                <div className="sidebar-project-details">
                  <h5>Aurus</h5>
                  <span className="sidebar-project-loc">📍 Central Kolkata</span>
                  <p>3, 4 & 5 BHK Residences</p>
                  <span className="sidebar-project-price">₹3.21 Cr* onwards</span>
                  <Link href="/properties/aurus" className="sidebar-project-link">
                    View Details &nbsp;→
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Call direct section */}
      <section className="prefer-to-talk-section">
        <div className="container">
          <div className="talk-header">
            <h3>Prefer to talk?</h3>
            <p>Reach out to us directly and our experts will be happy to assist you.</p>
          </div>

          <div className="talk-methods-grid">
            <div className="talk-method-card">
              <span className="talk-icon">📞</span>
              <h6>Call Us</h6>
              <a href="tel:+913346039205">+91 33 4603 9205</a>
            </div>
            <div className="talk-method-card">
              <span className="talk-icon">✉</span>
              <h6>Email Us</h6>
              <a href="mailto:hello@arhamestate.com">hello@arhamestate.com</a>
            </div>
            <div className="talk-method-card">
              <span className="talk-icon">📍</span>
              <h6>Visit Us</h6>
              <p>4, Rani Lochan Mullick Street,<br />Kolkata – 700006, West Bengal</p>
            </div>
            <div className="talk-method-card">
              <span className="talk-icon">🕒</span>
              <h6>Business Hours</h6>
              <p>Mon – Sat: 10:00 AM – 6:30 PM<br />Sunday: By Appointment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription banner */}
      <section className="stay-updated-banner">
        <div className="container banner-grid-box">
          <div className="banner-text">
            <h4>Stay updated with the latest property insights.</h4>
            <p>Subscribe to our newsletter for market updates, investment tips and new property launches.</p>
          </div>
          <form onSubmit={handleSubscribe} className="banner-form">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required 
              className="banner-input" 
            />
            <button type="submit" className="btn btn-secondary-green banner-btn">
              Subscribe &nbsp;→
            </button>
          </form>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        /* Hero Section */
        .enq-hero-section {
          padding: 12rem 0 4rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .breadcrumbs-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
        }

        .bread-sep {
          color: var(--border-main);
        }

        .bread-curr {
          color: var(--text-main);
          font-weight: 600;
        }

        .enq-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 6rem;
          align-items: center;
          margin-bottom: 4rem;
        }

        @media (max-width: 991px) {
          .enq-hero-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .enq-hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.1;
          color: var(--text-main);
          margin-bottom: 1.5rem;
        }

        .text-highlight {
          color: var(--brand-green);
          font-family: var(--font-outfit), sans-serif;
          font-style: italic;
          font-weight: 600;
        }

        .enq-hero-desc {
          font-size: 1.15rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 580px;
        }

        .enq-hero-media {
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 16/10;
          border: 1px solid var(--border-main);
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .enq-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Badges grid */
        .enq-badges-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }

        @media (max-width: 768px) {
          .enq-badges-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .enq-badge-node {
          display: flex;
          gap: 1.25rem;
          align-items: center;
          padding: 1.5rem 2rem;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 16px;
        }

        .eb-icon {
          font-size: 1.75rem;
        }

        .eb-text h6 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1rem;
          color: var(--text-main);
          font-weight: 700;
          margin-bottom: 0.15rem;
        }

        .eb-text p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Main Form Section */
        .enq-form-section {
          padding: 6rem 0 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .enq-form-grid-layout {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 5rem;
        }

        @media (max-width: 991px) {
          .enq-form-grid-layout {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .enq-form-main-card {
          background: #ffffff;
          border: 1px solid var(--border-main);
          border-radius: 24px;
          padding: 3.5rem;
          box-shadow: 0 15px 45px rgba(0,0,0,0.03);
        }

        @media (max-width: 576px) {
          .enq-form-main-card {
            padding: 2rem;
          }
        }

        .enq-form-main-card h3 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.75rem;
          color: var(--text-main);
          margin-bottom: 2.5rem;
          font-weight: 700;
          border-bottom: 1px solid var(--border-main);
          padding-bottom: 1.5rem;
        }

        .enquiry-main-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        @media (max-width: 576px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .required {
          color: red;
        }

        .enq-input, .enq-select, .enq-textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 1px solid var(--border-main);
          background: var(--bg-main);
          border-radius: 8px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          color: var(--text-main);
          outline: none;
          transition: var(--transition-fast);
        }

        .enq-input:focus, .enq-select:focus, .enq-textarea:focus {
          border-color: var(--brand-green);
          background: #ffffff;
        }

        /* Looking selector grid */
        .looking-selector-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-top: 0.5rem;
        }

        @media (max-width: 1200px) {
          .looking-selector-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .looking-selector-grid {
            grid-template-columns: 1fr;
          }
        }

        .selector-item-card {
          padding: 1.5rem;
          background: var(--bg-main);
          border: 1px solid var(--border-main);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          position: relative;
          transition: var(--transition-fast);
        }

        .selector-item-card:hover {
          border-color: var(--brand-green);
        }

        .selector-item-card.selected {
          border-color: var(--brand-green);
          background: rgba(89, 165, 44, 0.05);
          box-shadow: 0 4px 15px rgba(89, 165, 44, 0.05);
        }

        .sel-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }

        .sel-name {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-main);
          line-height: 1.3;
        }

        .sel-tick {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--brand-green);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Radios row */
        .radios-row {
          display: flex;
          gap: 3rem;
          margin-top: 0.5rem;
        }

        .radio-label-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-main);
          font-weight: 500;
          cursor: pointer;
          position: relative;
        }

        .radio-label-wrap input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .radio-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid var(--border-main);
          background: var(--bg-main);
          display: inline-block;
          position: relative;
          transition: var(--transition-fast);
        }

        .radio-label-wrap input:checked ~ .radio-dot {
          border-color: var(--brand-green);
        }

        .radio-dot:after {
          content: "";
          position: absolute;
          display: none;
          top: 5px;
          left: 5px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--brand-green);
        }

        .radio-label-wrap input:checked ~ .radio-dot:after {
          display: block;
        }

        /* Checkbox agree */
        .agree-checkbox-block {
          margin-top: 1rem;
        }

        .checkbox-label-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.92rem;
          color: var(--text-muted);
          cursor: pointer;
          position: relative;
        }

        .checkbox-label-wrap input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkbox-checkmark {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid var(--border-main);
          background: var(--bg-main);
          display: inline-block;
          position: relative;
          transition: var(--transition-fast);
        }

        .checkbox-label-wrap input:checked ~ .checkbox-checkmark {
          background-color: var(--brand-green);
          border-color: var(--brand-green);
        }

        .checkbox-checkmark:after {
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

        .checkbox-label-wrap input:checked ~ .checkbox-checkmark:after {
          display: block;
        }

        .checkbox-label-wrap :global(a) {
          color: var(--brand-blue);
          text-decoration: underline;
        }

        .form-footer-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-main);
          padding-top: 2.5rem;
          margin-top: 1rem;
        }

        @media (max-width: 576px) {
          .form-footer-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 1.5rem;
          }
        }

        .submit-enq-btn {
          padding: 1.1rem 3.5rem;
        }

        .secure-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: var(--text-muted);
          font-weight: 550;
        }

        /* Right Sidebar */
        .enq-sidebar-card {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .next-steps-widget, .preferred-property-widget {
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          padding: 2.5rem;
        }

        .next-steps-widget h4, .preferred-property-widget h4 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.25rem;
          color: var(--text-main);
          margin-bottom: 2rem;
          font-weight: 700;
        }

        .preferred-property-widget h4 .sub-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .steps-vertical-stack {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .step-row-node {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .step-dot-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(89, 165, 44, 0.1);
          color: var(--brand-green);
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .step-row-desc h6 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.95rem;
          color: var(--text-main);
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .step-row-desc p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* Preferred property widget search */
        .sidebar-search-wrap {
          position: relative;
          width: 100%;
          margin-bottom: 2rem;
        }

        .sidebar-search-input {
          width: 100%;
          padding: 0.85rem 3rem 0.85rem 1.25rem;
          border: 1px solid var(--border-main);
          background: var(--bg-main);
          border-radius: 8px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.9rem;
          outline: none;
          color: var(--text-main);
        }

        .sidebar-search-input:focus {
          border-color: var(--brand-green);
        }

        .search-lens {
          position: absolute;
          right: 1.25rem;
          top: 0.85rem;
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        .sidebar-project-card {
          border: 1px solid var(--border-main);
          background: var(--bg-main);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }

        .sidebar-project-img {
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
        }

        .heart-button {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
          border: none;
          color: red;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .sidebar-project-details {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sidebar-project-details h5 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.15rem;
          color: var(--text-main);
          margin-bottom: 0.25rem;
          font-weight: 700;
        }

        .sidebar-project-loc {
          font-size: 0.75rem;
          color: var(--brand-blue);
          font-weight: 600;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .sidebar-project-details p {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }

        .sidebar-project-price {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--brand-green);
          margin-bottom: 1.25rem;
        }

        .sidebar-project-link {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .sidebar-project-link:hover {
          color: var(--brand-green);
          padding-left: 2px;
        }

        /* Prefer to talk section */
        .prefer-to-talk-section {
          padding: 8rem 0;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-main);
        }

        .talk-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .talk-header h3 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 2rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .talk-header p {
          font-size: 1.05rem;
          color: var(--text-muted);
        }

        .talk-methods-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }

        @media (max-width: 991px) {
          .talk-methods-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .talk-methods-grid {
            grid-template-columns: 1fr;
          }
        }

        .talk-method-card {
          padding: 2.5rem 2rem;
          border: 1px solid var(--border-main);
          background: var(--bg-main);
          border-radius: 20px;
          transition: var(--transition-smooth);
        }

        .talk-method-card:hover {
          transform: translateY(-4px);
          border-color: rgba(11, 170, 220, 0.25);
        }

        .talk-icon {
          font-size: 2rem;
          margin-bottom: 1.25rem;
          display: block;
        }

        .talk-method-card h6 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .talk-method-card a, .talk-method-card p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .talk-method-card a:hover {
          color: var(--brand-green);
        }

        /* Subscription banner */
        .stay-updated-banner {
          padding: 5rem 0;
          background: linear-gradient(135deg, #12191c, #090c0e);
          color: #ffffff;
        }

        .banner-grid-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 4rem;
        }

        @media (max-width: 991px) {
          .banner-grid-box {
            flex-direction: column;
            align-items: flex-start;
            gap: 2.5rem;
          }
        }

        .banner-text h4 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .banner-text p {
          font-size: 1rem;
          color: rgba(255,255,255,0.7);
          max-width: 600px;
        }

        .banner-form {
          display: flex;
          gap: 1rem;
          width: 100%;
          max-width: 450px;
          flex-shrink: 0;
        }

        @media (max-width: 576px) {
          .banner-form {
            flex-direction: column;
            max-width: 100%;
          }
        }

        .banner-input {
          flex: 1;
          padding: 0.9rem 1.5rem;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          border-radius: 50px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          color: #ffffff;
          outline: none;
        }

        .banner-input:focus {
          border-color: var(--brand-green);
          background: rgba(255,255,255,0.1);
        }

        .banner-btn {
          padding: 0.9rem 2.25rem;
          border-radius: 50px;
        }
      `}</style>
    </div>
  );
}
