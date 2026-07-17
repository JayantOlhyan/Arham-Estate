'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const path = pathRef.current;
    if (!path) return;

    // Get exact length of the curved path
    let pathLength = 800; // fallback
    try {
      pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
    } catch (e) {
      console.warn("Error setting path lengths:", e);
    }

    // Scroll trigger animation to draw the path
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 1,
      }
    });

    tl.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
    });

  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section light-section">
      
      {/* Scroll-triggered Drawing SVG Line */}
      <div className="about-svg-container">
        <svg viewBox="0 0 700 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            ref={pathRef}
            d="M 500 0 C 750 200, 680 500, 200 600 C 100 620, 50 680, 10 750"
            stroke="var(--brand-green)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container">
        <div className="about-grid">
          <div className="about-header">
            <span className="section-label">Who We Are</span>
            <h2 className="about-title">Arham Estate Limited</h2>
            <div className="brand-film-card">
              <div className="brand-film-placeholder">
                <img 
                  src="/images/boardroom_interior.jpg" 
                  alt="Arham Estate Brand Film" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div className="play-button-overlay">
                  <div className="play-icon"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-body">
            <p className="about-lead">
              A completely integrated real estate firm with dedicated services provided by a team of devoted professionals.
            </p>
            <p className="about-text">
              Equipped with our crystal clear, fair deal performance and a futurist management, the company presents a host of wide-ranging real estate services like residential, commercial, retail, land and other end-to-end solutions to buyers, sellers, investors, and developers.
            </p>
            <div className="kpi-grid">
              <div className="kpi-card">
                <span className="kpi-number">10+</span>
                <span className="kpi-label">Years of Experience</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-number">500+</span>
                <span className="kpi-label">Happy Clients</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-number">100%</span>
                <span className="kpi-label">Fair Deal Record</span>
              </div>
            </div>
            <a href="#contact" className="btn btn-outline">Connect With Us</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          color: var(--text-main);
          position: relative;
          overflow: hidden;
        }

        .about-svg-container {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          opacity: 0.8;
        }

        .about-svg-container svg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 6rem;
          position: relative;
          z-index: 2;
          align-items: center;
        }

        @media (max-width: 991px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .section-label {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--brand-green);
          display: inline-block;
          margin-bottom: 0.75rem;
        }

        .about-title {
          font-size: clamp(2rem, 3.5vw, 3.25rem);
          margin-bottom: 2.5rem;
          color: var(--text-main);
        }

        .brand-film-card {
          border-radius: 16px;
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .brand-film-placeholder {
          aspect-ratio: 16/9;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          background: #e2e8f0;
        }

        .play-button-overlay {
          position: absolute;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.05);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(15, 23, 42, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
        }

        .brand-film-placeholder:hover .play-button-overlay {
          transform: scale(1.1);
          background: var(--brand-green);
          border-color: var(--brand-green);
          box-shadow: 0 0 30px rgba(108, 182, 60, 0.5);
        }

        .play-icon {
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 16px solid #ffffff;
          margin-left: 4px;
        }

        .about-body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .about-lead {
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--text-main);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .about-text {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          width: 100%;
          margin-bottom: 3rem;
          border-top: 1px solid var(--border-main);
          padding-top: 2rem;
        }

        .kpi-card {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .kpi-number {
          font-family: var(--font-outfit), sans-serif;
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--brand-blue);
          line-height: 1;
        }

        .kpi-label {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
