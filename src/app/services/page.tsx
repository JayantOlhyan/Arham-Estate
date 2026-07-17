'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    num: '01',
    title: 'Core Advisory',
    desc: 'Strategic advisory for buying, selling & leasing residential, commercial and land assets across Kolkata.',
  },
  {
    num: '02',
    title: 'Portfolio Management',
    desc: 'We help you build and manage a strong, diversified real estate portfolio aligned with your investment objectives.',
  },
  {
    num: '03',
    title: 'Investment Advisory',
    desc: 'Data-driven insights and research to help you make high-yielding real estate investment decisions.',
  },
  {
    num: '04',
    title: 'Property Management',
    desc: 'End-to-end management solutions for seamless operations and hassle-free ownership experience.',
  },
  {
    num: '05',
    title: 'Venture Funds',
    desc: 'Access curated real estate investment opportunities and early-stage assets through our venture funds.',
  },
  {
    num: '06',
    title: 'Commercial Real Estate',
    desc: 'Advisory for office spaces, retail, industrial and mixed-use commercial investments.',
  },
];

export default function ServicesPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    gsap.from('.services-hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    gsap.from('.services-hero-image-wrap', {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Service cards stagger anim
    gsap.from('.service-grid-card', {
      scrollTrigger: {
        trigger: '.services-grid-section',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    });

    // Advantage points trigger
    gsap.from('.adv-point', {
      scrollTrigger: {
        trigger: '.advantage-section',
        start: 'top 80%',
      },
      x: -30,
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

  return (
    <div ref={scrollContainerRef} className="main-layout-wrapper">
      <Header />

      {/* Services Hero Section */}
      <section className="services-hero-section">
        <div className="container hero-grid">
          <div className="services-hero-content">
            <span className="section-label">Our Services</span>
            <h1 className="services-hero-title">
              Advisory that <br />
              creates <span className="text-highlight">value.</span>
            </h1>
            <p className="services-hero-desc">
              At Arham Estate, we go beyond transactions. We offer end-to-end real estate advisory and investment solutions tailored to your goals.
            </p>
            <Link href="/#contact" className="btn btn-primary hero-btn">
              Let's Work Together &nbsp;→
            </Link>
          </div>
          <div className="services-hero-image-wrap">
            <img src="/images/classical_facade.jpg" alt="Heritage Facade" className="services-hero-image" />
          </div>
        </div>
      </section>

      {/* What We Do - Service Cards Section */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid-header">
            <span className="section-label">What We Do</span>
            <h2 className="services-grid-title">Comprehensive Real Estate Solutions</h2>
            <p className="services-grid-subtitle">
              From identifying the right opportunities to managing and growing your real estate assets, our services are designed to deliver clarity, confidence and long-term value.
            </p>
          </div>

          <div className="services-cards-grid">
            {servicesList.map((service, index) => (
              <div key={index} id={`core-${service.title.toLowerCase().replace(/ /g, '-')}`} className="service-grid-card">
                <div className="service-card-top">
                  <span className="service-num-tag">{service.num}</span>
                </div>
                <div className="service-card-body">
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                </div>
                <div className="service-card-footer">
                  <Link href="/#contact" className="service-learn-link">
                    Learn More &nbsp;→
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Advantage / Hooghly Bridge Section */}
      <section className="advantage-section">
        <div className="advantage-bg-overlay">
          <img src="/images/hooghly_bridge_sunset.jpg" alt="Hooghly Bridge" className="advantage-bg-image" />
          <div className="gradient-fade"></div>
        </div>
        <div className="container advantage-content-grid">
          <div className="advantage-text-box">
            <span className="section-label text-green">Our Advantage</span>
            <h2 className="advantage-title">Why clients choose Arham Estate.</h2>
          </div>
          <div className="advantage-points-stack">
            <div className="adv-point">
              <span className="chk-bubble">✓</span>
              <div className="point-text">
                <h5>Deep Market Expertise</h5>
                <p>In-depth understanding of Kolkata's micro-markets, upcoming growth vectors, and pricing trends.</p>
              </div>
            </div>
            <div className="adv-point">
              <span className="chk-bubble">✓</span>
              <div className="point-text">
                <h5>Transparent & Ethical</h5>
                <p>Honest guidance with complete documentation, HIRA compliance, and clarity at every transaction stage.</p>
              </div>
            </div>
            <div className="adv-point">
              <span className="chk-bubble">✓</span>
              <div className="point-text">
                <h5>End-to-End Support</h5>
                <p>From initial property search and legal advisory to financial loan support and key handover.</p>
              </div>
            </div>
            <div className="adv-point">
              <span className="chk-bubble">✓</span>
              <div className="point-text">
                <h5>Client-First Approach</h5>
                <p>Custom investment solutions tailored specifically to your unique wealth goals and risk profile.</p>
              </div>
            </div>
            <div className="adv-point">
              <span className="chk-bubble">✓</span>
              <div className="point-text">
                <h5>Trusted Relationships</h5>
                <p>A solid developer network built on years of shared performance, delivery, and institutional respect.</p>
              </div>
            </div>
            <div className="adv-point">
              <span className="chk-bubble">✓</span>
              <div className="point-text">
                <h5>Long-Term Partnership</h5>
                <p>We work beyond immediate sales to actively advise, review, and grow your real estate portfolio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="process-header">
            <span className="section-label">Our Process</span>
            <h2 className="process-title">A meticulous approach. Measurable outcomes.</h2>
          </div>

          <div className="process-timeline-wrap">
            <div className="timeline-horizontal-line"></div>
            <div className="process-steps">
              <div className="process-step-node">
                <div className="step-number-bubble">01</div>
                <h5>Understand</h5>
                <p>We begin by understanding your goals, preferences and investment horizon.</p>
              </div>
              <div className="process-step-node">
                <div className="step-number-bubble">02</div>
                <h5>Research</h5>
                <p>Our team conducts deep market research and shortlists the right options.</p>
              </div>
              <div className="process-step-node">
                <div className="step-number-bubble">03</div>
                <h5>Advise</h5>
                <p>Clear comparative analysis and financial valuations you can rely on.</p>
              </div>
              <div className="process-step-node">
                <div className="step-number-bubble">04</div>
                <h5>Execute</h5>
                <p>We handle negotiations, legal diligence, documentation and transaction closing.</p>
              </div>
              <div className="process-step-node">
                <div className="step-number-bubble">05</div>
                <h5>Beyond</h5>
                <p>Ongoing relationship support and portfolio-level reviews for future wealth growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="cta-banner-section">
        <div className="cta-backdrop-wrap">
          <img src="/images/victoria_memorial.jpg" alt="Victoria Memorial" className="cta-backdrop" />
          <div className="cta-overlay-screen"></div>
        </div>
        <div className="container cta-content-box">
          <h2 className="cta-title">Looking for the right opportunity?</h2>
          <p className="cta-desc">Connect with our senior advisors for a personalized portfolio consultation.</p>
          <Link href="/#contact" className="btn btn-secondary cta-btn">
            Schedule a Consultation &nbsp;→
          </Link>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        /* Hero Styling */
        .services-hero-section {
          padding: 12rem 0 7rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 6rem;
          align-items: center;
        }

        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .services-hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .services-hero-title {
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

        .services-hero-desc {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 580px;
        }

        .services-hero-image-wrap {
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--border-main);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.03);
          aspect-ratio: 4/3;
        }

        .services-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* What We Do - Service Cards */
        .services-grid-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .services-grid-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 5rem auto;
        }

        .services-grid-title {
          font-size: clamp(2rem, 3.5vw, 3.25rem);
          margin-bottom: 1.25rem;
          color: var(--text-main);
        }

        .services-grid-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .services-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }

        @media (max-width: 991px) {
          .services-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .services-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .service-grid-card {
          padding: 3rem 2.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          transition: var(--transition-smooth);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.01);
        }

        .service-grid-card:hover {
          transform: translateY(-8px);
          border-color: rgba(11, 170, 220, 0.3);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.03);
        }

        .service-num-tag {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--brand-green);
          opacity: 0.8;
          display: inline-block;
          margin-bottom: 2rem;
        }

        .service-card-body {
          flex: 1;
        }

        .service-grid-card h4 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.35rem;
          color: var(--text-main);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .service-grid-card p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .service-card-footer {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-main);
        }

        .service-learn-link {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--brand-blue);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: var(--transition-fast);
        }

        .service-learn-link:hover {
          color: var(--brand-green);
          padding-left: 4px;
        }

        /* Advantage Section */
        .advantage-section {
          position: relative;
          padding: 10rem 0;
          overflow: hidden;
          background: #090b0e;
        }

        .advantage-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .advantage-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
        }

        .gradient-fade {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(9, 11, 14, 0.95) 30%, rgba(9, 11, 14, 0.4) 100%);
        }

        @media (max-width: 991px) {
          .gradient-fade {
            background: linear-gradient(to bottom, rgba(9, 11, 14, 0.95) 40%, rgba(9, 11, 14, 0.7) 100%);
          }
        }

        .advantage-content-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        @media (max-width: 991px) {
          .advantage-content-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .text-green {
          color: var(--brand-green) !important;
        }

        .advantage-text-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .advantage-title {
          font-size: clamp(2rem, 3.5vw, 3rem);
          color: #ffffff;
          line-height: 1.2;
        }

        .advantage-points-stack {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .adv-point {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .chk-bubble {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(89, 165, 44, 0.2);
          border: 1px solid var(--brand-green);
          color: var(--brand-green);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.8rem;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .point-text h5 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.15rem;
          color: #ffffff;
          margin-bottom: 0.4rem;
          font-weight: 600;
        }

        .point-text p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }

        /* Process Section */
        .process-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .process-header {
          text-align: center;
          margin-bottom: 6rem;
        }

        .process-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--text-main);
        }

        .process-timeline-wrap {
          position: relative;
          width: 100%;
          padding: 2rem 0;
        }

        .timeline-horizontal-line {
          position: absolute;
          top: 45px;
          left: 5%;
          right: 5%;
          height: 2px;
          background: var(--border-main);
          z-index: 1;
        }

        @media (max-width: 991px) {
          .timeline-horizontal-line {
            display: none;
          }
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 991px) {
          .process-steps {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .process-step-node {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 1rem;
        }

        @media (max-width: 991px) {
          .process-step-node {
            text-align: left;
            flex-direction: row;
            align-items: flex-start;
            gap: 1.5rem;
            padding: 0;
          }
        }

        .step-number-bubble {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 2px solid var(--brand-green);
          color: var(--brand-green);
          font-family: var(--font-outfit), sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
          transition: var(--transition-smooth);
        }

        .process-step-node:hover .step-number-bubble {
          background: var(--brand-green);
          color: #ffffff;
          transform: scale(1.05);
        }

        @media (max-width: 991px) {
          .step-number-bubble {
            margin-bottom: 0;
            flex-shrink: 0;
          }
        }

        .process-step-node h5 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.15rem;
          color: var(--text-main);
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .process-step-node p {
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
