'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EnquiryModal } from '@/components/EnquiryForms';

gsap.registerPlugin(ScrollTrigger);

const propertiesData = [
  {
    id: 'aurus',
    slug: 'aurus',
    title: 'Aurus',
    developer: 'PS Group',
    zone: 'Central Kolkata',
    location: 'EM Bypass',
    price: '₹3.21 Cr* onwards',
    specs: '3, 4 & 5 BHK',
    size: '1,890 - 4,200 sq.ft.',
    desc: 'Luxury residences with timeless design and world-class amenities.',
    badge: 'READY TO MOVE',
    image: '/images/aurus_building.jpg',
  },
  {
    id: 'jiva',
    slug: 'jiva',
    title: 'Jiva',
    developer: 'PS Group',
    zone: 'Alipore',
    location: 'South Kolkata',
    price: '₹6.50 Cr* onwards',
    specs: '4 & 5 BHK',
    size: '3,200 - 4,100 sq.ft.',
    desc: 'Boutique living with privacy, greenery and refined comfort.',
    badge: 'NEW LAUNCH',
    image: '/images/jiva_building.jpg',
  },
  {
    id: 'panache',
    slug: 'panache',
    title: 'Panache',
    developer: 'PS Group',
    zone: 'New Town',
    location: 'East Kolkata',
    price: '₹1.85 Cr* onwards',
    specs: '2, 3 & 4 BHK',
    size: '1,100 - 2,800 sq.ft.',
    desc: 'Contemporary homes in the heart of Kolkata\'s growth corridor.',
    badge: 'UNDER CONSTRUCTION',
    image: '/images/panache_building.jpg',
  },
  {
    id: 'the-102',
    slug: 'the-102',
    title: 'The 102',
    developer: 'PS Group',
    zone: 'Rajarhat',
    location: 'North Kolkata',
    price: '₹1.85 Cr* onwards',
    specs: '2 & 3 BHK',
    size: '1,000 - 3,200 sq.ft.',
    desc: 'Iconic address for elevated living and investment.',
    badge: 'UNDER CONSTRUCTION',
    image: '/images/the_102_building.jpg',
  },
];

export default function PropertiesPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  // Filters State
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterBudget, setFilterBudget] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);

  useEffect(() => {
    // Initial animations
    gsap.from('.prop-hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    gsap.from('.prop-hero-image-wrap', {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Filter bar entrance
    gsap.from('.filter-bar-wrapper', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'power3.out',
    });

    // Property cards reveal
    gsap.from('.prop-grid-card', {
      scrollTrigger: {
        trigger: '.properties-list-section',
        start: 'top 85%',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // Explore categories scroll reveal
    gsap.from('.cat-block-node', {
      scrollTrigger: {
        trigger: '.categories-section',
        start: 'top 80%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // Market highlights scroll reveal
    gsap.from('.market-col-card', {
      scrollTrigger: {
        trigger: '.market-section',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSearch = () => {
    let result = propertiesData;

    // Filter logic
    if (filterLocation !== 'All') {
      result = result.filter(p => p.zone === filterLocation);
    }
    if (filterStatus !== 'All') {
      result = result.filter(p => p.badge === filterStatus);
    }
    // Type and budget filtering are placeholders in static mockup but can be hooked up if needed
    setFilteredProperties(result);
  };

  const openEnquiry = (title: string) => {
    setSelectedProperty(title);
  };

  return (
    <div ref={scrollContainerRef}>
      {/* Hero Section */}
      <section className="properties-hero-section">
        <div className="container hero-grid">
          <div className="prop-hero-content">
            <span className="section-label">Properties</span>
            <h1 className="prop-hero-title">
              Curated properties. <br />
              <span className="text-highlight">Extraordinary opportunities.</span>
            </h1>
            <p className="prop-hero-desc">
              Explore our handpicked residential and commercial properties in Kolkata's most desirable locations.
            </p>
            <div className="hero-buttons">
              <a href="#properties-list" className="btn btn-primary">Use Property Finder</a>
              <Link href="/#contact" className="btn btn-secondary-white">Schedule Consultation</Link>
            </div>
          </div>
          <div className="prop-hero-image-wrap">
            <img src="/images/howrah_bridge_sunset.jpg" alt="Howrah Bridge Kolkata" className="prop-hero-image" />
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div id="properties-list" className="filter-bar-wrapper">
        <div className="container filter-container">
          <div className="filter-group">
            <span className="filter-label">Location</span>
            <select className="filter-select" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
              <option value="All">All Locations</option>
              <option value="Central Kolkata">Central Kolkata</option>
              <option value="Alipore">Alipore</option>
              <option value="New Town">New Town</option>
              <option value="Rajarhat">Rajarhat</option>
            </select>
          </div>
          <div className="filter-group">
            <span className="filter-label">Property Type</span>
            <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Boutique">Boutique Residencies</option>
              <option value="Commercial">Commercial Spaces</option>
            </select>
          </div>
          <div className="filter-group">
            <span className="filter-label">Budget</span>
            <select className="filter-select" value={filterBudget} onChange={(e) => setFilterBudget(e.target.value)}>
              <option value="All">Any Budget</option>
              <option value="1">₹1 Cr - ₹3 Cr</option>
              <option value="2">₹3 Cr - ₹5 Cr</option>
              <option value="3">₹5 Cr+ onwards</option>
            </select>
          </div>
          <div className="filter-group">
            <span className="filter-label">Status</span>
            <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="READY TO MOVE">Ready to Move</option>
              <option value="NEW LAUNCH">New Launch</option>
              <option value="UNDER CONSTRUCTION">Under Construction</option>
            </select>
          </div>
          <button className="filter-search-btn" onClick={handleSearch}>
            Search Properties &nbsp;🔍
          </button>
        </div>
      </div>

      {/* Featured Properties list */}
      <section className="properties-list-section">
        <div className="container">
          <div className="list-section-header">
            <div className="header-left">
              <span className="section-label">Featured Properties</span>
              <h2 className="list-section-title">Our handpicked selection</h2>
            </div>
            <div className="header-right">
              <Link href="/properties" className="view-all-link">
                View All Properties &nbsp;→
              </Link>
            </div>
          </div>

          <div className="properties-grid-list">
            {filteredProperties.map((project) => (
              <div key={project.id} className="prop-grid-card">
                <div className="card-image-wrap">
                  <img src={project.image} alt={project.title} className="card-image" />
                  <span className="card-badge">{project.badge}</span>
                  <button className="favorite-btn" aria-label="Add to favorites">❤</button>
                </div>
                <div className="card-details">
                  <div className="card-info-header">
                    <h3 className="card-property-title">{project.title}</h3>
                    <span className="card-property-zone">{project.zone}</span>
                  </div>
                  <p className="card-property-desc">{project.desc}</p>
                  
                  <div className="card-specs-row">
                    <span className="spec-item">{project.specs}</span>
                    <span className="spec-divider">|</span>
                    <span className="spec-item">{project.size}</span>
                  </div>
                  
                  <div className="card-price-row">
                    <span className="price-tag">{project.price}</span>
                  </div>

                  <div className="card-buttons-actions">
                    <Link href={`/properties/${project.slug}`} className="btn-view-details">
                      View Details &nbsp;→
                    </Link>
                    <button className="btn-enquiry-direct" onClick={() => openEnquiry(project.title)}>
                      ❤
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredProperties.length === 0 && (
              <div className="no-properties-found">
                <p>No properties match your filter selection. Try adjusting your location or status criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Explore by Category & Expert Block */}
      <section className="categories-section">
        <div className="container categories-grid">
          
          {/* Left Category Selection */}
          <div className="categories-left">
            <span className="section-label">Explore by Category</span>
            <h2 className="categories-left-title">Find the right space for you</h2>
            
            <div className="categories-blocks-stack">
              <div className="cat-block-node">
                <span className="cat-icon">🏢</span>
                <span className="cat-name">Residential Properties</span>
              </div>
              <div className="cat-block-node">
                <span className="cat-icon">🏬</span>
                <span className="cat-name">Commercial Properties</span>
              </div>
              <div className="cat-block-node">
                <span className="cat-icon">💎</span>
                <span className="cat-name">Luxury Homes</span>
              </div>
              <div className="cat-block-node">
                <span className="cat-icon">🔑</span>
                <span className="cat-name">Ready to Move In</span>
              </div>
              <div className="cat-block-node">
                <span className="cat-icon">🏗️</span>
                <span className="cat-name">Under Construction</span>
              </div>
              <div className="cat-block-node">
                <span className="cat-icon">🚀</span>
                <span className="cat-name">New Launches</span>
              </div>
            </div>
          </div>

          {/* Right Expert Query Block */}
          <div className="expert-query-card">
            <img src="/images/luxury_living_room.jpg" alt="Luxury Living Room" className="expert-card-bg" />
            <div className="expert-card-overlay"></div>
            <div className="expert-card-content">
              <span className="expert-label">Not sure what you're looking for?</span>
              <h3 className="expert-title">
                Let our experts <br />
                <span className="expert-highlight">find it</span> for you.
              </h3>
              <p className="expert-desc">
                Share your preferences and our senior real estate advisory team will curate the best-fitting options for you.
              </p>
              <button onClick={() => openEnquiry('General Portfolio Assistance')} className="btn btn-secondary-green">
                Share Your Requirement &nbsp;→
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Why Invest in Kolkata Section */}
      <section className="market-section">
        <div className="container">
          <div className="market-header">
            <span className="section-label">Why Invest in Kolkata</span>
            <h2 className="market-title">Enduring value. Promising future.</h2>
          </div>

          <div className="market-grid">
            <div className="market-col-card">
              <div className="market-icon">📈</div>
              <h4>Strong Economic Fundamentals</h4>
              <p>A steadily growing economy with timeless infrastructure, metro connections, and active job creation.</p>
            </div>
            <div className="market-col-card">
              <div className="market-icon">🎁</div>
              <h4>Affordable Luxury Market</h4>
              <p>Premium living spaces at highly competitive prices compared to Mumbai, Delhi, or Bangalore.</p>
            </div>
            <div className="market-col-card">
              <div className="market-icon">🔑</div>
              <h4>High Rental Demand</h4>
              <p>Consistent rental yields and premium leasing requests driven by corporate expansions and professionals.</p>
            </div>
            <div className="market-col-card">
              <div className="market-icon">🌉</div>
              <h4>Emerging Growth Corridors</h4>
              <p>Rapidly developing premium hubs like New Town, Rajarhat, and EM Bypass with excellent connectivity.</p>
            </div>
            <div className="market-col-card">
              <div className="market-icon">📷</div>
              <h4>Cultural & Heritage Capital</h4>
              <p>A beautiful city that perfectly blends colonial tradition, premium modern lifestyle, and massive opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Victoria Memorial CTA Banner */}
      <section className="cta-banner-section">
        <div className="cta-backdrop-wrap">
          <img src="/images/victoria_memorial.jpg" alt="Victoria Memorial Kolkata" className="cta-backdrop" />
          <div className="cta-overlay-screen"></div>
        </div>
        <div className="container cta-content-box">
          <h2 className="cta-title">Your next move deserves expert guidance.</h2>
          <p className="cta-desc">Let's build a premium real estate portfolio that grows with you across generations.</p>
          <button onClick={() => openEnquiry('Consultation')} className="btn btn-secondary cta-btn">
            Schedule a Consultation &nbsp;→
          </button>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal 
        projectName={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      <style jsx>{`
        /* Hero Section */
        .properties-hero-section {
          padding: 12rem 0 7rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 6rem;
          align-items: center;
        }

        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .prop-hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .prop-hero-title {
          font-size: clamp(2.5rem, 5vw, 4.25rem);
          line-height: 1.1;
          color: var(--text-main);
          margin-bottom: 1.5rem;
        }

        .text-highlight {
          color: var(--brand-green);
          font-family: var(--font-outfit), sans-serif;
          font-weight: 600;
          font-style: italic;
        }

        .prop-hero-desc {
          font-size: 1.15rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 580px;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
        }

        @media (max-width: 576px) {
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }
        }

        .btn-secondary-white {
          padding: 0.9rem 2.25rem;
          background: #ffffff;
          border: 1px solid var(--text-main);
          border-radius: 50px;
          color: var(--text-main);
          font-family: var(--font-outfit), sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: var(--transition-fast);
          display: inline-block;
          text-align: center;
        }

        .btn-secondary-white:hover {
          background: var(--bg-main);
        }

        .prop-hero-image-wrap {
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--border-main);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.03);
          aspect-ratio: 4/3;
        }

        .prop-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Filter Bar */
        .filter-bar-wrapper {
          position: relative;
          z-index: 10;
          margin-top: -30px;
          margin-bottom: 5rem;
        }

        .filter-container {
          background: #ffffff;
          border: 1px solid var(--border-main);
          box-shadow: 0 15px 40px rgba(0,0,0,0.06);
          border-radius: 50px;
          padding: 0.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        @media (max-width: 991px) {
          .filter-container {
            flex-direction: column;
            border-radius: 24px;
            padding: 2rem;
            align-items: stretch;
            gap: 1.25rem;
          }
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .filter-label {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--brand-green);
          text-transform: uppercase;
          margin-bottom: 0.25rem;
          letter-spacing: 0.05em;
        }

        .filter-select {
          border: none;
          background: transparent;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-main);
          outline: none;
          cursor: pointer;
          width: 100%;
        }

        .filter-search-btn {
          padding: 1rem 2rem;
          background: #0f172a;
          color: #ffffff;
          border: none;
          border-radius: 50px;
          font-family: var(--font-outfit), sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: var(--transition-fast);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .filter-search-btn:hover {
          background: var(--brand-green);
        }

        /* Properties List Grid */
        .properties-list-section {
          padding: 3rem 0 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .list-section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
        }

        .list-section-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--text-main);
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

        .properties-grid-list {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1200px) {
          .properties-grid-list {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .properties-grid-list {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .prop-grid-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          transition: var(--transition-smooth);
        }

        .prop-grid-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(0,0,0,0.04);
          border-color: rgba(89, 165, 44, 0.25);
        }

        .card-image-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .prop-grid-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--brand-green);
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.8rem;
          border-radius: 4px;
        }

        .favorite-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(4px);
          border: none;
          color: var(--text-muted);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .favorite-btn:hover {
          background: #ffffff;
          color: red;
        }

        .card-details {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-info-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
          gap: 1rem;
        }

        .card-property-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.25rem;
          color: var(--text-main);
          font-weight: 700;
        }

        .card-property-zone {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--brand-blue);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 0.2rem;
        }

        .card-property-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .card-specs-row {
          display: flex;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .spec-divider {
          color: var(--border-main);
        }

        .card-price-row {
          margin-bottom: 2rem;
        }

        .price-tag {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--brand-green);
        }

        .card-buttons-actions {
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

        .btn-enquiry-direct {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(89, 165, 44, 0.1);
          color: var(--brand-green);
          border: none;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .btn-enquiry-direct:hover {
          background: var(--brand-green);
          color: #ffffff;
        }

        .no-properties-found {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
          border: 1px dashed var(--border-main);
          border-radius: 16px;
          color: var(--text-muted);
          font-size: 1rem;
        }

        /* Explore Category & Expert Card */
        .categories-section {
          padding: 8rem 0;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-main);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 6rem;
          align-items: center;
        }

        @media (max-width: 991px) {
          .categories-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .categories-left-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          margin-bottom: 3rem;
          color: var(--text-main);
        }

        .categories-blocks-stack {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 576px) {
          .categories-blocks-stack {
            grid-template-columns: 1fr;
          }
        }

        .cat-block-node {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.75rem 2rem;
          background: var(--bg-main);
          border: 1px solid var(--border-main);
          border-radius: 16px;
          transition: var(--transition-smooth);
          cursor: pointer;
        }

        .cat-block-node:hover {
          transform: translateY(-4px);
          border-color: rgba(11, 170, 220, 0.3);
          box-shadow: 0 8px 25px rgba(0,0,0,0.02);
        }

        .cat-icon {
          font-size: 1.75rem;
          line-height: 1;
        }

        .cat-name {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-main);
        }

        /* Expert Card Layout */
        .expert-query-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 16/11;
          display: flex;
          align-items: center;
          padding: 4rem;
          border: 1px solid var(--border-main);
          box-shadow: 0 15px 40px rgba(0,0,0,0.03);
        }

        .expert-card-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .expert-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(250, 249, 246, 0.98) 50%, rgba(250, 249, 246, 0.4) 100%);
          z-index: 2;
        }

        @media (max-width: 576px) {
          .expert-card-overlay {
            background: rgba(250, 249, 246, 0.95);
          }
        }

        .expert-card-content {
          position: relative;
          z-index: 3;
          max-width: 380px;
        }

        .expert-label {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--brand-green);
          margin-bottom: 0.5rem;
          display: inline-block;
          letter-spacing: 0.05em;
        }

        .expert-title {
          font-size: 2rem;
          color: var(--text-main);
          line-height: 1.2;
          margin-bottom: 1.25rem;
        }

        .expert-highlight {
          font-family: var(--font-outfit), sans-serif;
          font-style: italic;
          font-weight: 600;
          color: var(--brand-blue);
        }

        .expert-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .btn-secondary-green {
          padding: 0.9rem 2.25rem;
          background: var(--brand-green);
          border: none;
          border-radius: 50px;
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: var(--transition-fast);
          display: inline-block;
        }

        .btn-secondary-green:hover {
          background: #4a9122;
        }

        /* Why Invest in Kolkata */
        .market-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .market-header {
          text-align: center;
          margin-bottom: 6rem;
        }

        .market-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--text-main);
        }

        .market-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1200px) {
          .market-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .market-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .market-col-card {
          padding: 2.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          text-align: center;
          transition: var(--transition-smooth);
        }

        .market-col-card:hover {
          transform: translateY(-5px);
          border-color: rgba(11, 170, 220, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }

        .market-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .market-col-card h4 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.15rem;
          color: var(--text-main);
          margin-bottom: 0.75rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .market-col-card p {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* CTA Banner */
        .cta-banner-section {
          height: 380px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          background: #090b0e;
        }

        .cta-backdrop-wrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .cta-backdrop {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.4;
        }

        .cta-overlay-screen {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, transparent 40%, rgba(9, 11, 14, 0.8) 95%),
                      linear-gradient(to bottom, rgba(9, 11, 14, 0.3) 0%, rgba(9, 11, 14, 0.9) 100%);
        }

        .cta-content-box {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 700px;
          padding: 0 1.5rem;
        }

        .cta-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: #ffffff;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .cta-desc {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}
