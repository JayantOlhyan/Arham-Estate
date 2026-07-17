'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  'All Insights',
  'Market Trends',
  'Investment Guides',
  'Locality Spotlight',
  'Policy & Regulation',
  'News & Updates'
];

const sideInsights = [
  {
    category: 'Locality Spotlight',
    title: 'Alipore: The Timeless Luxury Corridor',
    date: '08 May 2024',
    image: '/images/classical_facade.jpg',
  },
  {
    category: 'Investment Guides',
    title: 'Residential vs Commercial: Where Should You Invest?',
    date: '03 May 2024',
    image: '/images/hooghly_bridge_sunset.jpg',
  },
  {
    category: 'Market Trends',
    title: 'Premium Housing Demand on the Rise in Kolkata',
    date: '28 Apr 2024',
    image: '/images/luxury_living_room.jpg',
  },
  {
    category: 'Policy & Regulation',
    title: 'RERA Updates: Key Changes Every Buyer Should Know',
    date: '20 Apr 2024',
    image: '/images/boardroom_interior.jpg',
  },
];

const popularInsights = [
  {
    category: 'Locality Spotlight',
    title: 'New Town: The Future Growth Engine',
    date: '15 Apr 2024',
    timeToRead: '5 MIN READ',
    image: '/images/panache_building.jpg',
  },
  {
    category: 'Investment Guides',
    title: 'A Beginner\'s Guide to Real Estate Investment',
    date: '10 Apr 2024',
    timeToRead: '7 MIN READ',
    image: '/images/jiva_building.jpg',
  },
  {
    category: 'Market Trends',
    title: 'Impact of Infrastructure on Real Estate Values',
    date: '05 Apr 2024',
    timeToRead: '6 MIN READ',
    image: '/images/the_102_building.jpg',
  },
  {
    category: 'Locality Spotlight',
    title: 'Ballygunge: Heritage Meets Modern Living',
    date: '28 Mar 2024',
    timeToRead: '4 MIN READ',
    image: '/images/victoria_memorial.jpg',
  },
];

export default function InsightsPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All Insights');
  const [sortOption, setSortOption] = useState('Latest');

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

    // GSAP Reveals
    gsap.from('.insights-hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
    });

    gsap.from('.featured-insight-card', {
      scrollTrigger: {
        trigger: '.insights-main-section',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.side-insight-item', {
      scrollTrigger: {
        trigger: '.insights-main-section',
        start: 'top 80%',
      },
      x: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    gsap.from('.popular-insight-card', {
      scrollTrigger: {
        trigger: '.popular-insights-section',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to Arham Estate Insights!');
  };

  return (
    <div ref={scrollContainerRef} className="main-layout-wrapper">
      <Header />

      {/* Hero Section */}
      <section className="insights-hero-section">
        <div className="insights-hero-bg-wrap">
          <img src="/images/hooghly_bridge_sunset.jpg" alt="Vidyasagar Setu Twilight" className="insights-hero-bg" />
          <div className="insights-hero-overlay"></div>
        </div>
        <div className="container pf-hero-box">
          <div className="insights-hero-content">
            <span className="section-label text-green">Insights</span>
            <h1 className="insights-hero-title">
              Insights that <br />
              inspire better <span className="text-highlight">decisions.</span>
            </h1>
            <p className="insights-hero-desc">
              Market trends, expert perspectives and in-depth research to help you navigate Kolkata's real estate landscape with confidence.
            </p>
            <a href="#insights-list" className="btn btn-primary pf-hero-btn">
              Subscribe to Insights &nbsp;→
            </a>
          </div>
        </div>
      </section>

      {/* Category filter bar */}
      <div id="insights-list" className="insights-filter-bar">
        <div className="container filter-wrap-row">
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="sort-dropdown-wrap">
            <span className="sort-label">Sort by:</span>
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
            >
              <option value="Latest">Latest</option>
              <option value="Popular">Most Read</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Section (Featured + Sidebar) */}
      <section className="insights-main-section">
        <div className="container main-insights-grid">
          
          {/* Left: Featured Large Card */}
          <div className="featured-column">
            <div className="featured-insight-card">
              <div className="featured-image-wrap">
                <img src="/images/aurus_building.jpg" alt="Aurus Luxury Towers EM Bypass" className="featured-image" />
                <span className="featured-tag">Featured</span>
              </div>
              <div className="featured-card-details">
                <div className="card-meta-row">
                  <span className="card-category">Market Trends</span>
                  <span className="card-dot">•</span>
                  <span className="card-date">12 May 2024</span>
                </div>
                <h2 className="featured-title">Kolkata Real Estate Market Outlook 2024</h2>
                <p className="featured-excerpt">
                  An in-depth look at demand drivers, pricing trends, infrastructure boost and what the future holds for investors and end-users in Kolkata's high-end segments.
                </p>
                <Link href="/insights" className="btn-read-more">
                  Read More &nbsp;→
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Side List Cards */}
          <div className="sidebar-column">
            <div className="sidebar-insights-stack">
              {sideInsights.map((item, index) => (
                <div key={index} className="side-insight-item">
                  <div className="side-item-image-wrap">
                    <img src={item.image} alt={item.title} className="side-item-image" />
                  </div>
                  <div className="side-item-details">
                    <span className="side-item-cat">{item.category}</span>
                    <h4 className="side-item-title">{item.title}</h4>
                    <span className="side-item-date">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Popular Insights Grid */}
      <section className="popular-insights-section">
        <div className="container">
          <div className="popular-header-row">
            <span className="section-label">Popular Insights</span>
            <h2 className="popular-section-title">Trending Perspectives</h2>
          </div>

          <div className="popular-insights-grid">
            {popularInsights.map((card, idx) => (
              <div key={idx} className="popular-insight-card">
                <div className="popular-image-wrap">
                  <img src={card.image} alt={card.title} className="popular-image" />
                  <span className="popular-time-tag">{card.timeToRead}</span>
                </div>
                <div className="popular-details">
                  <span className="popular-card-cat">{card.category}</span>
                  <h4 className="popular-card-title">{card.title}</h4>
                  <div className="popular-card-footer">
                    <span className="popular-card-date">{card.date}</span>
                    <Link href="/insights" className="popular-read-link">Read &nbsp;→</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter subscribe */}
      <section className="newsletter-card-section">
        <div className="container">
          <div className="newsletter-accent-box">
            <div className="newsletter-decor-bg">
              <svg viewBox="0 0 100 100" className="decor-icon-svg" xmlns="http://www.w3.org/2000/svg">
                <path d="M 10 30 Q 50 60 90 30" fill="none" stroke="var(--brand-green)" strokeWidth="3" />
                <rect x="10" y="20" width="80" height="60" rx="5" fill="none" stroke="var(--brand-green)" strokeWidth="3" />
              </svg>
            </div>
            <div className="newsletter-box-content">
              <h3>Stay ahead with expert insights</h3>
              <p>Subscribe to our newsletter and never miss an update on Kolkata's luxury real estate and market analysis.</p>
              <form onSubmit={handleSubscribe} className="newsletter-form-inline">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required 
                  className="newsletter-input" 
                />
                <button type="submit" className="btn btn-secondary-green subscribe-box-btn">
                  Subscribe &nbsp;→
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        /* Hero Section */
        .insights-hero-section {
          position: relative;
          padding: 14rem 0 9rem 0;
          overflow: hidden;
          background: #090b0e;
        }

        .insights-hero-bg-wrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .insights-hero-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
        }

        .insights-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(9, 11, 14, 0.95) 40%, rgba(9, 11, 14, 0.4) 100%);
          z-index: 2;
        }

        .pf-hero-box {
          position: relative;
          z-index: 3;
        }

        .insights-hero-title {
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

        .insights-hero-desc {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 580px;
        }

        .pf-hero-btn {
          padding: 1.1rem 3rem;
          display: inline-block;
        }

        /* Category tabs */
        .insights-filter-bar {
          background: #ffffff;
          border-bottom: 1px solid var(--border-main);
          padding: 1.5rem 0;
          position: sticky;
          top: var(--header-height);
          z-index: 20;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .filter-wrap-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        @media (max-width: 991px) {
          .filter-wrap-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
        }

        .category-tabs {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .category-tab-btn {
          padding: 0.6rem 1.25rem;
          border-radius: 50px;
          border: 1px solid var(--border-main);
          background: var(--bg-main);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          color: var(--text-muted);
          cursor: pointer;
          font-weight: 500;
          transition: var(--transition-fast);
        }

        .category-tab-btn:hover, .category-tab-btn.active {
          border-color: var(--brand-green);
          color: var(--brand-green);
          background: rgba(89, 165, 44, 0.05);
        }

        .sort-dropdown-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .sort-label {
          font-size: 0.88rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .sort-select {
          border: 1px solid var(--border-main);
          background: var(--bg-main);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          outline: none;
          font-size: 0.88rem;
          color: var(--text-main);
          cursor: pointer;
        }

        /* Main Section layout */
        .insights-main-section {
          padding: 6rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .main-insights-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 5rem;
        }

        @media (max-width: 991px) {
          .main-insights-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        /* Featured Large Card */
        .featured-insight-card {
          background: #ffffff;
          border: 1px solid var(--border-main);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .featured-image-wrap {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .featured-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .featured-insight-card:hover .featured-image {
          transform: scale(1.02);
        }

        .featured-tag {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background: var(--brand-green);
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.7rem;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.4rem 1rem;
          border-radius: 4px;
        }

        .featured-card-details {
          padding: 3rem;
        }

        @media (max-width: 576px) {
          .featured-card-details {
            padding: 2rem;
          }
        }

        .card-meta-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
          font-weight: 600;
        }

        .card-category {
          color: var(--brand-green);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .card-dot {
          opacity: 0.5;
        }

        .featured-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(1.5rem, 3.5vw, 2.25rem);
          color: var(--text-main);
          margin-bottom: 1.25rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .featured-excerpt {
          font-size: 1.02rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2.25rem;
        }

        .btn-read-more {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
          transition: var(--transition-fast);
        }

        .btn-read-more:hover {
          color: var(--brand-green);
          padding-left: 4px;
        }

        /* Sidebar Stack */
        .sidebar-insights-stack {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .side-insight-item {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-main);
        }

        .side-insight-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .side-item-image-wrap {
          width: 110px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid var(--border-main);
        }

        .side-item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .side-item-details {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .side-item-cat {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--brand-green);
          text-transform: uppercase;
          margin-bottom: 0.35rem;
          letter-spacing: 0.05em;
        }

        .side-item-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.05rem;
          color: var(--text-main);
          font-weight: 600;
          line-height: 1.3;
          margin-bottom: 0.5rem;
          transition: var(--transition-fast);
        }

        .side-insight-item:hover .side-item-title {
          color: var(--brand-green);
        }

        .side-item-date {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* Popular Insights Grid */
        .popular-insights-section {
          padding: 8rem 0;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-main);
        }

        .popular-header-row {
          margin-bottom: 4rem;
        }

        .popular-section-title {
          font-size: clamp(1.85rem, 3.5vw, 2.5rem);
          color: var(--text-main);
          margin-top: 0.5rem;
        }

        .popular-insights-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1200px) {
          .popular-insights-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .popular-insights-grid {
            grid-template-columns: 1fr;
          }
        }

        .popular-insight-card {
          background: var(--bg-main);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: var(--transition-smooth);
        }

        .popular-insight-card:hover {
          transform: translateY(-5px);
          border-color: rgba(11, 170, 220, 0.25);
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .popular-image-wrap {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
        }

        .popular-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .popular-insight-card:hover .popular-image {
          transform: scale(1.03);
        }

        .popular-time-tag {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
        }

        .popular-details {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .popular-card-cat {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--brand-green);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }

        .popular-card-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.15rem;
          color: var(--text-main);
          font-weight: 600;
          line-height: 1.3;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .popular-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          border-top: 1px solid var(--border-main);
          padding-top: 1.25rem;
        }

        .popular-card-date {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .popular-read-link {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--brand-blue);
          transition: var(--transition-fast);
        }

        .popular-read-link:hover {
          color: var(--brand-green);
          padding-left: 4px;
        }

        /* Newsletter Section */
        .newsletter-card-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
        }

        .newsletter-accent-box {
          background-color: #faf9f6; /* soft match with ivory */
          border: 1px solid var(--border-main);
          border-radius: 24px;
          padding: 5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 45px rgba(0,0,0,0.02);
          display: flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .newsletter-accent-box {
            padding: 3rem 2rem;
          }
        }

        .newsletter-decor-bg {
          position: absolute;
          right: -30px;
          bottom: -30px;
          width: 250px;
          height: 250px;
          opacity: 0.05;
          pointer-events: none;
        }

        .decor-icon-svg {
          width: 100%;
          height: 100%;
        }

        .newsletter-box-content {
          position: relative;
          z-index: 2;
          max-width: 650px;
        }

        .newsletter-box-content h3 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 2rem;
          color: var(--text-main);
          margin-bottom: 0.75rem;
          font-weight: 700;
        }

        .newsletter-box-content p {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .newsletter-form-inline {
          display: flex;
          gap: 1rem;
          width: 100%;
          max-width: 500px;
        }

        @media (max-width: 576px) {
          .newsletter-form-inline {
            flex-direction: column;
            max-width: 100%;
          }
        }

        .newsletter-input {
          flex: 1;
          padding: 1rem 1.5rem;
          border: 1px solid var(--border-main);
          background: #ffffff;
          border-radius: 50px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          color: var(--text-main);
          outline: none;
          transition: var(--transition-fast);
        }

        .newsletter-input:focus {
          border-color: var(--brand-green);
        }

        .subscribe-box-btn {
          padding: 1rem 2.5rem;
          border-radius: 50px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
