'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lenis from 'lenis';
import gsap from 'gsap';
import { EnquiryModal } from '@/components/EnquiryForms';

const initialProperties = [
  {
    title: 'Aurus',
    developer: 'PS Group',
    zone: 'Central Kolkata',
    location: 'EM Bypass',
    price: '₹3.21 Cr* onwards',
    specs: '3, 4 & 5 BHK',
    size: '1,890 - 4,200 sq.ft.',
    badge: 'READY TO MOVE',
    matchBadge: 'BEST MATCH',
    image: '/images/aurus_building.jpg',
  },
  {
    title: 'Jiva',
    developer: 'PS Group',
    zone: 'Alipore',
    location: 'South Kolkata',
    price: '₹6.50 Cr* onwards',
    specs: '4 & 5 BHK',
    size: '3,200 - 4,100 sq.ft.',
    badge: 'NEW LAUNCH',
    matchBadge: '98% MATCH',
    image: '/images/jiva_building.jpg',
  },
  {
    title: 'Panache',
    developer: 'PS Group',
    zone: 'New Town',
    location: 'East Kolkata',
    price: '₹1.85 Cr* onwards',
    specs: '2, 3 & 4 BHK',
    size: '1,100 - 2,800 sq.ft.',
    badge: 'UNDER CONSTRUCTION',
    matchBadge: '92% MATCH',
    image: '/images/panache_building.jpg',
  },
  {
    title: 'The 102',
    developer: 'PS Group',
    zone: 'Rajarhat',
    location: 'North Kolkata',
    price: '₹1.85 Cr* onwards',
    specs: '2 & 3 BHK',
    size: '1,000 - 3,200 sq.ft.',
    badge: 'UNDER CONSTRUCTION',
    matchBadge: '88% MATCH',
    image: '/images/the_102_building.jpg',
  },
];

const amenitiesList = [
  'Swimming Pool', 'Gymnasium', 'Clubhouse', 'Landscaped Gardens',
  'Kids\' Play Area', '24x7 Security', 'Mini Theatre', 'Banquet Hall',
  'Sports Courts', 'Yoga Deck', 'Jogging Track'
];

export default function PropertyFinder() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  // Filter States
  const [location, setLocation] = useState('Any Location');
  const [budget, setBudget] = useState('Any Budget');
  const [propType, setPropType] = useState('All Types');
  const [config, setConfig] = useState('Any');
  const [purpose, setPurpose] = useState('Any');
  
  // Preferences
  const [reraOnly, setReraOnly] = useState(true);
  const [readyMove, setReadyMove] = useState(false);
  const [underConst, setUnderConst] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['Swimming Pool', 'Clubhouse', 'Landscaped Gardens']);

  const [matches, setMatches] = useState(initialProperties);
  const [hasSearched, setHasSearched] = useState(false);

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

    // Entrance timeline
    const tl = gsap.timeline();
    tl.from('.pf-hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });

    tl.from('.pf-badge-node', {
      scale: 0.95,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.5)'
    }, '-=0.4');

    // Steps scroll trigger
    gsap.from('.step-bubble-node', {
      scrollTrigger: {
        trigger: '.how-it-works-section',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out'
    });

    // Board entrance
    gsap.from('.finder-board-box', {
      scrollTrigger: {
        trigger: '.finder-board-section',
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleAmenityClick = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSearch = () => {
    setHasSearched(true);
    let results = initialProperties;

    // Filter locations
    if (location !== 'Any Location') {
      results = results.filter(p => p.zone.includes(location) || p.location.includes(location));
    }

    // Filter status
    if (readyMove) {
      results = results.filter(p => p.badge === 'READY TO MOVE');
    }
    if (underConst) {
      results = results.filter(p => p.badge === 'UNDER CONSTRUCTION');
    }

    setMatches(results);

    // Scroll to matches section
    const target = document.getElementById('matched-results');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearAll = () => {
    setLocation('Any Location');
    setBudget('Any Budget');
    setPropType('All Types');
    setConfig('Any');
    setPurpose('Any');
    setReraOnly(true);
    setReadyMove(false);
    setUnderConst(false);
    setSelectedAmenities([]);
    setMatches(initialProperties);
    setHasSearched(false);
  };

  return (
    <div className="main-layout-wrapper">
      <Header />

      {/* Hero Section */}
      <section className="finder-hero-section">
        <img src="/images/luxury_living_room.jpg" alt="Luxury Penthouse Living Room" className="finder-hero-bg" />
        <div className="finder-hero-overlay"></div>
        <div className="container pf-hero-box">
          <div className="pf-hero-content">
            <span className="section-label text-green">Property Finder</span>
            <h1 className="pf-hero-title">
              Find the right <br />
              property, <span className="text-highlight">effortlessly.</span>
            </h1>
            <p className="pf-hero-desc">
              Tell us what you're looking for and our experts will shortlist the best properties that match your needs.
            </p>
          </div>

          <div className="pf-badges-row">
            <div className="pf-badge-node">
              <span className="badge-icon">🔍</span>
              <div className="badge-text">
                <h6>Expert curated matches</h6>
                <p>Save time with smart shortlisting.</p>
              </div>
            </div>
            <div className="pf-badge-node">
              <span className="badge-icon">👥</span>
              <div className="badge-text">
                <h6>Personalised advice</h6>
                <p>Recommendations from real experts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works-section">
        <div className="container">
          <span className="section-label center">How It Works</span>
          <div className="timeline-horizontal-divider"></div>
          <div className="steps-container-grid">
            <div className="step-bubble-node">
              <div className="step-num">01</div>
              <h5>Tell us your requirements</h5>
            </div>
            <div className="step-bubble-node">
              <div className="step-num">02</div>
              <h5>We research & analyze</h5>
            </div>
            <div className="step-bubble-node">
              <div className="step-num">03</div>
              <h5>We shortlist the best options</h5>
            </div>
            <div className="step-bubble-node">
              <div className="step-num">04</div>
              <h5>Our experts connect</h5>
            </div>
            <div className="step-bubble-node">
              <div className="step-num">05</div>
              <h5>You choose. We guide.</h5>
            </div>
          </div>
        </div>
      </section>

      {/* Finder Board Section */}
      <section className="finder-board-section">
        <div className="container">
          <div className="finder-board-box">
            
            <div className="board-header">
              <h3>Let's find your perfect property</h3>
              <button className="clear-all-btn" onClick={handleClearAll}>
                Clear All ↺
              </button>
            </div>

            <div className="board-dropdowns-grid">
              <div className="board-input-group">
                <label>Location</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="Any Location">Any Location</option>
                  <option value="Central Kolkata">Central Kolkata (EM Bypass)</option>
                  <option value="Alipore">Alipore (South Kolkata)</option>
                  <option value="New Town">New Town (East Kolkata)</option>
                  <option value="Rajarhat">Rajarhat (North Kolkata)</option>
                </select>
              </div>

              <div className="board-input-group">
                <label>Budget</label>
                <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                  <option value="Any Budget">Any Budget</option>
                  <option value="1">₹1.5 Cr - ₹3 Cr</option>
                  <option value="2">₹3 Cr - ₹5 Cr</option>
                  <option value="3">₹5 Cr+ onwards</option>
                </select>
              </div>

              <div className="board-input-group">
                <label>Property Type</label>
                <select value={propType} onChange={(e) => setPropType(e.target.value)}>
                  <option value="All Types">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Boutique">Boutique Residencies</option>
                  <option value="Venture">Venture Funds</option>
                </select>
              </div>

              <div className="board-input-group">
                <label>Configuration</label>
                <select value={config} onChange={(e) => setConfig(e.target.value)}>
                  <option value="Any">Any</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5 BHK</option>
                </select>
              </div>

              <div className="board-input-group">
                <label>Purpose</label>
                <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                  <option value="Any">Any</option>
                  <option value="End Use">End Use</option>
                  <option value="Investment">Investment</option>
                </select>
              </div>
            </div>

            {/* Additional checkbox preferences */}
            <div className="preferences-row">
              <label className="checkbox-wrap">
                <input 
                  type="checkbox" 
                  checked={reraOnly} 
                  onChange={(e) => setReraOnly(e.target.checked)} 
                />
                <span className="checkbox-box"></span>
                RERA Registered Projects Only
              </label>
              <label className="checkbox-wrap">
                <input 
                  type="checkbox" 
                  checked={readyMove} 
                  onChange={(e) => setReadyMove(e.target.checked)} 
                />
                <span className="checkbox-box"></span>
                Ready to Move
              </label>
              <label className="checkbox-wrap">
                <input 
                  type="checkbox" 
                  checked={underConst} 
                  onChange={(e) => setUnderConst(e.target.checked)} 
                />
                <span className="checkbox-box"></span>
                Under Construction
              </label>
            </div>

            {/* Amenities Tag selector */}
            <div className="amenities-tags-wrapper">
              <span className="amenities-title">Amenities you prefer:</span>
              <div className="tags-container">
                {amenitiesList.map((tag) => (
                  <button
                    key={tag}
                    className={`amenity-tag ${selectedAmenities.includes(tag) ? 'selected' : ''}`}
                    onClick={() => handleAmenityClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="board-actions">
              <button className="btn btn-primary btn-matches" onClick={handleSearch}>
                Find My Matches &nbsp;→
              </button>
              <button className="btn btn-outline" onClick={() => alert('Search preferences saved! We will notify you when matching inventory is launched.')}>
                Save My Search
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Matched results */}
      <section id="matched-results" className="matched-results-section">
        <div className="container">
          <div className="results-header-row">
            <div className="results-title-left">
              <span className="section-label">Matched Properties</span>
              <h2>Properties that match your preferences</h2>
            </div>
            <div className="results-view-all">
              <Link href="/properties" className="view-all-link">
                View All Properties &nbsp;→
              </Link>
            </div>
          </div>

          <div className="results-grid">
            {matches.map((item) => (
              <div key={item.title} className="result-card">
                <div className="result-card-image-wrap">
                  <img src={item.image} alt={item.title} className="result-card-image" />
                  <span className="badge-match">{item.matchBadge}</span>
                  <span className="badge-status">{item.badge}</span>
                </div>
                <div className="result-card-details">
                  <div className="result-card-header">
                    <h4>{item.title}</h4>
                    <span className="result-card-loc">{item.zone}</span>
                  </div>
                  <div className="result-card-specs">
                    <span>{item.specs}</span>
                    <span className="sep">|</span>
                    <span>{item.size}</span>
                  </div>
                  <div className="result-card-price-row">
                    <span className="result-price">{item.price}</span>
                  </div>
                  <div className="result-card-actions">
                    <Link href={`/properties/${item.title.toLowerCase().replace(/ /g, '-')}`} className="btn-view-details">
                      View Details &nbsp;→
                    </Link>
                    <button className="btn-enquire-bubble" onClick={() => setSelectedProperty(item.title)}>
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {matches.length === 0 && (
              <div className="no-matches-found">
                <p>No direct matches found. Expand your search parameters or share your requirement for off-market options.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Expert guidance callout */}
      <section className="expert-guidance-callout-section">
        <div className="container">
          <div className="expert-guidance-box">
            <div className="expert-guidance-content">
              <h3>Need expert guidance?</h3>
              <p>Share your requirements and our senior advisors will compile a personalized real estate report for you.</p>
            </div>
            <div className="expert-guidance-buttons">
              <Link href="/enquire" className="btn btn-secondary-green">
                Share My Requirement &nbsp;→
              </Link>
              <a href="tel:+913346039205" className="btn btn-outline-white">
                📞 +91 33 4603 9205
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest / Client value grid */}
      <section className="pf-value-section">
        <div className="container">
          <div className="pf-value-header">
            <span className="section-label">Why Arham Estate</span>
            <h2>More than just a property search</h2>
          </div>

          <div className="pf-value-grid">
            <div className="pf-value-card">
              <div className="value-icon">⚖</div>
              <h5>100% Unbiased</h5>
              <p>Independent real estate advice focused solely on your best interest and financial return.</p>
            </div>
            <div className="pf-value-card">
              <div className="value-icon">🗝</div>
              <h5>Deep Market Access</h5>
              <p>Early access to developer pre-launches, booking discounts, and off-market premium assets.</p>
            </div>
            <div className="pf-value-card">
              <div className="value-icon">👨‍💼</div>
              <h5>Expert Advisors</h5>
              <p>Professional guidance from certified senior advisors who understand local codes and trends.</p>
            </div>
            <div className="pf-value-card">
              <div className="value-icon">🛠</div>
              <h5>End-to-End Support</h5>
              <p>Complete management of legal due diligence, home loan documentation, and registration filings.</p>
            </div>
            <div className="pf-value-card">
              <div className="value-icon">💎</div>
              <h5>Best Value</h5>
              <p>Strong negotiation power and transparent developer price validations to ensure you pay the right rate.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Enquiry Modal */}
      <EnquiryModal 
        projectName={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      <style jsx>{`
        /* Hero Section */
        .finder-hero-section {
          position: relative;
          padding: 14rem 0 8rem 0;
          overflow: hidden;
          background: #090b0e;
        }

        .finder-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          opacity: 0.35;
        }

        .finder-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(9, 11, 14, 0.95) 40%, rgba(9, 11, 14, 0.5) 100%);
          z-index: 2;
        }

        .pf-hero-box {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 991px) {
          .pf-hero-box {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .text-green {
          color: var(--brand-green) !important;
        }

        .pf-hero-title {
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

        .pf-hero-desc {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.6;
          max-width: 580px;
        }

        .pf-badges-row {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .pf-badge-node {
          display: flex;
          gap: 1.25rem;
          align-items: center;
          padding: 1.25rem 1.75rem;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 16px;
          backdrop-filter: blur(12px);
        }

        .badge-icon {
          font-size: 2rem;
        }

        .badge-text h6 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.15rem;
          color: #ffffff;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .badge-text p {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.85);
        }

        /* How it works */
        .how-it-works-section {
          padding: 6rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
          position: relative;
        }

        .center {
          text-align: center;
          margin-bottom: 4rem;
        }

        .timeline-horizontal-divider {
          position: absolute;
          top: 142px;
          left: 10%;
          right: 10%;
          height: 1px;
          background: var(--border-main);
          z-index: 1;
        }

        @media (max-width: 991px) {
          .timeline-horizontal-divider {
            display: none;
          }
        }

        .steps-container-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 991px) {
          .steps-container-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .step-bubble-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        @media (max-width: 991px) {
          .step-bubble-node {
            flex-direction: row;
            text-align: left;
            gap: 1.5rem;
          }
        }

        .step-num {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          color: var(--brand-green);
          font-family: var(--font-outfit), sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.01);
          flex-shrink: 0;
        }

        .step-bubble-node h5 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1rem;
          color: var(--text-main);
          font-weight: 600;
        }

        /* Finder Board Box */
        .finder-board-section {
          padding: 4rem 0 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
          position: relative;
          z-index: 5;
          margin-top: -60px;
        }

        .finder-board-box {
          background: #ffffff;
          border: 1px solid var(--border-main);
          border-radius: 24px;
          padding: 3.5rem;
          box-shadow: 0 15px 45px rgba(0,0,0,0.05);
        }

        @media (max-width: 576px) {
          .finder-board-box {
            padding: 2rem;
          }
        }

        .board-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-main);
          padding-bottom: 1.5rem;
        }

        .board-header h3 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.5rem;
          color: var(--text-main);
          font-weight: 700;
        }

        .clear-all-btn {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--brand-blue);
          background: none;
          border: none;
          cursor: pointer;
        }

        .board-dropdowns-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 991px) {
          .board-dropdowns-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .board-dropdowns-grid {
            grid-template-columns: 1fr;
          }
        }

        .board-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .board-input-group label {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--brand-green);
          letter-spacing: 0.05em;
        }

        .board-input-group select {
          padding: 0.9rem 1.25rem;
          border: 1px solid var(--border-main);
          background: var(--bg-main);
          border-radius: 8px;
          outline: none;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          color: var(--text-main);
          cursor: pointer;
        }

        /* Preferences Row Checkboxes */
        .preferences-row {
          display: flex;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .checkbox-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-main);
          font-weight: 500;
          cursor: pointer;
          position: relative;
        }

        .checkbox-wrap input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkbox-box {
          width: 20px;
          height: 20px;
          border: 1px solid var(--border-main);
          border-radius: 4px;
          background: var(--bg-main);
          display: inline-block;
          position: relative;
          transition: var(--transition-fast);
        }

        .checkbox-wrap input:checked ~ .checkbox-box {
          background-color: var(--brand-green);
          border-color: var(--brand-green);
        }

        .checkbox-box:after {
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

        .checkbox-wrap input:checked ~ .checkbox-box:after {
          display: block;
        }

        /* Amenities tag selectors */
        .amenities-tags-wrapper {
          margin-bottom: 3.5rem;
        }

        .amenities-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-main);
          display: block;
          margin-bottom: 1.25rem;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .amenity-tag {
          padding: 0.65rem 1.25rem;
          border-radius: 50px;
          border: 1px solid var(--border-main);
          background: var(--bg-main);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .amenity-tag:hover {
          border-color: var(--brand-green);
          color: var(--brand-green);
        }

        .amenity-tag.selected {
          background-color: rgba(89, 165, 44, 0.08);
          border-color: var(--brand-green);
          color: var(--brand-green);
          font-weight: 600;
        }

        /* Actions */
        .board-actions {
          display: flex;
          gap: 1.5rem;
        }

        @media (max-width: 576px) {
          .board-actions {
            flex-direction: column;
          }
        }

        .btn-matches {
          padding: 1.1rem 3rem;
        }

        .btn-outline {
          padding: 1.1rem 2.5rem;
          border: 1px solid var(--border-main);
          background: transparent;
          color: var(--text-main);
          font-family: var(--font-outfit), sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 50px;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .btn-outline:hover {
          background: var(--bg-main);
        }

        /* Results List Section */
        .matched-results-section {
          padding: 6rem 0 8rem 0;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-main);
        }

        .results-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
        }

        .results-title-left h2 {
          font-size: clamp(1.85rem, 3.5vw, 2.75rem);
          color: var(--text-main);
          line-height: 1.2;
        }

        .view-all-link {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--brand-green);
          transition: var(--transition-fast);
        }

        .view-all-link:hover {
          padding-left: 4px;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1200px) {
          .results-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .results-grid {
            grid-template-columns: 1fr;
          }
        }

        .result-card {
          background-color: var(--bg-main);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: var(--transition-smooth);
        }

        .result-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.03);
          border-color: rgba(89, 165, 44, 0.25);
        }

        .result-card-image-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .result-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .result-card:hover .result-card-image {
          transform: scale(1.04);
        }

        .badge-match {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #0f172a;
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.8rem;
          border-radius: 4px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        .badge-status {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--brand-green);
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.8rem;
          border-radius: 4px;
        }

        .result-card-details {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .result-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .result-card-header h4 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.2rem;
          color: var(--text-main);
          font-weight: 700;
        }

        .result-card-loc {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--brand-blue);
          text-transform: uppercase;
          margin-top: 0.2rem;
          letter-spacing: 0.05em;
        }

        .result-card-specs {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .result-card-specs .sep {
          margin: 0 0.5rem;
          color: var(--border-main);
        }

        .result-card-price-row {
          margin-bottom: 2rem;
        }

        .result-price {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--brand-green);
        }

        .result-card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .btn-view-details {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
          transition: var(--transition-fast);
        }

        .btn-view-details:hover {
          color: var(--brand-green);
          padding-left: 4px;
        }

        .btn-enquire-bubble {
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          border: 1px solid var(--brand-green);
          background: rgba(89, 165, 44, 0.05);
          color: var(--brand-green);
          font-family: var(--font-outfit), sans-serif;
          font-weight: 600;
          font-size: 0.82rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .btn-enquire-bubble:hover {
          background-color: var(--brand-green);
          color: #ffffff;
        }

        .no-matches-found {
          grid-column: 1 / -1;
          text-align: center;
          padding: 5rem 2rem;
          border: 1px dashed var(--border-main);
          border-radius: 20px;
          color: var(--text-muted);
        }

        /* Expert Advice callout */
        .expert-guidance-callout-section {
          padding: 6rem 0;
          background: linear-gradient(135deg, #12191c, #090c0e);
          color: #ffffff;
        }

        .expert-guidance-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 4rem;
        }

        @media (max-width: 991px) {
          .expert-guidance-box {
            flex-direction: column;
            align-items: flex-start;
            gap: 2.5rem;
          }
        }

        .expert-guidance-content h3 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 2rem;
          margin-bottom: 0.75rem;
          font-weight: 700;
        }

        .expert-guidance-content p {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.7);
          max-width: 600px;
          line-height: 1.5;
        }

        .expert-guidance-buttons {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          flex-shrink: 0;
        }

        @media (max-width: 576px) {
          .expert-guidance-buttons {
            flex-direction: column;
            width: 100%;
            align-items: stretch;
          }
        }

        .btn-secondary-green {
          padding: 1rem 2.5rem;
          border-radius: 50px;
          background: var(--brand-green);
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-weight: 600;
          display: inline-block;
          font-size: 0.95rem;
        }

        .btn-secondary-green:hover {
          background-color: #4a9122;
        }

        .btn-outline-white {
          padding: 1rem 2.25rem;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.3);
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-weight: 600;
          background: transparent;
          font-size: 0.95rem;
          display: inline-block;
          text-align: center;
        }

        .btn-outline-white:hover {
          background: rgba(255,255,255,0.05);
          border-color: #ffffff;
        }

        /* Why Arham Estate values */
        .pf-value-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .pf-value-header {
          text-align: center;
          margin-bottom: 6rem;
        }

        .pf-value-header h2 {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--text-main);
        }

        .pf-value-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1200px) {
          .pf-value-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .pf-value-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .pf-value-card {
          padding: 2.5rem 2rem;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          text-align: center;
          transition: var(--transition-smooth);
        }

        .pf-value-card:hover {
          transform: translateY(-5px);
          border-color: rgba(11, 170, 220, 0.3);
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .value-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .pf-value-card h5 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.15rem;
          color: var(--text-main);
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .pf-value-card p {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
