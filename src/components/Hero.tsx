'use client';

import React from 'react';

export default function Hero() {
  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-video-placeholder">
        <img 
          src="/images/howrah_bridge_sunset.jpg" 
          alt="Howrah Bridge Sunset Kolkata" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
      
      {/* Light overlay for copy readability (strengthened for contrast) */}
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <h1 className="hero-title">
          Redefining Luxury Living <br />
          <span>& Commercial Spaces</span>
        </h1>
        <p className="hero-subtitle">
          Leading real estate developer in Kolkata, delivering sustainable commercial <br />
          and residential properties focused on holistic well-being.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">Explore Projects</a>
          <a href="#contact" className="btn btn-outline">Enquire Now</a>
        </div>
      </div>

      {/* Smooth Scroll-Down Indicator */}
      <div className="scroll-down-wrapper" onClick={handleScrollDown}>
        <span className="scroll-text">Scroll Down</span>
        <svg viewBox="0 0 34 33" className="scroll-arrow" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.34083 8.40813L2.83333 10.8419L17 24.5919L31.1667 10.8419L28.6592 8.40813L17 19.7244L5.34083 8.40813Z" fill="var(--text-main)" />
        </svg>
      </div>

      <style jsx>{`
        .hero-section {
          height: 100vh;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: var(--bg-main);
        }

        .hero-video-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e2e8f0;
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(250, 249, 246, 0.85) 40%, rgba(250, 249, 246, 0.95) 90%),
                      linear-gradient(to bottom, rgba(250, 249, 246, 0.3) 0%, rgba(250, 249, 246, 1) 100%);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: var(--header-height);
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 1.1;
          color: var(--text-main);
          margin-bottom: 1.5rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }

        .hero-title span {
          background: linear-gradient(135deg, var(--brand-green) 0%, var(--brand-blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          max-width: 800px;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }

        @media (max-width: 576px) {
          .hero-actions {
            flex-direction: column;
            width: 100%;
            max-width: 280px;
            gap: 1rem;
          }
        }

        /* Scroll Down Indicator */
        .scroll-down-wrapper {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          gap: 0.5rem;
          transition: var(--transition-smooth);
        }

        .scroll-down-wrapper:hover {
          bottom: 2.25rem;
        }

        .scroll-text {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .scroll-arrow {
          width: 20px;
          height: 20px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-6px);
          }
          60% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </section>
  );
}
