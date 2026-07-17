'use client';

import React, { useState, useEffect } from 'react';

const HERO_SLIDES = [
  {
    image: '/images/howrah_bridge_sunset.jpg',
    tag: 'ICONIC KOLKATA BACKDROP',
    caption: 'Howrah Bridge Sunset · Heritage & Skyline'
  },
  {
    image: '/images/aurus_building.jpg',
    tag: 'FEATURED RESIDENTIAL ESTATE',
    caption: 'Aurus · Sky Condominiums off E.M. Bypass'
  },
  {
    image: '/images/jiva_building.jpg',
    tag: 'HOLISTIC WELL-BEING',
    caption: 'Jiva · Sanctuary Living & Water Gardens'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {/* Background Slides with Smooth Crossfade */}
      <div className="hero-backgrounds">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide-bg ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      {/* Cinematic Architectural Overlay (Dark Vignette, NO foggy white overlay) */}
      <div className="hero-cinematic-overlay" />

      {/* Hero Main Content */}
      <div className="container hero-content">
        <div className="hero-eyebrow-wrapper">
          <span className="hero-eyebrow-dot" />
          <span className="hero-eyebrow-text">{HERO_SLIDES[currentSlide].tag}</span>
        </div>

        <h1 className="hero-title">
          Crafting Architectural Landmarks <br />
          <span className="hero-title-accent">in the Heart of Kolkata</span>
        </h1>

        <p className="hero-subtitle">
          Leading real estate developer delivering sustainable Grade-A commercial spaces <br className="hidden-mobile" />
          and premier residential estates focused on holistic well-being.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn-hero-primary">
            <span>Explore Projects</span>
            <svg viewBox="0 0 20 20" fill="none" className="btn-arrow" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16666 10H15.8333M15.8333 10L10 4.16669M15.8333 10L10 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className="btn-hero-outline">
            <span>Enquire Now</span>
          </a>
        </div>
      </div>

      {/* Hero Bottom Bar: Slide Controls & Scroll Indicator */}
      <div className="hero-bottom-bar">
        <div className="container bottom-bar-inner">
          
          {/* Left: Slide Selector */}
          <div className="hero-slide-controls">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={index}
                type="button"
                className={`slide-pill ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Show slide ${index + 1}`}
              >
                <span className="slide-num">0{index + 1}</span>
                <span className="slide-progress" />
              </button>
            ))}
            <span className="slide-caption">{HERO_SLIDES[currentSlide].caption}</span>
          </div>

          {/* Center/Right: Max Estates Style Scroll Indicator */}
          <div className="scroll-down-wrapper" onClick={handleScrollDown}>
            <span className="scroll-text">Scroll Down</span>
            <div className="scroll-arrow-box">
              <svg viewBox="0 0 34 33" className="scroll-arrow" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.34083 8.40813L2.83333 10.8419L17 24.5919L31.1667 10.8419L28.6592 8.40813L17 19.7244L5.34083 8.40813Z" fill="#FFFFFF" />
              </svg>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .hero-section {
          height: 100vh;
          min-height: 700px;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: #0f172a;
        }

        .hero-backgrounds {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-slide-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1.05);
          transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-slide-bg.active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }

        /* Architectural Dark Vignette Overlay: Preserves image vibrance while ensuring 100% white text clarity */
        .hero-cinematic-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.65) 0%, rgba(15, 23, 42, 0.25) 35%, rgba(15, 23, 42, 0.45) 75%, rgba(15, 23, 42, 0.88) 100%),
                      radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%);
          z-index: 3;
        }

        .hero-content {
          position: relative;
          z-index: 4;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: calc(var(--header-height) + 1rem);
          padding-bottom: 5rem;
        }

        .hero-eyebrow-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 1.15rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 50px;
          backdrop-filter: blur(10px);
          margin-bottom: 2rem;
          animation: fadeInDown 0.8s ease out;
        }

        .hero-eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #59a52c;
          box-shadow: 0 0 10px #59a52c;
        }

        .hero-eyebrow-text {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #ffffff;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(2.75rem, 5.2vw, 4.8rem);
          font-weight: 700;
          line-height: 1.12;
          color: #ffffff;
          margin-bottom: 1.75rem;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
          letter-spacing: -0.02em;
        }

        /* Editorial Serif Italic Accent: High-end architectural look rather than rainbow gradients */
        .hero-title-accent {
          font-family: var(--font-playfair), serif;
          font-style: italic;
          font-weight: 400;
          color: #f8fafc;
          letter-spacing: 0;
        }

        .hero-subtitle {
          font-size: clamp(1.05rem, 1.5vw, 1.3rem);
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.88);
          margin-bottom: 2.75rem;
          max-width: 820px;
          font-weight: 400;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .hero-actions {
          display: flex;
          gap: 1.25rem;
          justify-content: center;
          align-items: center;
        }

        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--brand-green);
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          padding: 1.05rem 2.25rem;
          border-radius: 50px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 30px rgba(89, 165, 44, 0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-hero-primary:hover {
          background: #4d9026;
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(89, 165, 44, 0.55);
          color: #ffffff;
        }

        .btn-arrow {
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }

        .btn-hero-primary:hover .btn-arrow {
          transform: translateX(4px);
        }

        .btn-hero-outline {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          padding: 1.05rem 2.25rem;
          border-radius: 50px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-hero-outline:hover {
          background: rgba(255, 255, 255, 0.24);
          border-color: #ffffff;
          transform: translateY(-3px);
          color: #ffffff;
        }

        /* Bottom Bar & Controls */
        .hero-bottom-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 5;
          padding: 1.75rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          background: linear-gradient(0deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0) 100%);
        }

        .bottom-bar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .hero-slide-controls {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .slide-pill {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          align-items: flex-start;
          transition: opacity 0.3s ease;
          opacity: 0.5;
        }

        .slide-pill.active,
        .slide-pill:hover {
          opacity: 1;
        }

        .slide-num {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: #ffffff;
        }

        .slide-progress {
          width: 32px;
          height: 3px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }

        .slide-pill.active .slide-progress::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #59a52c;
          border-radius: 3px;
        }

        .slide-caption {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          margin-left: 0.75rem;
          padding-left: 1.25rem;
          border-left: 1px solid rgba(255, 255, 255, 0.25);
          white-space: nowrap;
        }

        .scroll-down-wrapper {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0.4rem 0.8rem;
          border-radius: 50px;
        }

        .scroll-down-wrapper:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .scroll-text {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
        }

        .scroll-arrow-box {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
        }

        .scroll-arrow {
          width: 14px;
          height: 14px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-4px);
          }
          60% {
            transform: translateY(-2px);
          }
        }

        @media (max-width: 991px) {
          .slide-caption {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .bottom-bar-inner {
            flex-direction: column;
            gap: 1.25rem;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
          }
          .btn-hero-primary,
          .btn-hero-outline {
            width: 100%;
            justify-content: center;
          }
          .hidden-mobile {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
