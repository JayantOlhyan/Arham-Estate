'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Pillar {
  id: string;
  title: string;
  desc: string;
}

const pillars: Pillar[] = [
  {
    id: 'services',
    title: 'Core Real Estate Services',
    desc: 'Equipped with our crystal clear, fair deal performance and a futurist management, the company presents host of wide-ranging real estate services like residential, commercial, retail, land and other end to end solutions to buyers, sellers, investors and developers.',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Management',
    desc: 'Maximize value, assess risk, and capture market opportunities. Our expert advisors optimize real estate portfolios through detailed data, performance metrics, and a proactive management approach to secure long-term capital growth.',
  },
  {
    id: 'venture',
    title: 'Venture Funds',
    desc: 'Connecting institutional capital with high-impact development projects. We structure and manage strategic venture funds focused on emerging real estate opportunities in Kolkata and adjacent high-growth markets.',
  },
  {
    id: 'consultancy',
    title: 'Exclusive Consultancy',
    desc: 'Tailored, confidential real estate consultancy for high-net-worth individuals and corporate houses. From structural audits to valuation and acquisitions, we provide discrete, bespoke guidance.',
  },
  {
    id: 'developers',
    title: 'Developers Services',
    desc: 'Providing land sourcing, market research, zoning assessments, project design alignment, and end-to-end sales/marketing management to help real estate developers run highly profitable campaigns.',
  },
  {
    id: 'landlords',
    title: 'Landlord Services',
    desc: 'Empowering asset owners to find high-credit tenants, secure favorable leasing agreements, and manage tenant relations smoothly. We ensure your assets remain high-yielding and well-maintained.',
  }
];

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const container = containerRef.current;
    const path = pathRef.current;
    if (!trigger || !container || !path) return;

    // Check screen size
    const mm = gsap.matchMedia();

    mm.add('(min-width: 992px)', () => {
      // Desktop: Pinned scrolltimeline
      let pathLength = 1000;
      try {
        pathLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
      } catch (e) {
        console.warn(e);
      }

      const totalPillars = pillars.length;
      
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: true,
          start: 'top top',
          end: `+=${totalPillars * 100}%`,
          onUpdate: (self) => {
            // Update active index based on scroll progress
            const index = Math.min(
              Math.floor(self.progress * totalPillars),
              totalPillars - 1
            );
            setActiveStep(index);
          }
        }
      });

      // Animate path drawing with scroll
      pinTimeline.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
      });

      return () => {
        pinTimeline.scrollTrigger?.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  const handleStepClick = (index: number) => {
    // Smooth scroll to the corresponding section trigger segment
    const trigger = triggerRef.current;
    if (!trigger) return;
    
    const triggerTop = trigger.getBoundingClientRect().top + window.scrollY;
    const totalPillars = pillars.length;
    const scrollAmount = (index / totalPillars) * (totalPillars * window.innerHeight);
    
    window.scrollTo({
      top: triggerTop + scrollAmount + 2,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={triggerRef} className="philosophy-trigger">
      <section ref={containerRef} className="philosophy-section">
        
        {/* SVG Tracker Column */}
        <div className="phil-svg-tracker">
          <svg viewBox="0 0 100 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="tracker-svg-element">
            <path
              ref={pathRef}
              d="M 50 10 C 100 150, 0 350, 50 590"
              stroke="var(--brand-green)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Guide line in background */}
            <path
              d="M 50 10 C 100 150, 0 350, 50 590"
              stroke="rgba(15, 23, 42, 0.03)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="container phil-container">
          <div className="phil-grid">
            
            {/* Left Nav Menu */}
            <div className="phil-sidebar">
              <span className="section-label">Our Philosophy</span>
              <h2 className="phil-main-title">Pillars of Excellence</h2>
              <ul className="phil-steps-list">
                {pillars.map((pillar, index) => (
                  <li 
                    key={pillar.id}
                    className={index === activeStep ? 'active' : ''}
                    onClick={() => handleStepClick(index)}
                  >
                    <span className="step-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="step-title">{pillar.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Interactive Content */}
            <div className="phil-content-area">
              <div className="phil-content-card">
                <div className="card-media-placeholder">
                  <span className="media-placeholder-text">[ROYALTY-FREE VIDEOS HERE]</span>
                </div>
                <div className="card-info">
                  <span className="pillar-index">Pillar {String(activeStep + 1).padStart(2, '0')}</span>
                  <h3 className="pillar-title">{pillars[activeStep].title}</h3>
                  <p className="pillar-desc">{pillars[activeStep].desc}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Swipe Container (Visible on Mobile only) */}
        <div className="phil-mobile-slider">
          <span className="section-label" style={{ paddingLeft: '1.25rem' }}>Our Philosophy</span>
          <h2 className="phil-main-title" style={{ paddingLeft: '1.25rem', marginBottom: '2rem' }}>Pillars of Excellence</h2>
          <div className="mobile-swipe-wrapper">
            {pillars.map((pillar, index) => (
              <div key={pillar.id} className="mobile-phil-card">
                <div className="card-media-placeholder">
                  <span className="media-placeholder-text">[ROYALTY-FREE VIDEOS HERE]</span>
                </div>
                <div className="card-info">
                  <span className="pillar-index">Pillar {String(index + 1).padStart(2, '0')}</span>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="swipe-hint">Swipe left to read more →</div>
        </div>

      </section>

      <style jsx>{`
        .philosophy-trigger {
          position: relative;
        }

        .philosophy-section {
          height: 100vh;
          width: 100%;
          background-color: var(--bg-main);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border-dark);
        }

        .phil-svg-tracker {
          position: absolute;
          left: 50%;
          top: 0;
          height: 100%;
          width: 80px;
          transform: translateX(-50%);
          pointer-events: none;
          display: block;
          z-index: 1;
        }

        .tracker-svg-element {
          width: 100%;
          height: 100%;
        }

        @media (max-width: 991px) {
          .phil-svg-tracker {
            display: none;
          }
          .philosophy-section {
            height: auto;
            padding: 5rem 0;
          }
        }

        .phil-container {
          position: relative;
          z-index: 2;
          display: block;
        }

        @media (max-width: 991px) {
          .phil-container {
            display: none;
          }
        }

        .phil-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 8rem;
          align-items: center;
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

        .phil-main-title {
          font-size: clamp(2rem, 3vw, 2.75rem);
          color: var(--text-main);
          margin-bottom: 3rem;
        }

        .phil-steps-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .phil-steps-list li {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          cursor: pointer;
          opacity: 0.4;
          transition: var(--transition-smooth);
        }

        .phil-steps-list li.active, 
        .phil-steps-list li:hover {
          opacity: 1;
        }

        .step-num {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--brand-green);
        }

        .step-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--text-main);
        }

        .phil-content-area {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .phil-content-card {
          width: 100%;
          border-radius: 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-dark);
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
          transition: var(--transition-smooth);
        }

        .card-media-placeholder {
          aspect-ratio: 16/10;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--border-dark);
        }

        .card-media-placeholder .media-placeholder-text {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: rgba(15, 23, 42, 0.15);
          text-transform: uppercase;
        }

        .card-info {
          padding: 2.5rem;
        }

        .pillar-index {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--brand-blue);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: inline-block;
          margin-bottom: 0.5rem;
        }

        .pillar-title {
          font-size: 1.75rem;
          color: var(--text-main);
          margin-bottom: 1rem;
        }

        .pillar-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* Mobile specific styles */
        .phil-mobile-slider {
          display: none;
          width: 100%;
        }

        .mobile-swipe-wrapper {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 1.5rem;
          padding: 0 1.25rem 2rem 1.25rem;
          -webkit-overflow-scrolling: touch;
        }

        .mobile-swipe-wrapper::-webkit-scrollbar {
          display: none;
        }

        .mobile-phil-card {
          flex: 0 0 85vw;
          scroll-snap-align: start;
          border-radius: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-dark);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }

        .swipe-hint {
          text-align: center;
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.8rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        @media (max-width: 991px) {
          .phil-mobile-slider {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
