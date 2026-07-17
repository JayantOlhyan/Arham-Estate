'use client';

import React, { use, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lenis from 'lenis';
import gsap from 'gsap';
import { EnquiryModal } from '@/components/EnquiryForms';

const propertiesDetails = {
  aurus: {
    title: 'Aurus',
    developer: 'PS Group',
    zone: 'Central Kolkata',
    location: 'EM Bypass',
    price: '₹3.21 Cr* onwards',
    specs: '3, 4 & 5 BHK',
    size: '1,890 - 4,200 sq.ft.',
    desc: 'Aurus is Kolkata\'s premier luxury residential address, designed for those who appreciate the finer things in life. Located on EM Bypass, it offers majestic views of the city, expansive outdoor decks, and a lifestyle comparable to international standards.',
    badge: 'READY TO MOVE',
    image: '/images/aurus_building.jpg',
    bullets: [
      '22ft wide balcony decks with panoramic city views',
      'Double-height ceilings in living and dining rooms',
      '40,000 sq.ft. premium clubhouse and sky lounge',
      'Indoor temperature-controlled swimming pool, gym, and luxury spa',
      'Advanced 3-tier security infrastructure and automated home systems'
    ],
    near: [
      { name: 'Leela Hotel & ITC Royal Bengal', dist: '2 mins away' },
      { name: 'Science City / Milan Mela', dist: '5 mins away' },
      { name: 'Park Street / Chowringhee', dist: '12 mins away' }
    ]
  },
  jiva: {
    title: 'Jiva',
    developer: 'PS Group',
    zone: 'Alipore',
    location: 'South Kolkata',
    price: '₹6.50 Cr* onwards',
    specs: '4 & 5 BHK',
    size: '3,200 - 4,100 sq.ft.',
    desc: 'Jiva is a collection of boutique water homes designed to bring nature back into daily life. Located in Alipore, it features beautiful natural ponds, floating decks, and luxury living spaces with absolute privacy.',
    badge: 'NEW LAUNCH',
    image: '/images/jiva_building.jpg',
    bullets: [
      'Boutique residences surrounded by natural ponds and wind tunnels',
      'Private gardens and floating wooden pavilions',
      '43% water bodies and lush landscaped gardens inside the gates',
      'Low density boutique design offering high-end privacy',
      'Premium Italian marble flooring and premium bathroom fittings'
    ],
    near: [
      { name: 'Alipore Zoo & National Library', dist: '3 mins away' },
      { name: 'Taj Bengal Hotel', dist: '5 mins away' },
      { name: 'Bhowanipore / Hazra Crossing', dist: '8 mins away' }
    ]
  },
  panache: {
    title: 'Panache',
    developer: 'PS Group',
    zone: 'New Town',
    location: 'East Kolkata',
    price: '₹1.85 Cr* onwards',
    specs: '2, 3 & 4 BHK',
    size: '1,100 - 2,800 sq.ft.',
    desc: 'Panache offers premium contemporary living spaces in Sector V, the center of Kolkata\'s commercial and technology corridor. Designed for modern professionals, it combines high efficiency with luxury leisure.',
    badge: 'UNDER CONSTRUCTION',
    image: '/images/panache_building.jpg',
    bullets: [
      'Strategically situated adjacent to Kolkata\'s leading IT Sector V Hub',
      'Multi-tier premium club with sports courts, pool, and community halls',
      'High-speed elevators and advanced fire protection setups',
      'Landscaped central lawn and open children play parks',
      'Excellent rental yield potential and high capital appreciation'
    ],
    near: [
      { name: 'Sector V Metro Station', dist: '1 min away' },
      { name: 'Technopolis / Salt Lake Bypass', dist: '3 mins away' },
      { name: 'City Centre II Mall', dist: '10 mins away' }
    ]
  },
  'the-102': {
    title: 'The 102',
    developer: 'PS Group',
    zone: 'Rajarhat',
    location: 'North Kolkata',
    price: '₹1.85 Cr* onwards',
    specs: '2 & 3 BHK',
    size: '1,000 - 3,200 sq.ft.',
    desc: 'The 102 is an architectural masterpiece designed to offer luxury amenities and exceptional value. Sprawled across beautiful grounds, it features a unique curved tower design that provides excellent cross-ventilation and natural lighting.',
    badge: 'UNDER CONSTRUCTION',
    image: '/images/the_102_building.jpg',
    bullets: [
      'Modern architecture with sleek curved layouts and natural breeze flows',
      '102 world-class amenities including sports fields, theaters, and pool',
      'Sprawling themed flower gardens and elderly fitness courts',
      'Close proximity to premier international schools & IT parks',
      'High potential for long-term real estate capital growth'
    ],
    near: [
      { name: 'Eco Park Kolkata', dist: '4 mins away' },
      { name: 'Kolkata International Airport', dist: '15 mins away' },
      { name: 'Chinar Park Crossing', dist: '8 mins away' }
    ]
  }
};

export default function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug as keyof typeof propertiesDetails;
  const project = propertiesDetails[slug];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [enquiryProject, setEnquiryProject] = useState<string | null>(null);

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

    // Entrance Animation
    gsap.from('.detail-header-left > *', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    gsap.from('.detail-header-right', {
      x: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.gallery-large-box', {
      scale: 0.98,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.gallery-grid-box', {
      x: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  if (!project) {
    return (
      <div className="not-found-wrapper">
        <Header />
        <div className="container error-box">
          <h2>Property Not Found</h2>
          <p>The requested property could not be loaded. Please return to our listing directory.</p>
          <Link href="/properties" className="btn btn-primary">Back to Properties</Link>
        </div>
        <Footer />
        <style jsx>{`
          .error-box {
            padding: 15rem 2rem 10rem 2rem;
            text-align: center;
          }
          .error-box h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: var(--text-main);
          }
          .error-box p {
            color: var(--text-muted);
            margin-bottom: 2rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={scrollContainerRef} className="main-layout-wrapper">
      <Header />

      {/* Breadcrumb & Header Section */}
      <section className="detail-hero-section">
        <div className="container">
          
          <nav className="breadcrumbs-nav">
            <Link href="/">Home</Link>
            <span className="bread-sep">/</span>
            <Link href="/properties">Properties</Link>
            <span className="bread-sep">/</span>
            <span className="bread-curr">{project.title}</span>
          </nav>

          <div className="detail-header-row">
            <div className="detail-header-left">
              <span className="card-badge">{project.badge}</span>
              <h1 className="detail-title">{project.title}</h1>
              <div className="detail-dev-row">
                <span className="dev-name">Developer: <strong>{project.developer}</strong></span>
                <span className="dev-sep">•</span>
                <span className="dev-loc">{project.location}, {project.zone}</span>
              </div>
            </div>
            
            <div className="detail-header-right">
              <span className="detail-price">{project.price}</span>
              <button onClick={() => setEnquiryProject(project.title)} className="btn btn-primary enquire-large-btn">
                Enquire Now &nbsp;→
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Property Media Gallery */}
      <section className="media-gallery-section">
        <div className="container gallery-grid-layout">
          <div className="gallery-large-box">
            <img src={project.image} alt={project.title} className="gallery-img main-img" />
          </div>
          <div className="gallery-grid-box flex-box-col">
            <div className="gallery-mini-box">
              <img src="/images/luxury_living_room.jpg" alt="Living Room lifestyle" className="gallery-img" />
              <div className="mini-box-label">INTERIOR LIFESTYLE</div>
            </div>
            <div className="gallery-mini-box">
              <img src="/images/boardroom_interior.jpg" alt="Conference room lifestyle" className="gallery-img" />
              <div className="mini-box-label">BUSINESS ARCHITECTURE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Core details */}
      <section className="detail-overview-section">
        <div className="container overview-grid">
          
          {/* Left Description Column */}
          <div className="overview-left">
            <h2 className="section-title-line">Property Overview</h2>
            <p className="overview-narrative">{project.desc}</p>
            
            <h3 className="key-highlights-title">Key Highlights</h3>
            <ul className="highlights-list">
              {project.bullets.map((bullet, i) => (
                <li key={i}>
                  <span className="bullet-chk">✓</span>
                  <p>{bullet}</p>
                </li>
              ))}
            </ul>

            <div className="overview-icons-grid">
              <div className="icon-detail-node">
                <span className="node-icon">📐</span>
                <span className="node-label">Built-up Area</span>
                <span className="node-val">{project.size}</span>
              </div>
              <div className="icon-detail-node">
                <span className="node-icon">🏢</span>
                <span className="node-label">Configuration</span>
                <span className="node-val">{project.specs}</span>
              </div>
              <div className="icon-detail-node">
                <span className="node-icon">📍</span>
                <span className="node-label">Micro-Market</span>
                <span className="node-val">{project.location}</span>
              </div>
            </div>
          </div>

          {/* Right Location Advantage Map */}
          <div className="overview-right">
            <h2 className="section-title-line">Location Advantage</h2>
            <p className="location-intro">
              Situated in Kolkata's high-growth corridor, connecting you seamlessly to top business hubs, schools and entertainment centers.
            </p>

            <div className="map-holder-box">
              <img src="/images/kolkata_city_map.jpg" alt="Kolkata Vector Map Infographic" className="map-image-asset" />
            </div>

            <div className="map-distances-stack">
              {project.near.map((item, idx) => (
                <div key={idx} className="distance-point">
                  <span className="dist-pin">📍</span>
                  <div className="dist-details">
                    <h6>{item.name}</h6>
                    <span>{item.dist}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Advisor Enquiry Card Banner */}
      <section className="advisor-contact-section">
        <div className="container">
          <div className="advisor-card-box">
            <div className="advisor-info-col">
              <span className="advisor-subtitle">Senior Advisor Partner</span>
              <h3 className="advisor-name">Deepak Bhargava</h3>
              <p className="advisor-pitch">
                Expert portfolio advisory with 18+ years of real estate transactions in Kolkata's luxury developments.
              </p>
              <div className="advisor-methods">
                <div className="method-item">
                  <span className="method-icon">📞</span>
                  <span>+91 98300 XXXXX</span>
                </div>
                <div className="method-item">
                  <span className="method-icon">✉</span>
                  <span>deepak@arhamestate.com</span>
                </div>
              </div>
            </div>
            <div className="advisor-form-col">
              <h4 className="adv-form-title">Instant Advisory Call-back</h4>
              <form onSubmit={(e) => { e.preventDefault(); alert("Enquiry submitted successfully! Deepak Bhargava will connect with you within 2 hours."); }} className="advisor-direct-form">
                <div className="form-double">
                  <input type="text" placeholder="Your Name" required className="adv-input" />
                  <input type="tel" placeholder="Mobile Number" required className="adv-input" />
                </div>
                <input type="email" placeholder="Your Email Address" required className="adv-input" />
                <textarea rows={3} defaultValue={`I am interested in ${project.title} on EM Bypass. Please share brochure & price sheet.`} className="adv-textarea" />
                <button type="submit" className="btn btn-secondary-green adv-submit-btn">
                  Submit Enquiry &nbsp;→
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Enquiry Modal */}
      <EnquiryModal 
        projectName={enquiryProject}
        onClose={() => setEnquiryProject(null)}
      />

      <style jsx>{`
        /* Breadcrumbs */
        .detail-hero-section {
          padding: 12rem 0 4rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .breadcrumbs-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          font-weight: 500;
        }

        .breadcrumbs-nav a:hover {
          color: var(--brand-green);
        }

        .bread-sep {
          color: var(--border-main);
        }

        .bread-curr {
          color: var(--text-main);
          font-weight: 600;
        }

        /* Header row */
        .detail-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .detail-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
        }

        .detail-header-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .detail-header-left .card-badge {
          position: static;
          background: var(--brand-green);
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.8rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .detail-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.1;
          color: var(--text-main);
          margin-bottom: 0.75rem;
        }

        .detail-dev-row {
          display: flex;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-muted);
          align-items: center;
        }

        .dev-sep {
          color: var(--border-main);
        }

        .detail-header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .detail-header-right {
            align-items: flex-start;
            width: 100%;
          }
        }

        .detail-price {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--brand-green);
        }

        .enquire-large-btn {
          padding: 1rem 2.5rem;
        }

        @media (max-width: 768px) {
          .enquire-large-btn {
            width: 100%;
            text-align: center;
          }
        }

        /* Gallery Grid Layout */
        .media-gallery-section {
          padding: 2.5rem 0;
          background-color: var(--bg-main);
        }

        .gallery-grid-layout {
          display: grid;
          grid-template-columns: 1.4fr 0.6fr;
          gap: 1.5rem;
        }

        @media (max-width: 991px) {
          .gallery-grid-layout {
            grid-template-columns: 1fr;
          }
        }

        .gallery-large-box {
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 16/9;
          border: 1px solid var(--border-main);
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .gallery-large-box:hover .main-img {
          transform: scale(1.02);
        }

        .flex-box-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .gallery-mini-box {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          flex: 1;
          aspect-ratio: 16/10;
          border: 1px solid var(--border-main);
        }

        .mini-box-label {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.75rem;
          border-radius: 4px;
          z-index: 5;
        }

        /* Overview Details Section */
        .detail-overview-section {
          padding: 6rem 0 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .overview-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 6rem;
        }

        @media (max-width: 991px) {
          .overview-grid {
            grid-template-columns: 1fr;
            gap: 5rem;
          }
        }

        .section-title-line {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 2rem;
          border-bottom: 2px solid var(--brand-green);
          padding-bottom: 0.5rem;
          display: inline-block;
        }

        .overview-narrative {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 3rem;
        }

        .key-highlights-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.35rem;
          color: var(--text-main);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 3.5rem;
        }

        .highlights-list li {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .bullet-chk {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(89, 165, 44, 0.1);
          color: var(--brand-green);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.75rem;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .highlights-list p {
          font-size: 0.98rem;
          color: var(--text-main);
          line-height: 1.4;
        }

        .overview-icons-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          border-top: 1px solid var(--border-main);
          padding-top: 2.5rem;
        }

        @media (max-width: 576px) {
          .overview-icons-grid {
            grid-template-columns: 1fr;
          }
        }

        .icon-detail-node {
          padding: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .node-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }

        .node-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 0.25rem;
          letter-spacing: 0.05em;
        }

        .node-val {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-main);
        }

        /* Right location map side */
        .location-intro {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .map-holder-box {
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border-main);
          aspect-ratio: 16/10;
          margin-bottom: 2.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .map-image-asset {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .map-distances-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .distance-point {
          display: flex;
          gap: 1rem;
          align-items: center;
          padding: 1rem 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 12px;
        }

        .dist-pin {
          font-size: 1.25rem;
        }

        .dist-details h6 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.95rem;
          color: var(--text-main);
          font-weight: 600;
        }

        .dist-details span {
          font-size: 0.8rem;
          color: var(--brand-green);
          font-weight: 600;
        }

        /* Advisor Enquiry Card */
        .advisor-contact-section {
          padding: 0 0 8rem 0;
          background-color: var(--bg-main);
        }

        .advisor-card-box {
          background-color: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 24px;
          padding: 4rem;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 5rem;
          box-shadow: 0 15px 45px rgba(0,0,0,0.02);
        }

        @media (max-width: 991px) {
          .advisor-card-box {
            grid-template-columns: 1fr;
            gap: 4rem;
            padding: 2.5rem;
          }
        }

        .advisor-info-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }

        .advisor-subtitle {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--brand-green);
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }

        .advisor-name {
          font-size: 2.25rem;
          color: var(--text-main);
          margin-bottom: 1rem;
        }

        .advisor-pitch {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .advisor-methods {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .method-item {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          font-size: 0.98rem;
          color: var(--text-main);
          font-weight: 500;
        }

        .method-icon {
          font-size: 1.25rem;
        }

        /* Advisor Direct Form */
        .advisor-form-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .adv-form-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.35rem;
          color: var(--text-main);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .advisor-direct-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-double {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        @media (max-width: 576px) {
          .form-double {
            grid-template-columns: 1fr;
          }
        }

        .adv-input, .adv-textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 1px solid var(--border-main);
          background: var(--bg-main);
          border-radius: 10px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          color: var(--text-main);
          outline: none;
          transition: var(--transition-fast);
        }

        .adv-input:focus, .adv-textarea:focus {
          border-color: var(--brand-green);
          background: #ffffff;
        }

        .adv-submit-btn {
          align-self: flex-start;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          cursor: pointer;
        }

        @media (max-width: 576px) {
          .adv-submit-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
